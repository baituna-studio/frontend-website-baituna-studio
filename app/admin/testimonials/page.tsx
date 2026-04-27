'use client';

import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [testiData, setTestiData] = useState<any>({
    name: '', role: '', quote: '', rating: 5, variant: '', productId: null, isPublished: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const toast = useRef<Toast>(null);

  const getToken = () => {
    return document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1] || '';
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const [testiRes, prodRes] = await Promise.all([
        fetch(`${API_URL}/api/testimonials/admin/list`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/api/products/admin/list`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (testiRes.ok) setTestimonials(await testiRes.json());
      if (prodRes.ok) setProducts(await prodRes.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openNew = () => {
    setTestiData({ name: '', role: '', quote: '', rating: 5, productId: null, isPublished: true });
    setIsEditing(false);
    setDialogVisible(true);
  };

  const editTesti = (testi: any) => {
    setTestiData({ ...testi });
    setIsEditing(true);
    setDialogVisible(true);
  };

  const saveTesti = async () => {
    const method = isEditing ? 'PATCH' : 'POST';
    const url = isEditing ? `${API_URL}/api/testimonials/${testiData.id}` : `${API_URL}/api/testimonials`;
    
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(testiData)
      });

      if (!res.ok) throw new Error('Failed to save');
      
      toast.current?.show({ severity: 'success', summary: 'Sukses', detail: 'Testimonial berhasil disimpan' });
      setDialogVisible(false);
      fetchData();
    } catch (err: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: err.message });
    }
  };

  const deleteTesti = async (id: string) => {
    if (!confirm('Hapus testimonial ini?')) return;
    try {
      const res = await fetch(`${API_URL}/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (res.ok) {
        toast.current?.show({ severity: 'success', summary: 'Sukses', detail: 'Berhasil dihapus' });
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const statusBodyTemplate = (rowData: any) => {
    return rowData.isPublished ? 
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Published</span> : 
      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-bold">Hidden</span>;
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex gap-2">
        <Button icon="pi pi-pencil" rounded text onClick={() => editTesti(rowData)} />
        <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => deleteTesti(rowData.id)} />
      </div>
    );
  };

  return (
    <div className="p-8">
      <Toast ref={toast} />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-color">Manajemen Testimonials</h1>
          <p className="text-text-color-secondary mt-1">Kelola ulasan pelanggan yang tampil di website.</p>
        </div>
        <Button label="Tambah Testimonial" icon="pi pi-plus" onClick={openNew} />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-section">
        <DataTable value={testimonials} loading={loading} paginator rows={10} emptyMessage="Belum ada ulasan.">
          <Column field="name" header="Nama" sortable></Column>
          <Column field="role" header="Role"></Column>
          <Column field="rating" header="Bintang" body={(r) => `${r.rating} ⭐`}></Column>
          <Column field="product.title" header="Produk" body={(r) => r.product?.title || 'Umum'}></Column>
          <Column field="quote" header="Kutipan Ulasan" style={{ maxWidth: '300px' }} className="truncate"></Column>
          <Column field="isPublished" header="Status" body={statusBodyTemplate}></Column>
          <Column body={actionBodyTemplate} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
      </div>

      <Dialog visible={dialogVisible} style={{ width: '500px' }} header={isEditing ? "Edit Testimonial" : "Tambah Testimonial"} modal onHide={() => setDialogVisible(false)}>
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Nama Pelanggan</label>
            <InputText value={testiData.name} onChange={(e) => setTestiData({...testiData, name: e.target.value})} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Role / Pekerjaan (Opsional)</label>
            <InputText value={testiData.role || ''} onChange={(e) => setTestiData({...testiData, role: e.target.value})} placeholder="Owner @brandanda" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Rating (1-5)</label>
              <InputText type="number" min="1" max="5" value={testiData.rating} onChange={(e) => setTestiData({...testiData, rating: parseInt(e.target.value) || 5})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Produk Terkait</label>
              <Dropdown 
                value={testiData.productId} 
                onChange={(e) => setTestiData({...testiData, productId: e.value})} 
                options={products} 
                optionLabel="title" 
                optionValue="id"
                placeholder="Pilih Produk" 
                showClear
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Isi Ulasan</label>
            <InputTextarea value={testiData.quote} onChange={(e) => setTestiData({...testiData, quote: e.target.value})} rows={4} />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <InputSwitch checked={testiData.isPublished} onChange={(e) => setTestiData({...testiData, isPublished: e.value})} />
            <label>Tampilkan di Website</label>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button label="Batal" icon="pi pi-times" outlined onClick={() => setDialogVisible(false)} />
            <Button label="Simpan" icon="pi pi-check" onClick={saveTesti} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
