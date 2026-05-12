import { Hero } from '@/features/home/Hero';
import { StoryStrip } from '@/features/home/StoryStrip';
import { SignatureCollections } from '@/features/home/SignatureCollections';
import { CraftProcess } from '@/features/home/CraftProcess';
import { MaterialsPalette } from '@/features/home/MaterialsPalette';
import { HeritageStrip } from '@/features/home/HeritageStrip';
import { ScrollStoryteller } from '@/features/home/ScrollStoryteller';
import { Testimonials } from '@/features/home/Testimonials';
import { FinalCTA } from '@/features/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StoryStrip />
      <SignatureCollections />
      <MaterialsPalette />
      <HeritageStrip />
      <ScrollStoryteller />
      <CraftProcess />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
