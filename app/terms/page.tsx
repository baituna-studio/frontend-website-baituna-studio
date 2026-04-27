import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan - Baituna Studio',
  description: 'Syarat dan ketentuan penggunaan situs web dan produk digital Baituna Studio.',
};

export default function TermsPage() {
  return (
    <div className="bg-surface-ground min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-surface-section">
          <h1 className="text-3xl md:text-4xl font-bold text-text-color mb-8">Syarat & Ketentuan</h1>
          <div className="prose prose-lg max-w-none text-text-color-secondary">
            <p><em>Terakhir diperbarui: April 2026</em></p>

            <h2>1. Penerimaan Ketentuan</h2>
            <p>
              Dengan mengakses dan menggunakan situs web baitunastudio.biz.id ("Situs"), Anda menyetujui syarat dan ketentuan ini. Jika Anda tidak menyetujui ketentuan ini, harap tidak menggunakan Situs kami.
            </p>

            <h2>2. Lisensi Produk Digital</h2>
            <p>
              Seluruh produk digital yang dijual melalui Baituna Studio dilisensikan, bukan dijual. Lisensi yang diberikan adalah:
            </p>
            <ul>
              <li><strong>Penggunaan Personal:</strong> Anda dapat menggunakan produk untuk keperluan pribadi atau portofolio.</li>
              <li><strong>Penggunaan Komersial (Brand Sendiri):</strong> Anda dapat menggunakan produk untuk kebutuhan bisnis/brand Anda sendiri.</li>
              <li><strong>Dilarang:</strong> Menjual ulang (resell), membagikan ulang, mendistribusikan, atau mengeklaim desain sebagai karya Anda sendiri.</li>
            </ul>

            <h2>3. Pembayaran & Pengiriman</h2>
            <p>
              Semua pembayaran dilakukan melalui platform Lynk.id. Setelah pembayaran dikonfirmasi, akses ke file produk digital akan diberikan secara otomatis melalui tautan unduhan.
            </p>

            <h2>4. Pengembalian Dana</h2>
            <p>
              Karena sifat produk digital yang tidak dapat dikembalikan setelah diunduh, kami tidak menerima pengembalian dana. Jika Anda mengalami masalah teknis dengan produk, silakan hubungi kami melalui halaman <a href="/contact">Kontak</a>.
            </p>

            <h2>5. Hak Kekayaan Intelektual</h2>
            <p>
              Seluruh konten di Situs ini, termasuk desain, teks, grafis, logo, dan produk digital, merupakan hak cipta Baituna Studio kecuali dinyatakan lain. Anda tidak diizinkan untuk mereproduksi konten tanpa izin tertulis.
            </p>

            <h2>6. Batasan Tanggung Jawab</h2>
            <p>
              Baituna Studio tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang timbul dari penggunaan Situs atau produk digital kami. Produk disediakan "sebagaimana adanya" tanpa jaminan dalam bentuk apa pun.
            </p>

            <h2>7. Perubahan Ketentuan</h2>
            <p>
              Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan berlaku setelah dipublikasikan di halaman ini.
            </p>

            <h2>8. Kontak</h2>
            <p>
              Pertanyaan mengenai syarat dan ketentuan ini dapat diajukan melalui email ke <a href="mailto:hello@baitunastudio.biz.id">hello@baitunastudio.biz.id</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
