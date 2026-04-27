import { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Hubungi Kami - Baituna Studio',
  description: 'Ada pertanyaan atau ingin konsultasi desain? Hubungi Baituna Studio melalui form kontak kami.',
};

export default function ContactPage() {
  return (
    <div className="bg-surface-ground min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-color mb-4">Hubungi Kami</h1>
          <p className="text-lg text-text-color-secondary max-w-2xl mx-auto">
            Punya pertanyaan, butuh bantuan, atau ingin konsultasi kebutuhan desain? Kami siap membantu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-surface-section">
            <h2 className="text-xl font-bold text-text-color mb-6">Kirim Pesan</h2>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-surface-section">
              <h2 className="text-xl font-bold text-text-color mb-6">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary-50 text-primary-color p-3 rounded-lg">
                    <i className="pi pi-envelope text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-color">Email</h4>
                    <a href="mailto:hello@baitunastudio.biz.id" className="text-primary-color hover:underline">
                      hello@baitunastudio.biz.id
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-primary-50 text-primary-color p-3 rounded-lg">
                    <i className="pi pi-instagram text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-color">Instagram</h4>
                    <a href="https://instagram.com/baitunastudio" target="_blank" rel="noopener noreferrer" className="text-primary-color hover:underline">
                      @baitunastudio
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-primary-50 text-primary-color p-3 rounded-lg">
                    <i className="pi pi-shopping-bag text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-color">Toko Online</h4>
                    <a href="https://lynk.id/baitunastudio" target="_blank" rel="noopener noreferrer" className="text-primary-color hover:underline">
                      lynk.id/baitunastudio
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100">
              <h3 className="text-lg font-bold text-text-color mb-3">💡 Tips</h3>
              <p className="text-text-color-secondary leading-relaxed">
                Untuk respon lebih cepat, Anda juga bisa langsung menghubungi kami via DM Instagram. Pastikan sertakan detail kebutuhan Anda agar kami bisa memberikan solusi yang tepat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
