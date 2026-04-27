import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi - Baituna Studio',
  description: 'Kebijakan privasi Baituna Studio mengenai pengumpulan dan penggunaan data pengguna.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-surface-ground min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-surface-section">
          <h1 className="text-3xl md:text-4xl font-bold text-text-color mb-8">Kebijakan Privasi</h1>
          <div className="prose prose-lg max-w-none text-text-color-secondary">
            <p><em>Terakhir diperbarui: April 2026</em></p>

            <h2>1. Informasi yang Kami Kumpulkan</h2>
            <p>
              Saat Anda menggunakan situs web Baituna Studio (baitunastudio.biz.id), kami dapat mengumpulkan informasi berikut:
            </p>
            <ul>
              <li><strong>Informasi Kontak:</strong> Nama, alamat email, dan nomor telepon yang Anda berikan melalui formulir kontak.</li>
              <li><strong>Data Penggunaan:</strong> Informasi tentang bagaimana Anda mengakses dan menggunakan situs web kami, termasuk alamat IP, jenis browser, dan halaman yang dikunjungi.</li>
              <li><strong>Data Analitik:</strong> Kami menggunakan Google Analytics dan Meta Pixel untuk memahami perilaku pengunjung secara agregat.</li>
            </ul>

            <h2>2. Penggunaan Informasi</h2>
            <p>Informasi yang kami kumpulkan digunakan untuk:</p>
            <ul>
              <li>Menanggapi pertanyaan dan permintaan Anda</li>
              <li>Meningkatkan pengalaman pengguna di situs kami</li>
              <li>Menganalisis tren dan pola penggunaan situs</li>
              <li>Mengirimkan informasi produk yang relevan (dengan persetujuan Anda)</li>
            </ul>

            <h2>3. Keamanan Data</h2>
            <p>
              Kami berkomitmen untuk melindungi informasi pribadi Anda. Kami menerapkan langkah-langkah keamanan yang wajar untuk mencegah akses tidak sah, pengungkapan, atau pengubahan data Anda.
            </p>

            <h2>4. Pihak Ketiga</h2>
            <p>
              Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami hanya membagikan informasi dengan penyedia layanan terpercaya yang membantu kami mengoperasikan situs (misalnya, layanan hosting dan analitik).
            </p>

            <h2>5. Hak Anda</h2>
            <p>
              Anda berhak untuk meminta akses, koreksi, atau penghapusan data pribadi Anda. Hubungi kami melalui halaman <a href="/contact">Kontak</a> untuk permintaan terkait data.
            </p>

            <h2>6. Perubahan Kebijakan</h2>
            <p>
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan diumumkan di halaman ini beserta tanggal pembaruan terakhir.
            </p>

            <h2>7. Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami di <a href="mailto:hello@baitunastudio.biz.id">hello@baitunastudio.biz.id</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
