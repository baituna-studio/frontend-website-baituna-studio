'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import { Menu, X, Palette } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Produk Digital', href: '/products' },
  { label: 'Jasa Desain', href: '/services' },
  { label: 'Blog', href: '/blog' },
];

export function AppHeader() {
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-surface-section' : 'bg-transparent border-transparent'}`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-primary p-2 rounded-xl text-white transform transition-transform group-hover:scale-105 shadow-md">
            <Palette size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-text-color tracking-tight leading-none">Baituna</span>
            <span className="font-medium text-sm text-text-color-secondary tracking-widest leading-none">STUDIO</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors relative py-2 ${isActive ? 'text-primary-color' : 'text-text-color-secondary hover:text-primary-color'}`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
        
        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link href="/products">
            <Button label="Beli Sekarang" className="bg-gradient-primary border-none hover:shadow-md transition-shadow font-semibold rounded-full px-6" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <Button
            icon={<Menu size={24} />}
            text
            rounded
            aria-label="Menu"
            onClick={() => setVisible(true)}
            className="p-2 text-text-color hover:bg-surface-ground"
          />
        </div>

        {/* Mobile Sidebar */}
        <Sidebar
          visible={visible}
          position="right"
          onHide={() => setVisible(false)}
          className="w-full sm:w-80"
          showCloseIcon={false}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-surface-section">
              <span className="font-bold text-xl text-primary-color tracking-tight">Baituna Studio</span>
              <Button
                icon={<X size={24} />}
                text
                rounded
                onClick={() => setVisible(false)}
                className="text-text-color"
              />
            </div>
            <div className="flex flex-col px-4 py-6 gap-2 flex-1 overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setVisible(false)}
                    className={`text-lg font-medium p-3 rounded-xl transition-colors ${isActive ? 'bg-primary-color/10 text-primary-color' : 'text-text-color hover:bg-surface-ground'}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="p-4 border-t border-surface-section">
              <Link href="/products" onClick={() => setVisible(false)}>
                <Button label="Beli Sekarang" className="w-full bg-gradient-primary border-none font-semibold rounded-xl py-3" />
              </Link>
            </div>
          </div>
        </Sidebar>
      </div>
    </header>
  );
}
