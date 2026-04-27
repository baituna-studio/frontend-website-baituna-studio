'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-surface-ground">
      {/* Sidebar - Hidden on login page */}
      {!isLoginPage && (
        <div className={`bg-white border-r border-surface-section h-full flex flex-col transition-all duration-300 relative ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
          
          {/* Toggle Button */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute -right-3 top-7 bg-white border border-surface-section shadow-sm rounded-full w-6 h-6 flex items-center justify-center text-text-color-secondary hover:text-primary-color hover:bg-surface-ground z-10 transition-colors"
          >
            <i className={`pi ${isSidebarOpen ? 'pi-chevron-left' : 'pi-chevron-right'} text-xs`}></i>
          </button>

          <div className="p-6 border-b border-surface-section flex items-center justify-center min-h-[76px]">
            <Link href="/admin" className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
              {isSidebarOpen ? (
                <>
                  <span className="font-bold text-xl text-primary-color tracking-tight">Admin</span>
                  <span className="font-medium text-xl text-text-color tracking-tight">Panel</span>
                </>
              ) : (
                <span className="font-bold text-xl text-primary-color tracking-tight">AP</span>
              )}
            </Link>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2 overflow-x-hidden">
            <Link href="/admin" className={`p-3 hover:bg-surface-section rounded-lg flex items-center text-text-color-secondary hover:text-primary-color transition-colors ${isSidebarOpen ? 'gap-3' : 'justify-center'}`} title="Dashboard">
              <i className="pi pi-home text-lg"></i>
              {isSidebarOpen && <span className="font-medium whitespace-nowrap">Dashboard</span>}
            </Link>
            <Link href="/admin/products" className={`p-3 hover:bg-surface-section rounded-lg flex items-center text-text-color-secondary hover:text-primary-color transition-colors ${isSidebarOpen ? 'gap-3' : 'justify-center'}`} title="Products">
              <i className="pi pi-shopping-bag text-lg"></i>
              {isSidebarOpen && <span className="font-medium whitespace-nowrap">Products</span>}
            </Link>
            <Link href="/admin/posts" className={`p-3 hover:bg-surface-section rounded-lg flex items-center text-text-color-secondary hover:text-primary-color transition-colors ${isSidebarOpen ? 'gap-3' : 'justify-center'}`} title="Blog Posts">
              <i className="pi pi-file text-lg"></i>
              {isSidebarOpen && <span className="font-medium whitespace-nowrap">Blog Posts</span>}
            </Link>
            <Link href="/admin/testimonials" className={`p-3 hover:bg-surface-section rounded-lg flex items-center text-text-color-secondary hover:text-primary-color transition-colors ${isSidebarOpen ? 'gap-3' : 'justify-center'}`} title="Testimonials">
              <i className="pi pi-star text-lg"></i>
              {isSidebarOpen && <span className="font-medium whitespace-nowrap">Testimonials</span>}
            </Link>
            <Link href="/admin/leads" className={`p-3 hover:bg-surface-section rounded-lg flex items-center text-text-color-secondary hover:text-primary-color transition-colors ${isSidebarOpen ? 'gap-3' : 'justify-center'}`} title="Leads">
              <i className="pi pi-users text-lg"></i>
              {isSidebarOpen && <span className="font-medium whitespace-nowrap">Leads</span>}
            </Link>
          </div>

          <div className="p-4 border-t border-surface-section">
            <button 
              onClick={() => {
                document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
                window.location.href = '/admin/login';
              }}
              className={`w-full p-3 hover:bg-red-50 text-red-600 rounded-lg flex items-center transition-colors ${isSidebarOpen ? 'gap-3' : 'justify-center'}`}
              title="Logout"
            >
              <i className="pi pi-sign-out text-lg"></i>
              {isSidebarOpen && <span className="font-medium whitespace-nowrap">Logout</span>}
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto ${isLoginPage ? 'flex items-center justify-center' : ''}`}>
        {children}
      </div>
    </div>
  );
}
