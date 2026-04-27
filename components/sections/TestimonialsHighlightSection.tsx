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

  const displayTestimonials = testimonials.slice(0, 8); // increased limit for better marquee

  if (displayTestimonials.length === 0) {
    return null;
  }

  // Duplicate the array to create a seamless infinite loop
  const marqueeItems = [...displayTestimonials, ...displayTestimonials];

  return (
    <section className="py-24 bg-surface-ground overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-color mb-4 tracking-tight">
              Dipercaya oleh Ratusan UMKM
            </h2>
            <p className="text-lg text-text-color-secondary leading-relaxed">
              Bergabunglah dengan mereka yang telah meningkatkan konversi dan 
              membangun brand profesional dengan produk Baituna Studio.
            </p>
          </div>
          <Link href="/reviews">
            <Button label="Lihat Semua Review" icon="pi pi-arrow-right" iconPos="right" outlined className="font-semibold rounded-xl px-6 py-3 border-primary-color/20 hover:bg-primary-color/5 text-primary-700" />
          </Link>
        </div>
      </div>
      
      {/* Marquee Container */}
      <div className="relative w-full flex">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-surface-ground to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-surface-ground to-transparent z-10 pointer-events-none"></div>
        
        {/* Track */}
        <div className="flex animate-marquee gap-6 w-max py-4 hover:[animation-play-state:paused]">
          {marqueeItems.map((testimonial, idx) => (
            <div key={`${testimonial.id}-${idx}`} className="w-[300px] md:w-[400px] flex-shrink-0">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
