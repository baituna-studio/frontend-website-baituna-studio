'use client';

import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];
        const res = await fetch(`${API_URL}/api/posts/admin/list`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const statusBodyTemplate = (rowData: any) => {
    return rowData.isPublished ? 
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Published</span> : 
      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-bold">Draft</span>;
  };

  const publishDateTemplate = (r: any) => {
    return r.publishedAt ? new Date(r.publishedAt).toLocaleDateString('id-ID') : '-';
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-text-color mb-6">Artikel Blog</h1>
      <p className="text-text-color-secondary mb-8">Berisi artikel blog yang telah dibuat (saat ini *Read Only* di MVP).</p>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-section">
        <DataTable value={posts} loading={loading} paginator rows={10} emptyMessage="Belum ada artikel.">
          <Column field="thumbnailUrl" header="Image" body={(r) => r.thumbnailUrl ? <img src={r.thumbnailUrl} className="w-16 h-16 object-cover rounded" /> : '-'}></Column>
          <Column field="title" header="Judul" sortable style={{ minWidth: '300px' }}></Column>
          <Column field="category.name" header="Kategori" body={(r) => r.category?.name || '-'} sortable></Column>
          <Column field="publishedAt" header="Tanggal Tampil" body={publishDateTemplate} sortable></Column>
          <Column field="isPublished" header="Status" body={statusBodyTemplate}></Column>
        </DataTable>
      </div>
    </div>
  );
}
