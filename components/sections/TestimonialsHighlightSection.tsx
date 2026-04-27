import Link from 'next/link';
import { Button } from 'primereact/button';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { fetchApi } from '@/lib/api';
import { Testimonial } from '@/types/api';

export async function TestimonialsHighlightSection() {
  let testimonials: Testimonial[] = [];
  try {
    testimonials = await fetchApi<Testimonial[]>('/api/testimonials');
  } catch (error) {
    console.error('Error fetching testimonials:', error);
  }

  const displayTestimonials = testimonials.slice(0, 6);

  if (displayTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-surface-ground">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-color mb-3">Testimoni Pelanggan</h2>
            <p className="text-text-color-secondary">Apa kata mereka yang sudah menggunakan produk kami.</p>
          </div>
          <Link href="/reviews">
            <Button label="Lihat Semua Review" icon="pi pi-arrow-right" iconPos="right" text className="p-0 font-semibold" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
