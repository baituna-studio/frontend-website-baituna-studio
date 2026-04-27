import Link from 'next/link';
import { Button } from 'primereact/button';
import { ProductCard } from '@/components/ui/ProductCard';
import { fetchApi } from '@/lib/api';
import { Product } from '@/types/api';
import { PackageOpen } from 'lucide-react';

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

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-text-color mb-3 tracking-tight">Produk Pilihan Terlaris</h2>
            <p className="text-text-color-secondary text-lg">Template premium dan bundle terbaik untuk mempercepat pekerjaan desain Anda.</p>
          </div>
          <Link href="/products">
            <Button label="Lihat Semua Produk" icon="pi pi-arrow-right" iconPos="right" text className="p-0 font-semibold text-primary-color hover:text-primary-700" />
          </Link>
        </div>
        
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-dashed border-border-color text-center">
            <div className="w-20 h-20 bg-primary-color/5 rounded-full flex items-center justify-center mb-4 text-primary-color">
              <PackageOpen size={40} />
            </div>
            <h3 className="text-xl font-bold text-text-color mb-2">Produk Segera Hadir</h3>
            <p className="text-text-color-secondary max-w-md">Kami sedang menyiapkan produk digital berkualitas tinggi untuk Anda. Nantikan update dari kami!</p>
          </div>
        )}
      </div>
    </section>
  );
}
