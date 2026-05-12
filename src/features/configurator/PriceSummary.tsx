'use client';

import { useConfiguratorStore } from '@/lib/state/configurator';
import { AnimatedNumber } from '@/components/motion/AnimatedNumber';
import { formatINR } from '@/lib/utils/format';
import { Button } from '@/components/ui/Button';
import { Send, RotateCcw } from 'lucide-react';

/**
 * PriceSummary — live quote breakdown.
 * Consumes the same store the 3D scene does; updates atomically.
 */
export function PriceSummary() {
  const quote = useConfiguratorStore((s) => s.quote);
  const reset = useConfiguratorStore((s) => s.reset);
  const dehydrate = useConfiguratorStore((s) => s.dehydrate);

  if (!quote) return null;

  const onQuote = () => {
    const payload = dehydrate();
    if (!payload) return;
    // Phase 2: POST to /api/quote
    // For now, open a WhatsApp-ready summary.
    console.info('[RYHAN] Quote payload ready for /api/quote:', payload);
    const msg = encodeURIComponent(
      `Hello Ryhan Comforts — I'd like to commission:\n\n${quote.product.name}\nTotal: ${formatINR(
        quote.total
      )}\n\n${quote.lines.map((l) => `· ${l.label}: ${l.detail}`).join('\n')}`
    );
    window.open(`https://wa.me/917204556776?text=${msg}`, '_blank');
  };

  return (
    <div className="glass-dark border border-gold-500/15 p-6">
      <p className="eyebrow">Your commission</p>

      <ul className="mt-6 space-y-3">
        {quote.lines.map((l) => (
          <li
            key={`${l.groupId}-${l.label}`}
            className="flex items-start justify-between gap-4 text-sm"
          >
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-luxe text-cream-200/50">
                {l.label}
              </p>
              <p className="mt-0.5 truncate text-cream-100">{l.detail}</p>
            </div>
            <span className="font-mono text-xs text-gold-200 tabular-nums">
              {l.amount > 0 ? '+' : ''}
              {formatINR(l.amount)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-obsidian-600/80 pt-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-luxe text-cream-200/50">
              Estimated total
            </p>
            <p className="mt-1 font-display text-4xl text-gold-200 tabular-nums">
              <AnimatedNumber value={quote.total} />
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-luxe text-cream-200/40">
              Taxes & delivery computed at commission
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button size="md" className="flex-1" onClick={onQuote}>
            <Send className="h-4 w-4" />
            Request Quote
          </Button>
          <Button size="md" variant="outline" onClick={reset} aria-label="Reset">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
