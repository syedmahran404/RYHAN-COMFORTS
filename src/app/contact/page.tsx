import type { Metadata } from 'next';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/data/brand';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { Separator } from '@/components/ui/Separator';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Speak with the Ryhan Comforts atelier. Direct lines to our owner and sub-manager, plus WhatsApp and email.'
};

export default function ContactPage() {
  return (
    <section className="relative min-h-[100svh] bg-ivory-100 pt-32 pb-24">
      <div className="absolute inset-0 -z-10 bg-ivory-paper opacity-60" />
      <div className="noise-overlay" />

      <div className="luxe-container">
        <Badge>Begin the conversation</Badge>
        <Reveal>
          <h1 className="mt-6 font-display text-display text-pewter-800 text-balance">
            We answer <span className="gold-text italic">personally.</span>
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-px bg-pewter-300/40 md:grid-cols-2">
          {BRAND.phones.map((p, i) => (
            <a
              key={p}
              href={`tel:${BRAND.phonesRaw[i]}`}
              className="group relative overflow-hidden bg-ivory-50 p-10 transition-colors hover:bg-ivory-100"
            >
              <p className="text-[10px] uppercase tracking-luxe text-walnut-500">
                {i === 0 ? `${BRAND.owner} · Owner` : `${BRAND.subManager} · Sub-manager`}
              </p>
              <p className="mt-6 flex items-center gap-4 font-display text-3xl text-pewter-800">
                <Phone className="h-5 w-5 text-walnut-500" />
                {p}
              </p>
              <p className="mt-3 text-sm text-pewter-500">
                Direct line · 10:00 – 20:00 IST, Monday to Saturday
              </p>
            </a>
          ))}
        </div>

        <Separator className="my-14" label="Or" />

        <div className="grid gap-6 md:grid-cols-3">
          <a
            href={`https://wa.me/${BRAND.phonesRaw[0].replace('+', '')}`}
            className="paper-card block p-8 transition-colors hover:border-champagne-300"
          >
            <MessageCircle className="h-5 w-5 text-walnut-500" />
            <p className="mt-5 font-display text-2xl text-pewter-800">WhatsApp</p>
            <p className="mt-2 text-sm text-pewter-500">{BRAND.whatsapp}</p>
          </a>
          <a
            href={`mailto:${BRAND.email}`}
            className="paper-card block p-8 transition-colors hover:border-champagne-300"
          >
            <Mail className="h-5 w-5 text-walnut-500" />
            <p className="mt-5 font-display text-2xl text-pewter-800">Email</p>
            <p className="mt-2 text-sm text-pewter-500">{BRAND.email}</p>
          </a>
          <div className="paper-card p-8">
            <MapPin className="h-5 w-5 text-walnut-500" />
            <p className="mt-5 font-display text-2xl text-pewter-800">Atelier</p>
            <p className="mt-2 text-sm text-pewter-500">
              {BRAND.address.city}, {BRAND.address.state}
              <br />
              {BRAND.address.country}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
