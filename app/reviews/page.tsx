import { Metadata } from 'next';
import { fetchApi } from '@/lib/api';
import { Testimonial } from '@/types/api';
import { TestimonialCard } from '@/components/ui/TestimonialCard';

export const metadata: Metadata = {
  title: 'Testimoni & Review - Baituna Studio',
  description: 'Lihat bagaimana pelanggan kami merasakan manfaat produk digital Baituna Studio untuk brand mereka.',
};

export const revalidate = 3600;

export default async function ReviewsPage() {
  let testimonials: Testimonial[] = [];
  
  try {
    testimonials = await fetchApi<Testimonial[]>('/api/testimonials');
  } catch (error) {
    console.error('Error fetching testimonials:', error);
  }

  return (
    <div className="bg-surface-ground min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-color mb-4">Testimoni & Review</h1>
          <p className="text-lg text-text-color-secondary max-w-2xl mx-auto">
            Cerita nyata dari pelanggan yang telah menggunakan produk digital Baituna Studio.
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-surface-section">
            <i className="pi pi-inbox text-4xl text-text-color-secondary mb-4"></i>
            <h3 className="text-xl font-bold text-text-color mb-2">Belum ada review</h3>
            <p className="text-text-color-secondary">Saat ini belum ada review yang tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
