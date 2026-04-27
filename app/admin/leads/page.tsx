'use client';

import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];
        const res = await fetch(`${API_URL}/api/leads/admin/list`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const dateBodyTemplate = (rowData: any) => {
    return new Date(rowData.createdAt).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Manajemen Leads" 
        description="Daftar kontak yang masuk melalui formulir di website." 
      />

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-section overflow-hidden">
        <DataTable 
          value={leads} 
          loading={loading} 
          paginator 
          rows={10} 
          emptyMessage="Belum ada leads masuk."
          className="p-datatable-sm"
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column field="createdAt" header="Tanggal" sortable body={dateBodyTemplate}></Column>
          <Column field="name" header="Nama Lengkap" sortable></Column>
          <Column field="email" header="Email"></Column>
          <Column field="phone" header="WhatsApp" body={(r) => r.phone || '-'}></Column>
          <Column field="message" header="Pesan" className="max-w-[300px] truncate"></Column>
          <Column field="source" header="Sumber"></Column>
        </DataTable>
      </div>
    </div>
  );
}
