import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/api';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group h-full flex flex-col bg-white rounded-2xl border border-border-color/50 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link href={`/blog/${post.slug}`} className="block relative w-full h-48 sm:h-52 overflow-hidden bg-surface-ground">
        {post.thumbnailUrl ? (
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-color-secondary/30 bg-primary-color/5">
            <span className="font-semibold">No Image</span>
          </div>
        )}
        
        {post.category && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm z-10 uppercase tracking-wider">
            {post.category.name}
          </div>
        )}
      </Link>

      <div className="flex-1 flex flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 text-xs text-text-color-secondary mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={post.publishedAt || ''}>
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Draft'}
          </time>
        </div>

        <h3 className="text-xl font-bold text-text-color mb-3 leading-snug group-hover:text-primary-color transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
            {post.title}
          </Link>
        </h3>
        
        <p className="text-text-color-secondary text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-4 border-t border-surface-section">
          <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-primary-color hover:text-primary-700 transition-colors group/link">
            Baca Artikel <ArrowRight className="w-4 h-4 transform transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
