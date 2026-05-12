import { Hero } from '@/features/home/Hero';
import { StoryStrip } from '@/features/home/StoryStrip';
import { SignatureCollections } from '@/features/home/SignatureCollections';
import { CraftProcess } from '@/features/home/CraftProcess';
import { Testimonials } from '@/features/home/Testimonials';
import { FinalCTA } from '@/features/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StoryStrip />
      <SignatureCollections />
      <CraftProcess />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
