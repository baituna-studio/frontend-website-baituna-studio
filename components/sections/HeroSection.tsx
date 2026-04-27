import Link from 'next/link';
import { Button } from 'primereact/button';

export function HeroSection() {
  return (
    <section className="bg-surface-ground py-20 lg:py-32">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-text-color tracking-tight mb-6 leading-tight">
          Tingkatkan <span className="text-primary-color">Branding</span> Bisnis Anda Hari Ini
        </h1>
        <p className="text-lg md:text-xl text-text-color-secondary leading-relaxed mb-10 max-w-2xl mx-auto">
          Temukan template desain premium, brand kit lengkap, dan layanan desain profesional untuk UMKM dan personal branding.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/products">
            <Button label="Lihat Produk Digital" size="large" className="w-full sm:w-auto font-semibold shadow-md" />
          </Link>
          <Link href="/services">
            <Button label="Konsultasi Desain" severity="secondary" outlined size="large" className="w-full sm:w-auto font-semibold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
