'use client';

import { Accordion, AccordionTab } from 'primereact/accordion';

const faqs = [
  {
    question: "Bagaimana cara mendapatkan file setelah membeli?",
    answer: "Setelah menyelesaikan pembayaran melalui Lynk.id, Anda akan langsung diarahkan ke halaman berisi akses file (biasanya link Google Drive atau Canva) dan salinan resi beserta link akses akan dikirimkan otomatis ke email Anda."
  },
  {
    question: "Apakah file ini bisa saya jual kembali?",
    answer: "Tidak. Seluruh produk template dari Baituna Studio dilisensikan untuk Penggunaan Personal atau Penggunaan Komersial untuk Brand Sendiri. Anda tidak diizinkan untuk menjual ulang (resell), membagikan ulang, atau mengeklaim sebagai hak milik Anda."
  },
  {
    question: "Saya pemula, apakah mudah digunakan?",
    answer: "Sangat mudah! Template kami didesain khusus agar user-friendly. Sebagian besar template menggunakan Canva yang sangat mudah dioperasikan, cukup drag & drop saja."
  },
  {
    question: "Bagaimana jika saya butuh bantuan saat mengedit?",
    answer: "Kami menyediakan layanan bantuan dasar terkait akses materi. Jika Anda butuh bantuan lebih lanjut atau modifikasi berat, kami menyarankan untuk mengambil layanan 'Konsultasi Desain' atau Jasa Pembuatan Desain Custom."
  }
];

export function FAQSection() {
  return (
    <section className="py-20 bg-surface-ground">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-color mb-4">Pertanyaan Seputar Produk</h2>
          <p className="text-lg text-text-color-secondary">Mungkin ada beberapa pertanyaan yang sering ditanyakan di bawah ini.</p>
        </div>
        
        <div className="card shadow-sm rounded-2xl bg-white overflow-hidden p-2 md:p-6">
          <Accordion multiple activeIndex={[0]}>
            {faqs.map((faq, index) => (
              <AccordionTab key={index} header={faq.question} headerClassName="font-semibold text-lg text-text-color">
                <p className="m-0 text-text-color-secondary leading-relaxed">{faq.answer}</p>
              </AccordionTab>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
