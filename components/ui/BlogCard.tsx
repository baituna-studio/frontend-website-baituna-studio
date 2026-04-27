import Image from 'next/image';
import Link from 'next/link';
import { Card } from 'primereact/card';
import { BlogPost } from '@/types/api';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const header = post.thumbnailUrl ? (
    <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-surface-ground">
      <Image
        src={post.thumbnailUrl}
        alt={post.title}
        fill
        className="object-cover transition-transform duration-500 hover:scale-105"
        unoptimized
      />
    </div>
  ) : null;

  return (
    <Card header={header} className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-1 flex flex-col">
        {post.category && (
          <span className="text-xs font-semibold text-primary-color uppercase tracking-wider mb-2">
            {post.category.name}
          </span>
        )}
        <h3 className="text-lg font-bold text-text-color mb-2 leading-tight">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary-color transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-text-color-secondary text-sm line-clamp-3 mb-4 mt-auto">
          {post.excerpt}
        </p>
        <div className="text-xs text-text-color-secondary mt-auto pt-4 border-t border-surface-section">
          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Draft'}
        </div>
      </div>
    </Card>
  );
}
