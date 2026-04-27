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
import AdminPageHeader from '@/components/admin/AdminPageHeader';

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
    <div className="space-y-6">
      <Toast ref={toast} />
      
      <AdminPageHeader 
        title="Manajemen Testimonials" 
        description="Kelola ulasan pelanggan yang tampil di website." 
        action={
          <Button label="Tambah Testimonial" icon="pi pi-plus" onClick={openNew} />
        }
      />

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-section overflow-hidden">
        <DataTable 
          value={testimonials} 
          loading={loading} 
          paginator 
          rows={10} 
          emptyMessage="Belum ada ulasan."
          className="p-datatable-sm"
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column field="name" header="Nama" sortable className="font-bold"></Column>
          <Column field="role" header="Role"></Column>
          <Column field="rating" header="Bintang" body={(r) => `${r.rating} ⭐`}></Column>
          <Column field="product.title" header="Produk" body={(r) => r.product?.title || 'Umum'}></Column>
          <Column field="quote" header="Kutipan Ulasan" style={{ maxWidth: '300px' }} className="truncate text-text-color-secondary italic"></Column>
          <Column field="isPublished" header="Status" body={statusBodyTemplate} sortable></Column>
          <Column body={actionBodyTemplate} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
      </div>

      <Dialog visible={dialogVisible} style={{ width: '500px' }} header={isEditing ? "Edit Testimonial" : "Tambah Testimonial"} modal onHide={() => setDialogVisible(false)} className="p-fluid">
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm">Nama Pelanggan</label>
            <InputText value={testiData.name} onChange={(e) => setTestiData({...testiData, name: e.target.value})} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm">Role / Pekerjaan (Opsional)</label>
            <InputText value={testiData.role || ''} onChange={(e) => setTestiData({...testiData, role: e.target.value})} placeholder="Owner @brandanda" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Rating (1-5)</label>
              <InputText type="number" min="1" max="5" value={testiData.rating} onChange={(e) => setTestiData({...testiData, rating: parseInt(e.target.value) || 5})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Produk Terkait</label>
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
            <label className="font-semibold text-sm">Isi Ulasan</label>
            <InputTextarea value={testiData.quote} onChange={(e) => setTestiData({...testiData, quote: e.target.value})} rows={4} autoResize />
          </div>

          <div className="flex items-center gap-2 mt-2 bg-surface-ground p-4 rounded-xl">
            <InputSwitch checked={testiData.isPublished} onChange={(e) => setTestiData({...testiData, isPublished: e.value})} />
            <label className="text-sm font-medium">Tampilkan di Website</label>
          </div>

          <div className="flex justify-end gap-3 mt-6 border-t border-surface-section pt-4">
            <Button label="Batal" icon="pi pi-times" text onClick={() => setDialogVisible(false)} className="w-auto" />
            <Button label="Simpan" icon="pi pi-check" onClick={saveTesti} className="w-auto px-8" />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
