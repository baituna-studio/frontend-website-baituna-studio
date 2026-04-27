import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'primereact/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface-ground py-20 lg:py-32">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] rounded-full bg-primary-color/20 blur-[100px] opacity-60"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-[100px] opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-color/10 text-primary-700 font-semibold text-sm mb-6 border border-primary-color/20">
              <span className="animate-pulse">✨</span> Studio Desain Digital #1 untuk UMKM
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-color tracking-tight mb-6 leading-[1.15]">
              Tingkatkan <span className="text-gradient">Branding</span> Bisnis Anda Hari Ini
            </h1>
            
            <p className="text-lg md:text-xl text-text-color-secondary leading-relaxed mb-10">
              Temukan template desain premium, brand kit lengkap, dan layanan desain profesional untuk UMKM dan personal branding.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/products" className="w-full sm:w-auto">
                <Button label="Eksplor Produk" size="large" className="w-full bg-gradient-primary border-none hover:shadow-premium transition-all duration-300 font-semibold px-8" />
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button label="Konsultasi Gratis" severity="secondary" outlined size="large" className="w-full font-semibold px-8 hover:bg-surface-ground transition-colors" />
              </Link>
            </div>
            
            {/* Trust Stats */}
            <div className="flex items-center gap-8 pt-6 border-t border-border-color/60">
              <div>
                <p className="text-2xl font-bold text-text-color">500+</p>
                <p className="text-sm text-text-color-secondary">Template Desain</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-text-color">100+</p>
                <p className="text-sm text-text-color-secondary">Pelanggan Aktif</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-text-color flex items-center gap-1">
                  4.9 <span className="text-yellow-400 text-lg">★</span>
                </p>
                <p className="text-sm text-text-color-secondary">Rata-rata Rating</p>
              </div>
            </div>
          </div>
          
          {/* Visual/Image Content */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full aspect-square max-w-[600px] mx-auto">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-10 transform rotate-3 scale-105"></div>
              <div className="absolute inset-0 bg-white rounded-3xl shadow-xl overflow-hidden animate-float">
                 <Image 
                  src="/hero-mockup.png" 
                  alt="Baituna Studio Premium Design Assets" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
