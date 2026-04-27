import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { BlogPost } from '@/types/api';

interface Props {
  params: Promise<{ slug: string }>;
}

// Revalidate every hour
export const revalidate = 3600;
// Allow slugs not returned by generateStaticParams to be rendered on-demand
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const posts = await fetchApi<BlogPost[]>('/api/posts');
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Failed to generate blog static params', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await fetchApi<BlogPost>(`/api/posts/${slug}`);
    
    return {
      title: post.seoTitle || `${post.title} - Baituna Studio`,
      description: post.seoDescription || post.excerpt,
    };
  } catch (error) {
    return {
      title: 'Blog - Baituna Studio',
    };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  let post: BlogPost | null = null;
  
  try {
    post = await fetchApi<BlogPost>(`/api/posts/${slug}`);
  } catch (error) {
    notFound();
  }

  if (!post) {
    notFound();
  }

  // Format date
  const publishDate = post.publishedAt || post.createdAt;
  const formattedDate = new Date(publishDate).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-surface-ground min-h-screen pb-20">
      {/* Blog Hero */}
      <section className="bg-white border-b border-surface-section py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          {post.category && (
            <span className="inline-block bg-primary-50 text-primary-color px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              {post.category.name}
            </span>
          )}
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-color mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-text-color-secondary mb-10">
            <div className="flex items-center gap-2">
              <i className="pi pi-calendar"></i>
              <span>{formattedDate}</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-surface-300"></span>
                <div className="flex items-center gap-2">
                  <i className="pi pi-tags"></i>
                  <span>{post.tags[0]}</span>
                </div>
              </>
            )}
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-surface-section aspect-video bg-surface-ground w-full relative flex items-center justify-center">
            {post.thumbnailUrl ? (
              <img 
                src={post.thumbnailUrl} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            ) : (
               <i className="pi pi-image text-8xl text-surface-400"></i>
            )}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-surface-section">
            {/* 
              We use a prose class here which we will need to style in globals.css 
              or use tailwindcss/typography plugin. For now we use custom styles.
            */}
            <article 
              className="prose prose-lg max-w-none text-text-color prose-headings:text-text-color prose-a:text-primary-color"
              dangerouslySetInnerHTML={{ __html: post.content || 'Konten tidak tersedia.' }} 
            />
            
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-surface-section">
                <h4 className="font-semibold text-text-color mb-4">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-surface-section text-text-color-secondary px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
