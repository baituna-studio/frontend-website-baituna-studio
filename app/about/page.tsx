import { Metadata } from 'next';
import { Button } from 'primereact/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tentang Kami - Baituna Studio',
  description: 'Mengenal Baituna Studio, mitra desain premium untuk UMKM dan konten kreator.',
};

export default function AboutPage() {
  return (
    <div className="bg-surface-ground min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-color mb-6">Tentang Baituna Studio</h1>
          <p className="text-xl text-text-color-secondary leading-relaxed">
            Menghadirkan desain berkualitas agensi untuk memajukan UMKM Indonesia.
          </p>
        </div>

        {/* Brand Story */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-surface-section mb-12">
          <h2 className="text-2xl font-bold text-text-color mb-6">Cerita Kami</h2>
          <div className="prose prose-lg text-text-color-secondary max-w-none">
            <p>
              Baituna Studio lahir dari sebuah pengamatan sederhana: banyak UMKM dan kreator lokal memiliki produk atau layanan yang luar biasa, namun terhambat oleh branding yang kurang profesional. 
            </p>
            <p>
              Kami menyadari bahwa jasa agensi desain profesional seringkali tidak terjangkau bagi bisnis menengah ke bawah. Di sisi lain, mendesain sendiri memakan waktu yang sangat berharga yang seharusnya digunakan untuk fokus pada pengembangan bisnis.
            </p>
            <p>
              Oleh karena itu, kami merancang berbagai aset digital, template, dan solusi branding yang <b>premium, aesthetic, namun sangat mudah digunakan</b> (bahkan untuk pemula). Misi kami adalah menjembatani kesenjangan tersebut dan memberdayakan bisnis lokal untuk tampil lebih meyakinkan.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100">
            <i className="pi pi-star text-3xl text-primary-color mb-4 block"></i>
            <h3 className="text-xl font-bold text-text-color mb-3">Visi Kami</h3>
            <p className="text-text-color-secondary">
              Menjadi mitra desain digital nomor satu bagi jutaan UMKM di Indonesia, membantu mereka menembus batas visual dalam membangun kepercayaan audiens.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-surface-section shadow-sm">
            <i className="pi pi-compass text-3xl text-primary-color mb-4 block"></i>
            <h3 className="text-xl font-bold text-text-color mb-3">Nilai Kami</h3>
            <ul className="space-y-2 text-text-color-secondary">
              <li>• Mengutamakan Kualitas (Aesthetic & Fungsi)</li>
              <li>• Aksesibilitas (Mudah Digunakan)</li>
              <li>• Fokus pada Hasil (Meningkatkan Konversi)</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-2xl p-10 border border-surface-section shadow-sm">
          <h3 className="text-2xl font-bold text-text-color mb-4">Siap untuk Berkolaborasi?</h3>
          <p className="text-text-color-secondary mb-8 max-w-xl mx-auto">
            Jelajahi koleksi produk digital kami atau hubungi kami untuk layanan desain custom yang disesuaikan dengan kebutuhan unik brand Anda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products">
              <Button label="Lihat Produk" size="large" className="w-full sm:w-auto font-bold px-8 shadow-md" />
            </Link>
            <Link href="/contact">
              <Button label="Hubungi Kami" severity="secondary" outlined size="large" className="w-full sm:w-auto font-semibold px-8" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
