'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
import { BRAND } from '@/lib/data/brand';
import { ROUTES } from '@/lib/utils/constants';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ROOM_STAGING } from '@/lib/data/imagery';

export function FinalCTA() {
  const bg = ROOM_STAGING[1];
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10">
        <Image src={bg.url} alt={bg.alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ivory-100/85" />
      </div>
      <div className="noise-overlay" />

      <div className="luxe-container relative text-center">
        <Reveal>
          <p className="eyebrow justify-center">Begin your commission</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-8 max-w-4xl font-display text-display text-pewter-800 text-balance">
            Your next piece is <span className="gold-text italic">already being drawn.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-pewter-500 text-pretty">
            Open our live atelier configurator, or speak directly with {BRAND.subManager} — our
            sub-manager — who personally walks every client through their first commission.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <Link href={ROUTES.configuratorSofa}>
                <Button size="lg" variant="primary">
                  Open the configurator
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </MagneticButton>
            <a href={`tel:${BRAND.phonesRaw[0]}`}>
              <Button size="lg" variant="outline">
                <Phone className="h-4 w-4" />
                {BRAND.phones[0]}
              </Button>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-10 text-[10px] uppercase tracking-luxe text-pewter-400">
            Or write to us · {BRAND.email}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
