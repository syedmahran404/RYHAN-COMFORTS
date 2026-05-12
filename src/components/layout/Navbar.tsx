'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { BRAND } from '@/lib/data/brand';
import { ROUTES } from '@/lib/utils/constants';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { label: 'Collections', href: ROUTES.collections },
  { label: 'Configurator', href: ROUTES.configurator },
  { label: 'The Craft', href: ROUTES.craft },
  { label: 'Atelier', href: ROUTES.about },
  { label: 'Contact', href: ROUTES.contact }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgColor = useTransform(scrollY, [0, 120], [
    'rgba(250,246,238,0)',
    'rgba(250,246,238,0.88)'
  ]);
  const borderColor = useTransform(scrollY, [0, 120], [
    'rgba(200,169,106,0)',
    'rgba(200,169,106,0.18)'
  ]);

  return (
    <>
      <motion.header
        style={{ backgroundColor: bgColor, borderBottomColor: borderColor }}
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors"
      >
        <div className="luxe-container flex h-20 items-center justify-between">
          <Link href={ROUTES.home} className="group flex items-center gap-3">
            <LogoMark />
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg text-pewter-700 tracking-wide">
                {BRAND.name}
              </span>
              <span className="text-[9px] uppercase tracking-luxe text-walnut-400">
                Since {BRAND.founded} · Bespoke
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-[11px] uppercase tracking-luxe text-pewter-500 transition-colors duration-500 hover:text-walnut-500',
                  'after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-champagne-300 after:transition-all after:duration-500 hover:after:w-full'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${BRAND.phonesRaw[0]}`}
              className="flex items-center gap-2 text-[11px] uppercase tracking-luxe text-pewter-500 transition-colors hover:text-walnut-500"
            >
              <Phone className="h-3.5 w-3.5" />
              {BRAND.phones[0]}
            </a>
            <Link href={ROUTES.configuratorSofa}>
              <Button size="sm" variant="primary">
                Begin Atelier
              </Button>
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center border border-pewter-300 bg-ivory-50/80 text-pewter-700 backdrop-blur-md lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{ x: open ? 0 : '100%' }}
        transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
        className="fixed inset-y-0 right-0 z-40 flex w-full max-w-sm flex-col justify-between bg-ivory-50/98 p-8 pt-28 backdrop-blur-xl lg:hidden"
      >
        <nav className="flex flex-col gap-5">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl text-pewter-700 transition-colors hover:text-walnut-500"
            >
              <span className="mr-4 text-xs text-champagne-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-3">
          <div className="hairline" />
          {BRAND.phones.map((p, i) => (
            <a
              key={p}
              href={`tel:${BRAND.phonesRaw[i]}`}
              className="flex items-center gap-3 text-sm text-pewter-600"
            >
              <Phone className="h-4 w-4 text-walnut-400" />
              {p}
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
}

function LogoMark() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center border border-champagne-300/60 bg-ivory-50 shadow-bevel">
      <svg viewBox="0 0 40 40" className="h-6 w-6" fill="none">
        <defs>
          <linearGradient id="rcg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#c8a96a" />
            <stop offset="55%" stopColor="#8b6f31" />
            <stop offset="100%" stopColor="#4a3a16" />
          </linearGradient>
        </defs>
        <path
          d="M8 30V10h10c5 0 8 3 8 7s-3 6-6 6l8 7h-5l-7-7h-4v7H8z"
          fill="url(#rcg)"
        />
        <path d="M16 16h4c1.5 0 2.5 1 2.5 2.3S21.5 20.6 20 20.6h-4z" fill="#faf6ee" />
      </svg>
    </div>
  );
}
