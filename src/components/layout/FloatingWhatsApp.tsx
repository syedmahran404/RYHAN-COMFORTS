'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone } from 'lucide-react';
import { BRAND } from '@/lib/data/brand';
import { EASE } from '@/lib/utils/constants';

/**
 * FloatingWhatsApp — fixed CTA with an expandable consultation card.
 *
 * Surfaces BOTH numbers (Owner + Sub-manager) + email + WhatsApp.
 * Reveals with a subtle delay so it doesn't compete with the hero.
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1400);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.5, ease: EASE.silk }}
            className="pointer-events-auto w-[320px] glass-dark border border-gold-500/20 p-5 shadow-luxe"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow">Speak with the atelier</p>
                <p className="mt-3 font-display text-xl text-cream-50">
                  We answer <span className="gold-text italic">personally.</span>
                </p>
              </div>
              <button
                aria-label="Close"
                onClick={() => setExpanded(false)}
                className="flex h-7 w-7 items-center justify-center border border-obsidian-600 text-cream-200/60 transition-colors hover:text-gold-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-5 space-y-2">
              <a
                href={`https://wa.me/${BRAND.phonesRaw[0].replace('+', '')}`}
                className="flex items-center justify-between gap-3 border border-obsidian-600/70 bg-obsidian-900/60 p-3 transition-colors hover:border-gold-500/40"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-gold-300" />
                  <span>
                    <span className="block text-[10px] uppercase tracking-luxe text-cream-200/50">
                      WhatsApp
                    </span>
                    <span className="text-sm text-cream-50">{BRAND.phones[0]}</span>
                  </span>
                </span>
              </a>

              {BRAND.phones.map((p, i) => (
                <a
                  key={p}
                  href={`tel:${BRAND.phonesRaw[i]}`}
                  className="flex items-center justify-between gap-3 border border-obsidian-600/70 bg-obsidian-900/60 p-3 transition-colors hover:border-gold-500/40"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gold-300" />
                    <span>
                      <span className="block text-[10px] uppercase tracking-luxe text-cream-200/50">
                        {i === 0 ? BRAND.owner : BRAND.subManager}
                      </span>
                      <span className="text-sm text-cream-50">{p}</span>
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <p className="mt-4 text-[10px] uppercase tracking-luxe text-cream-200/50">
              10:00 – 20:00 IST · Monday to Saturday
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE.silk }}
        onClick={() => setExpanded((v) => !v)}
        className="pointer-events-auto group relative flex h-14 w-14 items-center justify-center bg-gradient-to-b from-gold-200 via-gold-300 to-gold-500 text-obsidian-900 shadow-luxe transition-all duration-500 hover:shadow-glow"
        aria-label="Contact Ryhan Comforts"
      >
        <span className="absolute inset-0 animate-pulse-gold" />
        <MessageCircle className="relative h-6 w-6" />
      </motion.button>
    </div>
  );
}
