import Link from 'next/link';
import { Button } from 'primereact/button';
import { BlogCard } from '@/components/ui/BlogCard';
import { fetchApi } from '@/lib/api';
import { BlogPost } from '@/types/api';

export async function LatestBlogSection() {
  let posts: BlogPost[] = [];
  try {
    posts = await fetchApi<BlogPost[]>('/api/posts');
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }

  // Display max 3 posts
  const displayPosts = posts.slice(0, 3);

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-surface-ground">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-color mb-3">Blog & Tips Terbaru</h2>
            <p className="text-text-color-secondary">Insight seputar desain, branding, dan bisnis digital.</p>
          </div>
          <Link href="/blog">
            <Button label="Baca Artikel Lainnya" icon="pi pi-arrow-right" iconPos="right" text className="p-0 font-semibold" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
