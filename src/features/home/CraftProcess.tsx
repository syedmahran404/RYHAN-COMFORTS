'use client';

import { Reveal } from '@/components/motion/Reveal';

const STEPS = [
  {
    step: '01',
    title: 'Consult',
    body:
      'A private conversation — in person or on video — to understand your home, your scale, and your soul.'
  },
  {
    step: '02',
    title: 'Design',
    body:
      'Sketches, material samples, 3D previews. You see your piece before a single cut is made.'
  },
  {
    step: '03',
    title: 'Craft',
    body:
      'Six to ten weeks in the atelier. Hand-cut, hand-stitched, hand-finished by our master craftsmen.'
  },
  {
    step: '04',
    title: 'Deliver',
    body:
      'White-glove delivery and placement. Your piece arrives finished, not flat-packed.'
  }
];

export function CraftProcess() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="luxe-container">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">Our process</p>
            <Reveal>
              <h2 className="mt-6 font-display text-display text-cream-50 text-balance">
                Four weeks. <br />
                <span className="gold-text italic">Ten decisions.</span>
                <br />
                One heirloom.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-cream-200/70 text-pretty">
                Every Ryhan Comforts piece passes through four hands and four gates.
                We refuse to rush, and we refuse to compromise.
              </p>
            </Reveal>
          </div>

          <ol className="relative border-l border-obsidian-600 pl-10">
            {STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.1}>
                <li className="relative mb-14 last:mb-0">
                  <span className="absolute -left-[49px] flex h-7 w-7 items-center justify-center border border-gold-500/40 bg-obsidian-900 font-mono text-[10px] text-gold-200">
                    {s.step}
                  </span>
                  <h3 className="font-display text-3xl text-cream-50">{s.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream-200/70 text-pretty">
                    {s.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
