'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MetricCard from '@/components/admin/MetricCard';
import EmptyState from '@/components/admin/EmptyState';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalPosts: 0,
    totalLeads: 0
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingLeads, setLoadingLeads] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];
        const res = await fetch(`${API_URL}/api/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (e) {
        console.error('Failed to fetch stats:', e);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentLeads = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];
        const res = await fetch(`${API_URL}/api/leads/admin/list`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Sort by createdAt descending and take top 5
          const sorted = data.sort((a: any, b: any) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ).slice(0, 5);
          setRecentLeads(sorted);
        }
      } catch (e) {
        console.error('Failed to fetch leads:', e);
      } finally {
        setLoadingLeads(false);
      }
    };

    fetchStats();
    fetchRecentLeads();
  }, []);

  const quickActions = [
    { label: 'Tambah Produk', icon: 'pi-plus', href: '/admin/products', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Tambah Artikel', icon: 'pi-plus', href: '/admin/posts', color: 'bg-blue-50 text-blue-600' },
    { label: 'Lihat Leads', icon: 'pi-users', href: '/admin/leads', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Tambah Testimoni', icon: 'pi-star', href: '/admin/testimonials', color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-text-color tracking-tight">Selamat Datang Kembali!</h2>
        <p className="text-text-color-secondary">Berikut ringkasan performa Baituna Studio hari ini.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          label="Total Produk" 
          value={stats.totalProducts} 
          icon="pi-shopping-bag" 
          accentGradient="linear-gradient(135deg, #6366f1, #a855f7)" 
          loading={loading}
        />
        <MetricCard 
          label="Total Artikel" 
          value={stats.totalPosts} 
          icon="pi-file" 
          accentGradient="linear-gradient(135deg, #3b82f6, #06b6d4)" 
          loading={loading}
        />
        <MetricCard 
          label="Total Leads" 
          value={stats.totalLeads} 
          icon="pi-users" 
          accentGradient="linear-gradient(135deg, #10b981, #059669)" 
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-bold text-text-color tracking-tight">Aksi Cepat</h3>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action) => (
              <Link 
                key={action.label}
                href={action.href}
                className="flex items-center gap-4 p-4 bg-white border border-surface-section rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center transition-colors`}>
                  <i className={`pi ${action.icon} text-lg`}></i>
                </div>
                <span className="font-medium text-text-color group-hover:text-primary-color transition-colors">{action.label}</span>
                <i className="pi pi-chevron-right ml-auto text-xs text-text-color-secondary opacity-0 group-hover:opacity-100 transition-all"></i>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-color tracking-tight">Leads Terbaru</h3>
            <Link href="/admin/leads" className="text-sm font-medium text-primary-color hover:underline">Lihat Semua →</Link>
          </div>
          <div className="bg-white border border-surface-section rounded-2xl overflow-hidden shadow-sm">
            {loadingLeads ? (
              <div className="p-8 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-surface-ground animate-pulse rounded-xl"></div>
                ))}
              </div>
            ) : recentLeads.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-ground border-b border-surface-section">
                      <th className="px-6 py-4 text-xs font-bold text-text-color-secondary uppercase tracking-wider">Tanggal</th>
                      <th className="px-6 py-4 text-xs font-bold text-text-color-secondary uppercase tracking-wider">Nama</th>
                      <th className="px-6 py-4 text-xs font-bold text-text-color-secondary uppercase tracking-wider">Sumber</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-section">
                    {recentLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-surface-ground/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-text-color-secondary">
                          {new Date(lead.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-text-color">{lead.name}</p>
                          <p className="text-xs text-text-color-secondary truncate max-w-[150px]">{lead.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            {lead.source || 'Website'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState 
                icon="pi-inbox" 
                title="Belum ada leads masuk" 
                description="Leads dari formulir kontak akan muncul di sini."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
