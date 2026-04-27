import { Metadata } from 'next';
import { Button } from 'primereact/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Jasa Desain - Baituna Studio',
  description: 'Layanan desain custom dari Baituna Studio. Mulai dari desain logo, branding, hingga manajemen media sosial untuk kebutuhan bisnis Anda.',
};

const services = [
  {
    id: 'branding',
    title: 'Brand Identity',
    description: 'Bantu bisnis Anda tampil profesional dengan identitas visual yang terarah, mulai dari logo, pemilihan warna, hingga tipografi.',
    icon: 'pi-palette',
  },
  {
    id: 'social-media',
    title: 'Social Media Management',
    description: 'Kami bantu kelola feed dan story media sosial Anda dengan desain aesthetic dan strategi konten yang meningkatkan engagement.',
    icon: 'pi-instagram',
  },
  {
    id: 'marketing-kit',
    title: 'Marketing Kit',
    description: 'Tingkatkan konversi penjualan Anda dengan desain banner, flyer, dan materi promosi lainnya yang memikat mata pelanggan.',
    icon: 'pi-megaphone',
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'Desain website dan aplikasi yang tidak hanya cantik dipandang, tetapi juga mudah digunakan dan berfokus pada user experience.',
    icon: 'pi-desktop',
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-surface-ground min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block bg-primary-50 text-primary-color px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Layanan Kami
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-color mb-6">Jasa Desain Custom</h1>
          <p className="text-xl text-text-color-secondary leading-relaxed">
            Tidak menemukan template yang pas? Kami siap membantu mewujudkan visi desain Anda secara eksklusif dan profesional.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl p-8 shadow-sm border border-surface-section hover:shadow-md transition-shadow group">
              <div className="bg-primary-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i className={`pi ${service.icon} text-3xl text-primary-color`}></i>
              </div>
              <h3 className="text-2xl font-bold text-text-color mb-4">{service.title}</h3>
              <p className="text-text-color-secondary leading-relaxed mb-6">
                {service.description}
              </p>
              <Link href="/contact" className="text-primary-color font-semibold hover:underline flex items-center gap-2">
                Pesan Sekarang <i className="pi pi-arrow-right text-sm"></i>
              </Link>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-primary-color rounded-3xl p-10 md:p-16 text-white text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Cara Kerja Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-white/20 -z-0"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white text-primary-color rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">1</div>
              <h3 className="text-xl font-bold mb-3">Konsultasi</h3>
              <p className="text-white/80">Ceritakan kebutuhan, visi, dan preferensi desain Anda kepada tim kami.</p>
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white text-primary-color rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">2</div>
              <h3 className="text-xl font-bold mb-3">Pengerjaan</h3>
              <p className="text-white/80">Tim kami akan mulai mendesain sesuai dengan brief yang telah disepakati.</p>
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white text-primary-color rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">3</div>
              <h3 className="text-xl font-bold mb-3">Revisi & Finalisasi</h3>
              <p className="text-white/80">Review hasil desain. Kami memberikan kesempatan revisi hingga sempurna.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-2xl p-10 border border-surface-section shadow-sm">
          <h3 className="text-2xl font-bold text-text-color mb-4">Punya Proyek Spesial?</h3>
          <p className="text-text-color-secondary mb-8 max-w-xl mx-auto">
            Mari diskusikan ide Anda bersama kami. Tim kreatif kami siap membantu memberikan solusi desain terbaik untuk bisnis Anda.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button label="Mulai Proyek Sekarang" icon="pi pi-send" size="large" className="font-bold px-8 shadow-md" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
