'use client';

import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { TabView, TabPanel } from 'primereact/tabview';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [productData, setProductData] = useState<any>({
    title: '', slug: '', shortDescription: '', description: '', price: '',
    lynkUrl: '', thumbnailUrl: '', categoryId: null, isFeatured: false, isPublished: true, sortOrder: 0
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const toast = useRef<Toast>(null);

  // Helper to get token
  const getToken = () => {
    return document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1] || '';
  };

  const fetchProductsAndCategories = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`${API_URL}/api/products/admin/list`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        }),
        fetch(`${API_URL}/api/categories`)
      ]);

      if (prodRes.ok) {
        const data = await prodRes.json();
        setProducts(data);
      }
      
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
      }
    } catch (e) {
      console.error(e);
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const openNew = () => {
    setProductData({
      title: '', slug: '', shortDescription: '', description: '', price: '',
      lynkUrl: '', thumbnailUrl: '', categoryId: null, isFeatured: false, isPublished: true, sortOrder: 0
    });
    setIsEditing(false);
    setDialogVisible(true);
  };

  const editProduct = (product: any) => {
    setProductData({ ...product });
    setIsEditing(true);
    setDialogVisible(true);
  };

  const saveProduct = async () => {
    const method = isEditing ? 'PATCH' : 'POST';
    const url = isEditing ? `${API_URL}/api/products/${productData.id}` : `${API_URL}/api/products`;
    
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(productData)
      });

      if (!res.ok) throw new Error('Failed to save');
      
      toast.current?.show({ severity: 'success', summary: 'Sukses', detail: 'Data berhasil disimpan' });
      setDialogVisible(false);
      fetchProductsAndCategories();
    } catch (err: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: err.message });
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Hapus produk ini?')) return;
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (res.ok) {
        toast.current?.show({ severity: 'success', summary: 'Sukses', detail: 'Berhasil dihapus' });
        fetchProductsAndCategories();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData
      });
      
      if (!res.ok) throw new Error('Upload error');
      const data = await res.json();
      setProductData({ ...productData, thumbnailUrl: data.url });
      toast.current?.show({ severity: 'success', summary: 'Sukses', detail: 'Gambar berhasil diupload' });
    } catch (err: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: err.message });
    } finally {
      setUploadingImage(false);
    }
  };

  const statusBodyTemplate = (rowData: any) => {
    return rowData.isPublished ? 
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Published</span> : 
      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-bold">Draft</span>;
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex gap-2">
        <Button icon="pi pi-pencil" rounded text onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => deleteProduct(rowData.id)} />
      </div>
    );
  };

  return (
    <div className="p-8">
      <Toast ref={toast} />
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-color">Manajemen Produk</h1>
          <p className="text-text-color-secondary mt-1">Kelola data produk digital Anda.</p>
        </div>
        <Button label="Tambah Produk" icon="pi pi-plus" onClick={openNew} />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-section">
        <DataTable value={products} loading={loading} paginator rows={10} dataKey="id" 
          emptyMessage="Tidak ada produk ditemukan.">
          <Column field="thumbnailUrl" header="Image" body={(r) => r.thumbnailUrl ? <img src={r.thumbnailUrl} className="w-16 h-16 object-cover rounded" /> : 'No image'}></Column>
          <Column field="title" header="Judul Produk" sortable></Column>
          <Column field="category.name" header="Kategori" sortable body={(r) => r.category?.name || '-'}></Column>
          <Column field="price" header="Harga" sortable></Column>
          <Column field="isFeatured" header="Highlight?" body={(r) => r.isFeatured ? 'Ya' : 'Tidak'}></Column>
          <Column field="isPublished" header="Status" body={statusBodyTemplate} sortable></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
      </div>

      <Dialog visible={dialogVisible} style={{ width: '600px' }} header={isEditing ? "Edit Produk" : "Tambah Produk"} modal onHide={() => setDialogVisible(false)}>
        <div className="flex flex-col gap-4 mt-2">
          
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Judul Produk</label>
            <InputText value={productData.title} onChange={(e) => setProductData({...productData, title: e.target.value})} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">URL Slug (Kosongkan untuk auto-generate)</label>
            <InputText value={productData.slug} onChange={(e) => setProductData({...productData, slug: e.target.value})} placeholder="Contoh: template-feed-1" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Short Deskripsi</label>
              <InputTextarea value={productData.shortDescription || ''} onChange={(e) => setProductData({...productData, shortDescription: e.target.value})} rows={2} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Kategori</label>
              <Dropdown 
                value={productData.categoryId} 
                onChange={(e) => setProductData({...productData, categoryId: e.value})} 
                options={categories} 
                optionLabel="name" 
                optionValue="id"
                placeholder="Pilih Kategori" 
                className="w-full" 
                showClear
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Deskripsi</label>
            <TabView>
              <TabPanel header="Editor">
                <InputTextarea 
                  value={productData.description || ''} 
                  onChange={(e) => setProductData({...productData, description: e.target.value})} 
                  rows={8} 
                  className="w-full"
                  placeholder="Gunakan HTML atau Markdown..."
                />
              </TabPanel>
              <TabPanel header="Preview">
                <div 
                  className="p-4 border border-surface-200 rounded-md bg-surface-50 min-h-[200px] prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: productData.description || '<p className="text-gray-400">Belum ada deskripsi...</p>' }}
                />
              </TabPanel>
            </TabView>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Harga (Teks)</label>
              <InputText value={productData.price || ''} onChange={(e) => setProductData({...productData, price: e.target.value})} placeholder="Rp 50.000" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Urutan Tampil (Sort Order)</label>
              <InputText type="number" value={productData.sortOrder} onChange={(e) => setProductData({...productData, sortOrder: parseInt(e.target.value) || 0})} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">URL Checkout (Lynk.id)</label>
            <InputText value={productData.lynkUrl || ''} onChange={(e) => setProductData({...productData, lynkUrl: e.target.value})} />
          </div>

          <div className="flex flex-col gap-2 border p-4 rounded-lg bg-surface-50">
            <label className="font-semibold">Upload Gambar Thumbnail</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
            {uploadingImage && <div className="text-sm text-primary-color flex items-center gap-2 mt-2"><ProgressSpinner style={{width: '20px', height: '20px'}} /> Mengupload...</div>}
            
            {productData.thumbnailUrl && !uploadingImage && (
              <div className="mt-2">
                <img src={productData.thumbnailUrl} alt="Preview" className="w-full h-auto max-h-48 object-cover rounded shadow" />
                <p className="text-xs mt-1 break-all text-text-color-secondary">{productData.thumbnailUrl}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mt-2">
            <div className="flex items-center gap-2">
              <InputSwitch checked={productData.isPublished} onChange={(e) => setProductData({...productData, isPublished: e.value})} />
              <label>Published (Tampil)</label>
            </div>
            <div className="flex items-center gap-2">
              <InputSwitch checked={productData.isFeatured} onChange={(e) => setProductData({...productData, isFeatured: e.value})} />
              <label>Tampil di Beranda</label>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button label="Batal" icon="pi pi-times" outlined onClick={() => setDialogVisible(false)} />
            <Button label="Simpan" icon="pi pi-check" onClick={saveProduct} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
