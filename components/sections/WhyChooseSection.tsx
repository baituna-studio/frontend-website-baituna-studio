import { Palette, Zap, CheckCircle, HeadphonesIcon } from 'lucide-react';

const valueProps = [
  {
    icon: <Palette className="w-10 h-10 text-primary-color mb-4" />,
    title: 'Desain Aesthetic',
    description: 'Style modern, bersih, dan profesional yang disesuaikan dengan tren terkini untuk meningkatkan trust audiens Anda.'
  },
  {
    icon: <Zap className="w-10 h-10 text-primary-color mb-4" />,
    title: 'Siap Pakai & Mudah',
    description: 'Cukup copy-paste dan sedikit penyesuaian. Anda tidak perlu mulai dari 0 atau belajar tools rumit.'
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-primary-color mb-4" />,
    title: 'Kualitas Premium',
    description: 'Setiap aset dibuat dengan standar agensi profesional namun dijual dengan harga bersahabat untuk UMKM.'
  },
  {
    icon: <HeadphonesIcon className="w-10 h-10 text-primary-color mb-4" />,
    title: 'Support Terbaik',
    description: 'Bingung cara pakai? Kami siap membantu menjawab pertanyaan Anda melalui chat dukungan.'
  }
];

export function WhyChooseSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-color mb-4">Mengapa Memilih Baituna Studio?</h2>
          <p className="text-lg text-text-color-secondary">Kami berdedikasi membantu UMKM dan konten kreator tampil lebih menonjol.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-surface-section shadow-sm hover:shadow-md transition-shadow text-center md:text-left flex flex-col items-center md:items-start">
              {prop.icon}
              <h3 className="text-xl font-bold text-text-color mb-3">{prop.title}</h3>
              <p className="text-text-color-secondary leading-relaxed">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
