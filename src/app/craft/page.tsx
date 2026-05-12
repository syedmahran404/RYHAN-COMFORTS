import type { Metadata } from 'next';
import { CraftProcess } from '@/features/home/CraftProcess';
import { Testimonials } from '@/features/home/Testimonials';
import { StoryStrip } from '@/features/home/StoryStrip';
import { MaterialsPalette } from '@/features/home/MaterialsPalette';

export const metadata: Metadata = {
  title: 'The Craft',
  description:
    "Inside the Ryhan Comforts atelier — our four-gate process, the hands, and the materials behind every piece."
};

export default function CraftPage() {
  return (
    <div className="pt-16 bg-ivory-100">
      <StoryStrip />
      <CraftProcess />
      <MaterialsPalette />
      <Testimonials />
    </div>
  );
}
