import { Testimonial } from '@/types/api';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="group h-full flex flex-col p-6 sm:p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-border-color/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      {/* Decorative Quote Icon */}
      <div className="absolute top-4 right-4 text-primary-color/10 group-hover:text-primary-color/20 transition-colors duration-300 transform group-hover:scale-110">
        <Quote size={80} strokeWidth={1} />
      </div>

      <div className="flex flex-col h-full relative z-10">
        <div className="flex items-center gap-1 mb-5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} 
            />
          ))}
        </div>
        
        <p className="text-text-color text-lg italic mb-8 flex-1 leading-relaxed">
          "{testimonial.quote}"
        </p>
        
        <div className="mt-auto flex items-center gap-4">
          <div className="relative">
            {testimonial.avatarUrl ? (
              <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-color/20 p-0.5" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-inner ring-2 ring-primary-color/20 p-0.5">
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h4 className="font-bold text-text-color">{testimonial.name}</h4>
            {(testimonial.role || testimonial.product?.title) && (
              <p className="text-sm text-text-color-secondary mt-0.5">
                {testimonial.role ? testimonial.role : ''}
                {testimonial.role && testimonial.product?.title ? ' • ' : ''}
                {testimonial.product?.title ? <span className="text-primary-700">Membeli {testimonial.product?.title}</span> : ''}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
