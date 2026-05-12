import type { Metadata } from 'next';
import { BRAND } from '@/lib/data/brand';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'The Atelier',
  description: BRAND.description
};

export default function AboutPage() {
  return (
    <section className="relative min-h-[100svh] pt-32 pb-24">
      <div className="absolute inset-0 -z-10 bg-walnut-grain opacity-80" />
      <div className="noise-overlay" />

      <div className="luxe-container">
        <Badge>Est. {BRAND.founded} · Bengaluru</Badge>
        <Reveal>
          <h1 className="mt-6 font-display text-display text-cream-50 text-balance">
            The <span className="gold-text italic">atelier.</span>
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <Reveal delay={0.1}>
            <div className="space-y-6 text-base leading-relaxed text-cream-200/75 text-pretty">
              <p>{BRAND.description}</p>
              <p>
                We are not a factory. We are a studio of carpenters, upholsterers, tailors and
                finishers — each piece passes through our four gates of consult, design, craft
                and delivery. We make what our clients ask us to make, and we make it well.
              </p>
              <p>
                Every commission is personally signed off by our owner,{' '}
                <span className="text-gold-200">{BRAND.owner}</span>, and walked through by our
                sub-manager, <span className="text-gold-200">{BRAND.subManager}</span>.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <aside className="glass-dark border border-gold-500/15 p-8">
              <p className="eyebrow">Leadership</p>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-luxe text-cream-200/50">Owner</p>
                  <p className="mt-1 font-display text-2xl text-cream-50">{BRAND.owner}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-luxe text-cream-200/50">
                    Sub-manager
                  </p>
                  <p className="mt-1 font-display text-2xl text-cream-50">{BRAND.subManager}</p>
                </div>
                <div className="border-t border-obsidian-600 pt-6">
                  <p className="text-[10px] uppercase tracking-luxe text-cream-200/50">
                    Direct lines
                  </p>
                  {BRAND.phones.map((p, i) => (
                    <a
                      key={p}
                      href={`tel:${BRAND.phonesRaw[i]}`}
                      className="mt-2 block font-mono text-sm text-gold-200 hover:text-gold-100"
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
