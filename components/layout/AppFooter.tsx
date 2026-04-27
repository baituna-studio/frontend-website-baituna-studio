'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Palette } from 'lucide-react';

export function AppFooter() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 mt-20 border-t border-slate-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 group mb-6">
              <div className="bg-gradient-primary p-2 rounded-xl text-white shadow-md">
                <Palette size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white tracking-tight leading-none">Baituna</span>
                <span className="font-medium text-sm text-slate-400 tracking-widest leading-none">STUDIO</span>
              </div>
            </Link>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
              Studio kreatif digital yang menyediakan produk, template, dan jasa desain 
              untuk memajukan bisnis dan personal branding Anda.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/baitunastudio" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-primary-color transition-colors" aria-label="Instagram">
                <i className="pi pi-instagram text-xl"></i>
              </a>
              <a href="https://tiktok.com/@baitunastudio" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-primary-color transition-colors" aria-label="TikTok">
                <i className="pi pi-tiktok text-xl"></i>
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-primary-color transition-colors" aria-label="WhatsApp">
                <i className="pi pi-whatsapp text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white text-lg mb-6">Menu Utama</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/" className="hover:text-primary-color transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-primary-color transition-colors">Produk Digital</Link></li>
              <li><Link href="/services" className="hover:text-primary-color transition-colors">Jasa Desain</Link></li>
              <li><Link href="/blog" className="hover:text-primary-color transition-colors">Blog & Tips</Link></li>
              <li><Link href="/about" className="hover:text-primary-color transition-colors">Tentang Kami</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white text-lg mb-6">Bantuan & Legal</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="mailto:halo@baitunastudio.biz.id" className="hover:text-primary-color transition-colors flex items-center gap-2"><i className="pi pi-envelope"></i> halo@baitunastudio.biz.id</a></li>
              <li><Link href="/contact" className="hover:text-primary-color transition-colors">Hubungi Kami</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary-color transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="/terms" className="hover:text-primary-color transition-colors">Syarat & Ketentuan</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
          <p>&copy; {currentYear} Baituna Studio. All rights reserved.</p>
          <p>Dibuat dengan ❤️ di Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
