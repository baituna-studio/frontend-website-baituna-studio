import Image from 'next/image';
import Link from 'next/link';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Product } from '@/types/api';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const header = product.thumbnailUrl ? (
    <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-surface-ground">
      {/* Fallback to simple img if domain not configued for next/image, but let's use next/image unoptimized for now */}
      <Image
        src={product.thumbnailUrl}
        alt={product.title}
        fill
        className="object-cover transition-transform duration-500 hover:scale-105"
        unoptimized
      />
    </div>
  ) : null;

  return (
    <Card header={header} className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-text-color mb-2">{product.title}</h3>
        {product.price && (
          <span className="text-primary-color font-semibold mb-3 inline-block">
            {product.price}
          </span>
        )}
        <p className="text-text-color-secondary line-clamp-2 mt-auto text-sm">
          {product.shortDescription || 'Deskripsi produk belum tersedia.'}
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-surface-section w-full">
        <Link href={`/products/${product.slug}`} className="w-full">
          <Button label="Lihat Detail" className="w-full" outlined />
        </Link>
      </div>
    </Card>
  );
}
