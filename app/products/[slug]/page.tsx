import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { Product, Testimonial } from '@/types/api';
import { Button } from 'primereact/button';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { ClickTrackedLink } from '@/components/ui/ClickTrackedLink';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

// Revalidate every hour
export const revalidate = 3600;
// Allow slugs not returned by generateStaticParams to be rendered on-demand
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const products = await fetchApi<Product[]>('/api/products');
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('Failed to generate product static params', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await fetchApi<Product>(`/api/products/${slug}`);
    
    return {
      title: product.seoTitle || `${product.title} - Baituna Studio`,
      description: product.seoDescription || product.shortDescription,
    };
  } catch (error) {
    return {
      title: 'Produk - Baituna Studio',
    };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  let product: Product | null = null;
  let testimonials: Testimonial[] = [];
  
  try {
    product = await fetchApi<Product>(`/api/products/${slug}`);
    
    // Fetch testimonials related to this product if needed
    // Assuming backend endpoint /api/testimonials?productId=...
    try {
      testimonials = await fetchApi<Testimonial[]>(`/api/testimonials?productId=${product.id}`);
    } catch (e) {
      console.warn('Failed to fetch testimonials', e);
    }
  } catch (error) {
    notFound();
  }

  if (!product) {
    notFound();
  }

  // Parse JSON fields if they come as strings
  const parseJsonField = (field: any) => {
    if (!field) return null;
    if (typeof field === 'string') {
      try { return JSON.parse(field); } catch { return null; }
    }
    return field;
  };

  const benefits = parseJsonField(product.benefits);
  const features = parseJsonField(product.features);
  const faqs = parseJsonField(product.faqs);

  return (
    <div className="bg-surface-ground min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-surface-section py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-color mb-4 leading-tight">
                {product.title}
              </h1>
              <p className="text-lg text-text-color-secondary mb-8 leading-relaxed">
                {product.shortDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ClickTrackedLink
                  href={product.lynkUrl || '#'}
                  productSlug={product.slug}
                  productName={product.title}
                  sourcePage={`/products/${product.slug}`}
                  ctaPlacement="hero"
                  className="w-full font-bold shadow-md"
                />
                {product.price && (
                  <div className="text-2xl font-bold text-text-color">
                    {product.price}
                  </div>
                )}
              </div>
            </div>
            
            <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-lg border border-surface-section bg-surface-ground flex items-center justify-center aspect-video relative">
              {product.thumbnailUrl ? (
                <img 
                  src={product.thumbnailUrl} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <i className="pi pi-image text-8xl text-surface-400"></i>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Description & Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {product.description && (
            <div className="prose prose-lg max-w-none text-text-color-secondary mb-16">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}

          {benefits && Array.isArray(benefits) && benefits.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-text-color mb-8 text-center">Benefit yang Didapatkan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-surface-section flex gap-4 items-start">
                    <div className="bg-primary-50 text-primary-color p-3 rounded-lg">
                      <i className={`pi ${benefit.icon || 'pi-check'} text-xl`}></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-text-color mb-1">{benefit.title}</h4>
                      <p className="text-sm text-text-color-secondary">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {features && Array.isArray(features) && features.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-text-color mb-8 text-center">Fitur Utama</h2>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-surface-section">
                <ul className="space-y-4">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3">
                      <i className="pi pi-check-circle text-primary-color mt-1"></i>
                      <div>
                        <strong className="text-text-color block">{feature.title}</strong>
                        <span className="text-text-color-secondary">{feature.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Render FAQ Client Component */}
          {faqs && Array.isArray(faqs) && faqs.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-text-color mb-8 text-center">FAQ</h2>
              <ProductDetailClient faqs={faqs} />
            </div>
          )}

        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-white border-t border-surface-section">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-text-color mb-12 text-center">Kata Mereka</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map(testimonial => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20 bg-primary-color text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Mulai Sekarang</h2>
          <p className="text-lg opacity-90 mb-8">Dapatkan akses langsung ke desain premium ini.</p>
          <ClickTrackedLink
            href={product.lynkUrl || '#'}
            productSlug={product.slug}
            productName={product.title}
            sourcePage={`/products/${product.slug}`}
            ctaPlacement="bottom"
            label="Beli di Lynk.id Sekarang"
            className="bg-white text-primary-color border-white hover:bg-surface-ground hover:border-surface-ground font-bold px-8 shadow-lg"
          />
        </div>
      </section>
    </div>
  );
}
