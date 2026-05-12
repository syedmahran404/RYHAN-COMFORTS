import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/utils/constants';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center pt-24">
      <div className="absolute inset-0 -z-10 bg-walnut-grain opacity-70" />
      <div className="noise-overlay" />
      <div className="vignette" />

      <div className="luxe-container text-center">
        <p className="eyebrow justify-center">Lost in the atelier</p>
        <h1 className="mt-6 font-display text-hero text-cream-50">
          <span className="gold-text italic">404</span>
        </h1>
        <p className="mt-4 max-w-md mx-auto text-sm text-cream-200/70">
          This room hasn't been finished yet. Let us walk you back.
        </p>
        <div className="mt-10">
          <Link href={ROUTES.home}>
            <Button size="lg">Back to the hall</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
