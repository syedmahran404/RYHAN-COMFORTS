'use client';

import { useConfiguratorStore } from '@/lib/state/configurator';
import { AnimatedNumber } from '@/components/motion/AnimatedNumber';
import { formatINR } from '@/lib/utils/format';
import { Button } from '@/components/ui/Button';
import { Send, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils/cn';

/**
 * PriceSummary — live quote breakdown.
 *
 * Phase 2:
 *   · Grouped lines by kind (option / foam / dimension / complexity / tag)
 *   · POST to /api/quote — gracefully falls back to WhatsApp if offline
 */
export function PriceSummary() {
  const quote = useConfiguratorStore((s) => s.quote);
  const reset = useConfiguratorStore((s) => s.reset);
  const dehydrate = useConfiguratorStore((s) => s.dehydrate);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const grouped = useMemo(() => {
    if (!quote) return null;
    const base = quote.lines.filter((l) => l.kind === 'base');
    const opts = quote.lines.filter((l) => !l.kind || l.kind === 'option' || l.kind === 'foam');
    const dims = quote.lines.filter((l) => l.kind === 'dimension');
    const tags = quote.lines.filter((l) => l.kind === 'tag');
    const cmplx = quote.lines.filter((l) => l.kind === 'complexity');
    return { base, opts, dims, tags, cmplx };
  }, [quote]);

  if (!quote || !grouped) return null;

  const onQuote = async () => {
    const payload = dehydrate();
    if (!payload) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json().catch(() => null);
        setConfirmed(data?.id ?? 'RC-QUOTE');
      }
    } catch {
      /* swallow — fall through to WhatsApp */
    } finally {
      setSubmitting(false);
    }

    // Always open WhatsApp with a formatted summary for immediate consultation
    const msg = encodeURIComponent(
      `Hello Ryhan Comforts — I'd like to commission:\n\n${quote.product.name}\nTotal: ${formatINR(
        quote.total
      )}\n\n${quote.lines.map((l) => `· ${l.label}: ${l.detail}`).join('\n')}`
    );
    window.open(`https://wa.me/917204556776?text=${msg}`, '_blank');
  };

  return (
    <div className="glass-dark border border-gold-500/15 p-6">
      <div className="flex items-end justify-between">
        <p className="eyebrow">Your commission</p>
        {confirmed && (
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-luxe text-gold-200">
            <CheckCircle2 className="h-3 w-3" /> Sent · {confirmed}
          </span>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <LineGroup lines={grouped.base} />
        {grouped.opts.length > 0 && <LineGroup lines={grouped.opts} />}
        {grouped.dims.length > 0 && <LineGroup label="Dimensions" lines={grouped.dims} />}
        {grouped.tags.length > 0 && <LineGroup label="Signature" lines={grouped.tags} />}
        {grouped.cmplx.length > 0 && <LineGroup label="Craft" lines={grouped.cmplx} />}
      </div>

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
          <Button size="md" className="flex-1" onClick={onQuote} disabled={submitting}>
            <Send className="h-4 w-4" />
            {submitting ? 'Sending…' : 'Request Quote'}
          </Button>
          <Button size="md" variant="outline" onClick={reset} aria-label="Reset">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function LineGroup({
  lines,
  label
}: {
  label?: string;
  lines: { groupId: string; label: string; detail: string; amount: number }[];
}) {
  if (!lines.length) return null;
  return (
    <div className={cn(label ? 'border-t border-obsidian-600/60 pt-4' : '')}>
      {label && (
        <p className="mb-3 text-[10px] uppercase tracking-luxe text-gold-200/70">{label}</p>
      )}
      <ul className="space-y-2.5">
        {lines.map((l) => (
          <li
            key={`${l.groupId}-${l.label}`}
            className="flex items-start justify-between gap-4 text-sm"
          >
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-luxe text-cream-200/50">{l.label}</p>
              <p className="mt-0.5 truncate text-cream-100">{l.detail}</p>
            </div>
            <span className="font-mono text-xs text-gold-200 tabular-nums">
              {l.amount > 0 ? '+' : ''}
              {formatINR(l.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
