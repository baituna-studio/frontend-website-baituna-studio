import Link from 'next/link';
import { Button } from 'primereact/button';
import { ProductCard } from '@/components/ui/ProductCard';
import { fetchApi } from '@/lib/api';
import { Product } from '@/types/api';

export async function FeaturedProductsSection() {
  let products: Product[] = [];
  try {
    // Fetch featured products
    products = await fetchApi<Product[]>('/api/products?featured=true');
    // Fallback if no featured products
    if (products.length === 0) {
      products = await fetchApi<Product[]>('/api/products');
    }
  } catch (error) {
    console.error('Error fetching featured products:', error);
  }

  // Display max 3 products
  const displayProducts = products.slice(0, 3);

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-color mb-3">Produk Pilihan</h2>
            <p className="text-text-color-secondary">Template dan bundle terbaik untuk kebutuhan Anda.</p>
          </div>
          <Link href="/products">
            <Button label="Lihat Semua Produk" icon="pi pi-arrow-right" iconPos="right" text className="p-0 font-semibold" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
