'use client';

import { Marquee } from '@/components/motion/Marquee';
import { Reveal } from '@/components/motion/Reveal';

const QUOTES = [
  {
    q: 'The sofa fits our living room as if the room was built around it. Every stitch is intentional.',
    author: 'Rhea & Arjun',
    place: 'Jayanagar, Bengaluru'
  },
  {
    q: 'Ten weeks of anticipation, a lifetime of use. Ryhan delivered an heirloom, not a sofa.',
    author: 'Dr. Kiran Shetty',
    place: 'Whitefield, Bengaluru'
  },
  {
    q: 'Azam personally oversaw our carved bed. The hand-carving is museum-grade.',
    author: 'The Khans',
    place: 'HSR Layout'
  },
  {
    q: 'They said no ready stock. Now we understand why. Our curtains hang like architecture.',
    author: 'Maya Iyer',
    place: 'Koramangala'
  },
  {
    q: 'The hydraulic bed is engineered like a Bentley. Quiet, exact, eternal.',
    author: 'The Fernandes',
    place: 'Indiranagar'
  }
];

export function Testimonials() {
  return (
    <section className="relative border-y border-pewter-300/70 bg-ivory-100 py-24">
      <div className="luxe-container mb-14">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Voices from our rooms</p>
            <Reveal>
              <h2 className="mt-6 font-display text-display text-pewter-800 text-balance">
                Heirlooms, <span className="gold-text italic">in their homes.</span>
              </h2>
            </Reveal>
          </div>
        </div>
      </div>

      <Marquee pauseOnHover>
        {QUOTES.map((q) => (
          <figure
            key={q.author}
            className="flex w-[380px] shrink-0 flex-col gap-6 border border-pewter-300/70 bg-ivory-50 p-8 shadow-soft"
          >
            <svg
              viewBox="0 0 40 40"
              className="h-7 w-7 text-champagne-300"
              fill="currentColor"
            >
              <path d="M14 10c-5 0-9 4-9 9v11h10V20H9c0-3 2-5 5-5zm16 0c-5 0-9 4-9 9v11h10V20h-6c0-3 2-5 5-5z" />
            </svg>
            <blockquote className="font-display text-xl leading-relaxed text-pewter-700 text-pretty">
              "{q.q}"
            </blockquote>
            <figcaption className="mt-auto">
              <p className="font-display text-base text-walnut-500">{q.author}</p>
              <p className="mt-1 text-[10px] uppercase tracking-luxe text-pewter-400">{q.place}</p>
            </figcaption>
          </figure>
        ))}
      </Marquee>
    </section>
  );
}
