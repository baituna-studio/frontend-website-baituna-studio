'use client';

import { usePathname } from 'next/navigation';

export function AppFooter() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-white border-t border-surface-section py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-primary-color">Baituna</span>
              <span className="text-text-color">Studio</span>
            </h3>
            <p className="text-text-color-secondary max-w-sm leading-relaxed">
              Studio kreatif digital yang menyediakan produk, template, dan jasa desain 
              untuk memajukan bisnis dan personal branding Anda.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-text-color mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              <li><a href="/products" className="text-text-color-secondary hover:text-primary-color transition-colors">Produk Digital</a></li>
              <li><a href="/services" className="text-text-color-secondary hover:text-primary-color transition-colors">Jasa Desain</a></li>
              <li><a href="/blog" className="text-text-color-secondary hover:text-primary-color transition-colors">Blog & Tips</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-color mb-4">Contact</h4>
            <ul className="flex flex-col gap-2 text-text-color-secondary">
              <li><a href="https://instagram.com/baitunastudio" target="_blank" rel="noreferrer" className="hover:text-primary-color transition-colors flex items-center gap-2"><i className="pi pi-instagram"></i> @baitunastudio</a></li>
              <li>halo@baitunastudio.biz.id</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-surface-section mt-12 pt-8 text-center text-text-color-secondary text-sm">
          <p>&copy; {currentYear} Baituna Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
