import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { BRAND } from '@/lib/data/brand';
import { CATEGORIES } from '@/lib/data/categories';
import { ROUTES } from '@/lib/utils/constants';
import { Separator } from '@/components/ui/Separator';

export function Footer() {
  return (
    <footer className="relative border-t border-pewter-300 bg-ivory-50">
      <div className="noise-overlay" />

      <div className="luxe-container relative py-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <h3 className="font-display text-3xl text-pewter-800">{BRAND.name}</h3>
            <p className="mt-2 text-[11px] uppercase tracking-luxe text-walnut-500">
              Since {BRAND.founded} · Bespoke
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-pewter-500">
              {BRAND.description}
            </p>
          </div>

          <div>
            <p className="eyebrow">Atelier</p>
            <ul className="mt-5 space-y-3 text-sm text-pewter-600">
              <li>
                <Link href={ROUTES.collections} className="transition-colors hover:text-walnut-500">
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.configurator}
                  className="transition-colors hover:text-walnut-500"
                >
                  Configurator
                </Link>
              </li>
              <li>
                <Link href={ROUTES.craft} className="transition-colors hover:text-walnut-500">
                  The Craft
                </Link>
              </li>
              <li>
                <Link href={ROUTES.about} className="transition-colors hover:text-walnut-500">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Collections</p>
            <ul className="mt-5 space-y-3 text-sm text-pewter-600">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/collections/${c.slug}`}
                    className="transition-colors hover:text-walnut-500"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-pewter-600">
              {BRAND.phones.map((p, i) => (
                <li key={p}>
                  <a
                    href={`tel:${BRAND.phonesRaw[i]}`}
                    className="flex items-center gap-3 transition-colors hover:text-walnut-500"
                  >
                    <Phone className="h-3.5 w-3.5 text-champagne-300" />
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-walnut-500"
                >
                  <Mail className="h-3.5 w-3.5 text-champagne-300" />
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-3.5 w-3.5 text-champagne-300" />
                <span>
                  {BRAND.address.city}, {BRAND.address.state}
                  <br />
                  {BRAND.address.country}
                </span>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-4">
              <a
                href={BRAND.social.instagram}
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center border border-pewter-300 text-pewter-500 transition-colors hover:border-champagne-300 hover:text-walnut-500"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={BRAND.social.facebook}
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center border border-pewter-300 text-pewter-500 transition-colors hover:border-champagne-300 hover:text-walnut-500"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Separator />
          <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-pewter-400 md:flex-row md:items-center">
            <p>
              © {new Date().getFullYear()} {BRAND.name} · Crafted in {BRAND.address.city}
            </p>
            <p className="uppercase tracking-luxe">
              Owner: {BRAND.owner} · Sub-Manager: {BRAND.subManager}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
