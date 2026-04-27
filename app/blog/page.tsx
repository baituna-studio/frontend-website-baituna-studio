import { Metadata } from 'next';
import { fetchApi } from '@/lib/api';
import { BlogPost } from '@/types/api';
import { BlogCard } from '@/components/ui/BlogCard';

export const metadata: Metadata = {
  title: 'Blog & Tips - Baituna Studio',
  description: 'Dapatkan artikel terbaru seputar desain, branding, dan tips mengembangkan UMKM di era digital.',
};

// Revalidate every hour
export const revalidate = 3600;

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  
  try {
    posts = await fetchApi<BlogPost[]>('/api/posts');
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }

  return (
    <div className="bg-surface-ground min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-color mb-4">Blog & Insight</h1>
          <p className="text-lg text-text-color-secondary max-w-2xl mx-auto">
            Pelajari insight terbaru mengenai branding, desain grafis, dan pemasaran digital untuk bisnis Anda.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-surface-section">
            <i className="pi pi-inbox text-4xl text-text-color-secondary mb-4"></i>
            <h3 className="text-xl font-bold text-text-color mb-2">Belum ada artikel</h3>
            <p className="text-text-color-secondary">Saat ini belum ada artikel yang dipublikasikan. Silakan cek kembali nanti.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
