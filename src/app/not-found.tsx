import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/utils/constants';
import { ROOM_STAGING } from '@/lib/data/imagery';

export default function NotFound() {
  const img = ROOM_STAGING[0];
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 -z-10">
        <Image src={img.url} alt={img.alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ivory-100/85" />
      </div>
      <div className="noise-overlay" />

      <div className="luxe-container text-center">
        <p className="eyebrow justify-center">Lost in the atelier</p>
        <h1 className="mt-6 font-display text-hero text-pewter-800">
          <span className="gold-text italic">404</span>
        </h1>
        <p className="mt-4 max-w-md mx-auto text-sm text-pewter-500">
          This room hasn't been finished yet. Let us walk you back.
        </p>
        <div className="mt-10">
          <Link href={ROUTES.home}>
            <Button size="lg" variant="primary">
              Back to the hall
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
