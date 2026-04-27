import Link from 'next/link';
import { Button } from 'primereact/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient & Pattern */}
      <div className="absolute inset-0 bg-gradient-primary"></div>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full blur-[128px] opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white font-medium text-sm mb-8 border border-white/20">
          <Sparkles size={16} /> Mulai transformasi brand Anda
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight leading-tight">
          Siap Meningkatkan Kualitas <br className="hidden md:block" /> Brand Anda?
        </h2>
        
        <p className="text-lg md:text-xl mb-12 text-white/90 leading-relaxed max-w-2xl mx-auto">
          Pilih aset desain premium yang Anda butuhkan sekarang. Tingkatkan kepercayaan pelanggan dan mulai dominasi pasar Anda.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/products" className="w-full sm:w-auto">
            <Button 
              label="Eksplor Semua Produk" 
              icon={<ArrowRight className="w-5 h-5 ml-2" />}
              iconPos="right"
              size="large" 
              className="w-full bg-white text-primary-700 border-none hover:bg-surface-ground font-bold px-8 py-4 shadow-xl hover:-translate-y-1 transition-transform"
            />
          </Link>
          <Link href="/services" className="w-full sm:w-auto">
            <Button 
              label="Konsultasi Gratis" 
              size="large" 
              className="w-full bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-md font-bold px-8 py-4 transition-colors"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
