import { Metadata } from 'next';
import { fetchApi } from '@/lib/api';
import { Product } from '@/types/api';
import { ProductCard } from '@/components/ui/ProductCard';

export const metadata: Metadata = {
  title: 'Produk Digital - Baituna Studio',
  description: 'Jelajahi koleksi produk digital premium kami mulai dari template desain hingga bundle eksklusif untuk kebutuhan bisnis Anda.',
};

// Revalidate every hour
export const revalidate = 3600;

export default async function ProductsPage() {
  let products: Product[] = [];
  
  try {
    products = await fetchApi<Product[]>('/api/products');
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <div className="bg-surface-ground min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-color mb-4">Semua Produk</h1>
          <p className="text-lg text-text-color-secondary max-w-2xl mx-auto">
            Temukan berbagai solusi desain dan aset digital untuk memaksimalkan potensi brand Anda.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-surface-section">
            <i className="pi pi-inbox text-4xl text-text-color-secondary mb-4"></i>
            <h3 className="text-xl font-bold text-text-color mb-2">Belum ada produk</h3>
            <p className="text-text-color-secondary">Saat ini belum ada produk yang tersedia. Silakan cek kembali nanti.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
