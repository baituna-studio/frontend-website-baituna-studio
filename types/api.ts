export interface Product {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  price: string | null;
  lynkUrl: string | null;
  thumbnailUrl: string | null;
  isFeatured: boolean;
  benefits: any;
  features: any;
  faqs: any;
  seoTitle: string | null;
  seoDescription: string | null;
  testimonials?: Testimonial[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  rating: number;
  avatarUrl: string | null;
  product?: Partial<Product>;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  thumbnailUrl: string | null;
  tags: string[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  publishedAt: string | null;
  createdAt: string;
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: {
    posts: number;
  };
}
