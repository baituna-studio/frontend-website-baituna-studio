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

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const getPageTitle = (path: string) => {
    if (path === '/admin') return 'Dashboard';
    if (path.startsWith('/admin/products')) return 'Products';
    if (path.startsWith('/admin/posts')) return 'Blog Posts';
    if (path.startsWith('/admin/testimonials')) return 'Testimonials';
    if (path.startsWith('/admin/leads')) return 'Leads';
    return 'Admin Panel';
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: 'pi-home' },
    { label: 'Products', href: '/admin/products', icon: 'pi-shopping-bag' },
    { label: 'Blog Posts', href: '/admin/posts', icon: 'pi-file' },
    { label: 'Testimonials', href: '/admin/testimonials', icon: 'pi-star' },
    { label: 'Leads', href: '/admin/leads', icon: 'pi-users' },
  ];

  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    window.location.href = '/admin/login';
  };

  return (
    <div className="flex h-screen bg-surface-ground">
      {/* Sidebar - Hidden on login page */}
      {!isLoginPage && (
        <aside className={`bg-[--admin-sidebar-bg] border-r border-[--admin-sidebar-border] h-full flex flex-col transition-all duration-300 relative ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
          
          {/* Toggle Button */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute -right-3 top-7 bg-[--admin-sidebar-bg] border border-[--admin-sidebar-border] shadow-lg rounded-full w-6 h-6 flex items-center justify-center text-[--admin-sidebar-text] hover:text-white z-10 transition-colors"
          >
            <i className={`pi ${isSidebarOpen ? 'pi-chevron-left' : 'pi-chevron-right'} text-[10px]`}></i>
          </button>

          {/* Logo Area */}
          <div className="p-6 border-b border-[--admin-sidebar-border] flex items-center justify-center min-h-[76px]">
            <Link href="/admin" className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
              {isSidebarOpen ? (
                <>
                  <span className="font-bold text-xl text-primary-color tracking-tight">Baituna</span>
                  <span className="font-medium text-xl text-white tracking-tight">Studio</span>
                </>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-primary-color flex items-center justify-center shadow-lg">
                  <span className="font-bold text-lg text-white">BS</span>
                </div>
              )}
            </Link>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-1 overflow-x-hidden">
            {isSidebarOpen && (
              <p className="px-4 py-2 text-[10px] font-bold text-[--admin-sidebar-text] tracking-widest uppercase opacity-40">Menu</p>
            )}
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`group relative p-3 rounded-xl flex items-center transition-all duration-200 ${
                    active 
                      ? 'bg-[--admin-sidebar-active-bg] text-[--admin-sidebar-text-active]' 
                      : 'text-[--admin-sidebar-text] hover:bg-white/5 hover:text-white'
                  } ${isSidebarOpen ? 'gap-3 mx-2' : 'justify-center mx-1'}`}
                  title={item.label}
                >
                  {/* Active Indicator Bar */}
                  {active && isSidebarOpen && (
                    <div className="absolute left-[-12px] top-1/4 bottom-1/4 w-1 bg-[--admin-sidebar-active-bar] rounded-r-full"></div>
                  )}
                  
                  <i className={`pi ${item.icon} text-lg ${active ? 'text-[--admin-sidebar-active-bar]' : ''}`}></i>
                  {isSidebarOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                  
                  {/* Collapsed Active Indicator Dot */}
                  {active && !isSidebarOpen && (
                    <div className="absolute right-2 top-2 w-2 h-2 bg-[--admin-sidebar-active-bar] rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Profile Footer */}
          <div className="p-4 border-t border-[--admin-sidebar-border] space-y-4">
            <div className={`flex items-center transition-all duration-300 ${isSidebarOpen ? 'gap-3 bg-white/5 p-3 rounded-2xl border border-white/5' : 'justify-center'}`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-color to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shrink-0 border border-white/10">
                A
              </div>
              {isSidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate leading-none mb-1">Administrator</p>
                  <p className="text-[10px] text-[--admin-sidebar-text] truncate opacity-70">admin@baitunastudio.biz.id</p>
                </div>
              )}
            </div>
            
            <button 
              onClick={handleLogout}
              className={`w-full p-3 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-xl flex items-center transition-all duration-200 group ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center'}`}
              title="Logout"
            >
              <i className="pi pi-sign-out text-lg group-hover:scale-110 transition-transform"></i>
              {isSidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 overflow-hidden ${isLoginPage ? 'items-center justify-center' : ''}`}>
        {!isLoginPage && (
          <header className="h-16 border-b border-surface-section bg-white flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-2">
              <Link href="/admin" className="text-text-color-secondary text-sm hover:text-primary-color transition-colors">Admin</Link>
              <i className="pi pi-chevron-right text-[10px] text-text-color-secondary opacity-50"></i>
              <span className="font-semibold text-text-color">{getPageTitle(pathname)}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-text-color-secondary hover:text-primary-color transition-colors rounded-full hover:bg-surface-ground">
                <i className="pi pi-bell text-lg"></i>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="h-8 w-[1px] bg-surface-section"></div>
              
              {/* Profile Chip */}
              <div className="flex items-center gap-3 bg-surface-ground pl-1.5 pr-4 py-1.5 rounded-full border border-surface-section cursor-pointer hover:bg-surface-section transition-all duration-200 group">
                <div className="w-8 h-8 rounded-full bg-primary-color flex items-center justify-center text-[10px] text-white font-bold shadow-sm border border-white/20 group-hover:scale-105 transition-transform">
                  AD
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-xs font-bold text-text-color leading-tight">Administrator</span>
                  <span className="text-[10px] text-text-color-secondary leading-tight opacity-70">Admin</span>
                </div>
                <i className="pi pi-chevron-down text-[10px] text-text-color-secondary opacity-50 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </div>
          </header>
        )}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
