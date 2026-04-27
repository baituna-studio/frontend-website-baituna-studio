import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Product } from '@/types/api';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product & { featured?: boolean }; // Extending locally if needed
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group h-full flex flex-col bg-white rounded-2xl border border-border-color/50 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-surface-ground">
        {product.thumbnailUrl ? (
          <Image
            src={product.thumbnailUrl}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-color-secondary/30">
            <span className="font-semibold">No Image</span>
          </div>
        )}
        
        {product.featured && (
          <div className="absolute top-3 right-3 bg-gradient-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
            TERLARIS
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col p-5 sm:p-6 relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-text-color leading-tight group-hover:text-primary-color transition-colors">
            {product.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-text-color-secondary ml-1">(5.0)</span>
        </div>
        
        {product.price && (
          <span className="text-primary-700 font-bold text-lg mb-3 inline-block">
            {product.price}
          </span>
        )}
        
        <p className="text-text-color-secondary line-clamp-2 mt-auto text-sm leading-relaxed">
          {product.shortDescription || 'Deskripsi produk belum tersedia.'}
        </p>
      </div>

      <div className="p-5 pt-0 mt-auto">
        <Link href={`/products/${product.slug}`} className="block w-full">
          <Button label="Lihat Detail" className="w-full rounded-xl border-primary-color/20 text-primary-700 hover:bg-primary-color/5 transition-colors font-semibold py-2.5" outlined />
        </Link>
      </div>
    </div>
  );
}
