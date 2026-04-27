import Link from 'next/link';
import { Button } from 'primereact/button';
import { BlogCard } from '@/components/ui/BlogCard';
import { fetchApi } from '@/lib/api';
import { BlogPost } from '@/types/api';
import { FileText } from 'lucide-react';

export async function LatestBlogSection() {
  let posts: BlogPost[] = [];
  try {
    posts = await fetchApi<BlogPost[]>('/api/posts');
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }

  // Display max 3 posts
  const displayPosts = posts.slice(0, 3);

  return (
    <section className="py-24 bg-surface-section relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-text-color mb-3 tracking-tight">Blog & Tips Terbaru</h2>
            <p className="text-text-color-secondary text-lg">Insight seputar desain, branding, dan bisnis digital untuk kemajuan usaha Anda.</p>
          </div>
          <Link href="/blog">
            <Button label="Baca Artikel Lainnya" icon="pi pi-arrow-right" iconPos="right" text className="p-0 font-semibold text-primary-color hover:text-primary-700" />
          </Link>
        </div>
        
        {displayPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-surface-ground rounded-2xl border border-dashed border-border-color text-center">
            <div className="w-20 h-20 bg-primary-color/5 rounded-full flex items-center justify-center mb-4 text-primary-color">
              <FileText size={40} />
            </div>
            <h3 className="text-xl font-bold text-text-color mb-2">Belum Ada Artikel</h3>
            <p className="text-text-color-secondary max-w-md">Kami sedang menyiapkan konten-konten bermanfaat seputar dunia kreatif. Silakan kembali lagi nanti!</p>
          </div>
        )}
      </div>
    </section>
  );
}
