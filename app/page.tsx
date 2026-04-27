import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedProductsSection } from '@/components/sections/FeaturedProductsSection';
import { LatestBlogSection } from '@/components/sections/LatestBlogSection';
import { WhyChooseSection } from '@/components/sections/WhyChooseSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { TestimonialsHighlightSection } from '@/components/sections/TestimonialsHighlightSection';

export const metadata: Metadata = {
  title: 'Baituna Studio - Premium Digital Products & Branding for UMKM',
  description: 'Tingkatkan kualitas branding bisnis UMKM Anda dengan template desain premium yang siap pakai dan aesthetic.',
};

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <FeaturedProductsSection />
      <WhyChooseSection />
      <TestimonialsHighlightSection />
      <LatestBlogSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}
