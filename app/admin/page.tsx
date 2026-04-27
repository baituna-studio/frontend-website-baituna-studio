'use client';

import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalPosts: 0,
    totalLeads: 0
  });
  const [loading, setLoading] = useState(true);

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
    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-text-color mb-6">Dashboard</h1>
      <p className="text-text-color-secondary mb-8">Selamat datang di Admin Panel Baituna Studio.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-section">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-color-secondary font-medium">Total Produk</p>
              <h3 className="text-3xl font-bold text-text-color mt-2">
                {loading ? '--' : stats.totalProducts}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
              <i className="pi pi-shopping-bag text-xl text-primary-color"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-section">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-color-secondary font-medium">Total Artikel</p>
              <h3 className="text-3xl font-bold text-text-color mt-2">
                {loading ? '--' : stats.totalPosts}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-100 flex items-center justify-center">
              <i className="pi pi-file text-xl text-surface-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-section">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-color-secondary font-medium">Total Leads</p>
              <h3 className="text-3xl font-bold text-text-color mt-2">
                {loading ? '--' : stats.totalLeads}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <i className="pi pi-users text-xl text-green-600"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
