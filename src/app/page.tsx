import { Hero } from '@/features/home/Hero';
import { StoryStrip } from '@/features/home/StoryStrip';
import { SignatureCollections } from '@/features/home/SignatureCollections';
import { SofaShowcase } from '@/features/home/SofaShowcase';
import { CraftProcess } from '@/features/home/CraftProcess';
import { MaterialsPalette } from '@/features/home/MaterialsPalette';
import { HeritageStrip } from '@/features/home/HeritageStrip';
import { ScrollStoryteller } from '@/features/home/ScrollStoryteller';
import { RoomStaging } from '@/features/home/RoomStaging';
import { Testimonials } from '@/features/home/Testimonials';
import { FinalCTA } from '@/features/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StoryStrip />
      <SignatureCollections />
      <SofaShowcase />
      <MaterialsPalette />
      <HeritageStrip />
      <RoomStaging />
      <ScrollStoryteller />
      <CraftProcess />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
