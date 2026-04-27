import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import { Testimonial } from '@/types/api';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full shadow-sm bg-white border border-surface-section">
      <div className="flex flex-col h-full">
        <Rating value={testimonial.rating} readOnly cancel={false} className="mb-4 text-orange-400" />
        <p className="text-text-color italic mb-6 felx-1 leading-relaxed">
          "{testimonial.quote}"
        </p>
        <div className="mt-auto flex items-center gap-3">
          {testimonial.avatarUrl ? (
            <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover bg-surface-ground" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-color/10 flex items-center justify-center text-primary-color font-bold">
              {testimonial.name.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="font-semibold text-text-color text-sm">{testimonial.name}</h4>
            {(testimonial.role || testimonial.product?.title) && (
              <p className="text-xs text-text-color-secondary">
                {testimonial.role ? testimonial.role : ''}
                {testimonial.role && testimonial.product?.title ? ' • ' : ''}
                {testimonial.product?.title ? `Membeli ${testimonial.product?.title}` : ''}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
