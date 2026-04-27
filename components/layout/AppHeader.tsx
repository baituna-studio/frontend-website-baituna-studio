'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Produk Digital', href: '/products' },
  { label: 'Jasa Desain', href: '/services' },
  { label: 'Blog', href: '/blog' },
];

export function AppHeader() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-section bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl text-primary-color tracking-tight">Baituna</span>
          <span className="font-medium text-xl text-text-color tracking-tight">Studio</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-color-secondary hover:text-primary-color font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <Button
            icon={<Menu size={20} />}
            text
            rounded
            aria-label="Menu"
            onClick={() => setVisible(true)}
            className="p-2"
          />
        </div>

        {/* Mobile Sidebar */}
        <Sidebar
          visible={visible}
          position="right"
          onHide={() => setVisible(false)}
          className="w-full md:w-80"
          showCloseIcon={false}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <Button
                icon={<X size={24} />}
                text
                rounded
                onClick={() => setVisible(false)}
                className="text-text-color"
              />
            </div>
            <div className="flex flex-col px-6 gap-6 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setVisible(false)}
                  className="text-xl font-medium text-text-color hover:text-primary-color transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Sidebar>
      </div>
    </header>
  );
}
