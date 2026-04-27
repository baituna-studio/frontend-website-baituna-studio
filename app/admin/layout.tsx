'use client';

import { Sidebar } from 'primereact/sidebar';
import { Menu } from 'primereact/menu';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-surface-ground">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-surface-section h-full flex flex-col">
        <div className="p-6 border-b border-surface-section">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-bold text-xl text-primary-color tracking-tight">Admin</span>
            <span className="font-medium text-xl text-text-color tracking-tight">Panel</span>
          </Link>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
          <Link href="/admin" className="p-3 hover:bg-surface-section rounded-lg flex items-center gap-3 text-text-color-secondary hover:text-primary-color transition-colors">
            <i className="pi pi-home"></i>
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/products" className="p-3 hover:bg-surface-section rounded-lg flex items-center gap-3 text-text-color-secondary hover:text-primary-color transition-colors">
            <i className="pi pi-shopping-bag"></i>
            <span className="font-medium">Products</span>
          </Link>
          <Link href="/admin/posts" className="p-3 hover:bg-surface-section rounded-lg flex items-center gap-3 text-text-color-secondary hover:text-primary-color transition-colors">
            <i className="pi pi-file"></i>
            <span className="font-medium">Blog Posts</span>
          </Link>
          <Link href="/admin/testimonials" className="p-3 hover:bg-surface-section rounded-lg flex items-center gap-3 text-text-color-secondary hover:text-primary-color transition-colors">
            <i className="pi pi-star"></i>
            <span className="font-medium">Testimonials</span>
          </Link>
          <Link href="/admin/leads" className="p-3 hover:bg-surface-section rounded-lg flex items-center gap-3 text-text-color-secondary hover:text-primary-color transition-colors">
            <i className="pi pi-users"></i>
            <span className="font-medium">Leads</span>
          </Link>
        </div>

        <div className="p-4 border-t border-surface-section">
          <button 
            onClick={() => {
              document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
              window.location.href = '/admin/login';
            }}
            className="w-full text-left p-3 hover:bg-red-50 text-red-600 rounded-lg flex items-center gap-3 transition-colors"
          >
            <i className="pi pi-sign-out"></i>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
