import Link from 'next/link';
import { Button } from 'primereact/button';

export function FinalCTASection() {
  return (
    <section className="py-24 bg-primary-color text-white">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
          Siap Meningkatkan Kualitas Brand Anda?
        </h2>
        <p className="text-lg md:text-xl mb-10 opacity-90 leading-relaxed">
          Pilih aset desain yang Anda butuhkan sekarang dan lihat perubahannya.
        </p>
        <Link href="/products">
          <Button 
            label="Eksplor Semua Produk" 
            size="large" 
            className="bg-white text-primary-color border-white hover:bg-surface-ground hover:border-surface-ground font-bold px-8 shadow-lg"
          />
        </Link>
      </div>
    </section>
  );
}
