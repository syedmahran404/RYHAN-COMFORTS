import Image from 'next/image';
import type { Metadata } from 'next';
import { BRAND } from '@/lib/data/brand';
import { ROOM_STAGING } from '@/lib/data/imagery';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'The Atelier',
  description: BRAND.description
};

export default function AboutPage() {
  const img = ROOM_STAGING[5];
  return (
    <section className="relative min-h-[100svh] bg-ivory-100 pt-32 pb-24">
      <div className="absolute inset-0 -z-10 bg-ivory-paper opacity-60" />
      <div className="noise-overlay" />

      <div className="luxe-container">
        <Badge>Est. {BRAND.founded} · Bengaluru</Badge>
        <Reveal>
          <h1 className="mt-6 font-display text-display text-pewter-800 text-balance">
            The <span className="gold-text italic">atelier.</span>
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <Reveal delay={0.1}>
            <div className="space-y-6 text-base leading-relaxed text-pewter-600 text-pretty">
              <p>{BRAND.description}</p>
              <p>
                We are not a factory. We are a studio of carpenters, upholsterers, tailors and
                finishers — each piece passes through our four gates of consult, design, craft
                and delivery.
              </p>
              <p>
                Every commission is personally signed off by our owner,{' '}
                <span className="text-walnut-500">{BRAND.owner}</span>, and walked through by our
                sub-manager, <span className="text-walnut-500">{BRAND.subManager}</span>.
              </p>
            </div>

            <div className="mt-10 relative aspect-[16/9] w-full overflow-hidden zoom-frame shadow-editorial">
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <aside className="paper-card p-8">
              <p className="eyebrow">Leadership</p>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-luxe text-pewter-400">Owner</p>
                  <p className="mt-1 font-display text-2xl text-pewter-800">{BRAND.owner}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-luxe text-pewter-400">
                    Sub-manager
                  </p>
                  <p className="mt-1 font-display text-2xl text-pewter-800">{BRAND.subManager}</p>
                </div>
                <div className="border-t border-pewter-300/60 pt-6">
                  <p className="text-[10px] uppercase tracking-luxe text-pewter-400">
                    Direct lines
                  </p>
                  {BRAND.phones.map((p, i) => (
                    <a
                      key={p}
                      href={`tel:${BRAND.phonesRaw[i]}`}
                      className="mt-2 block font-mono text-sm text-walnut-500 hover:text-walnut-400"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
