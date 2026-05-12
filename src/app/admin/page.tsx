import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Database,
  Layers,
  Package,
  PaintBucket,
  ReceiptIndianRupee,
  Settings2,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { CATALOG, CATALOG_COUNTS } from '@/lib/data/catalog';
import { ALL_MATERIALS, FABRICS, WOODS, MATTRESS_CORES } from '@/lib/data/materials';
import { FOAMS } from '@/lib/data/foams';
import { COLLECTIONS } from '@/lib/data/collections';
import { summarizeRule } from '@/lib/pricing/engine';
import { formatINR } from '@/lib/utils/format';

export const metadata: Metadata = {
  title: 'Admin · Atelier',
  description: 'Read-only overview of the Ryhan Comforts catalogue, materials, and pricing engine.'
};

/**
 * Admin CMS — read-only overview (Phase 2).
 *
 * Phase 3 will add auth + write paths (Prisma/Postgres) against the same
 * Zod schemas used here. The UI is structured as a proper admin dashboard.
 */
export default function AdminPage() {
  return (
    <section className="relative min-h-[100svh] pt-32 pb-24">
      <div className="absolute inset-0 -z-10 bg-walnut-grain opacity-70" />
      <div className="noise-overlay" />

      <div className="luxe-container">
        <div className="flex items-end justify-between">
          <div>
            <Badge>Admin · Read-only · Phase 2</Badge>
            <h1 className="mt-6 font-display text-display text-cream-50 text-balance">
              The <span className="gold-text italic">atelier</span> dashboard.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream-200/70">
              An honest overview of everything the catalogue already knows — products,
              materials, foams, collections and pricing rules. Phase 3 opens these to writes
              via the same Zod schemas.
            </p>
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/"
              className="text-[10px] uppercase tracking-luxe text-cream-200/60 hover:text-gold-200"
            >
              ← Back to site
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard Icon={Package} label="Products" value={CATALOG_COUNTS.total} />
          <StatCard Icon={PaintBucket} label="Materials" value={ALL_MATERIALS.length} />
          <StatCard Icon={Layers} label="Foam SKUs" value={FOAMS.length} />
          <StatCard Icon={Sparkles} label="Collections" value={COLLECTIONS.length} />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Section
            Icon={Package}
            title="Products"
            hint={`${CATALOG_COUNTS.total} silhouettes across 6 categories`}
          >
            <div className="divide-y divide-obsidian-600/60">
              {CATALOG.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-4 py-3 text-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate text-cream-50">{p.name}</p>
                    <p className="mt-0.5 truncate text-[10px] uppercase tracking-luxe text-cream-200/45">
                      {p.category} · {p.style ?? '—'} · {p.complexity ?? '—'}
                      {p.tags?.length ? ` · ${p.tags.join(', ')}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] text-gold-200 tabular-nums">
                      {formatINR(p.basePrice)}
                    </span>
                    <span className="text-[9px] uppercase tracking-luxe text-cream-200/50">
                      {p.groups.length} groups
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section
            Icon={PaintBucket}
            title="Materials"
            hint={`${FABRICS.length} fabrics · ${WOODS.length} woods · ${MATTRESS_CORES.length} mattress cores`}
          >
            <div className="grid grid-cols-6 gap-2">
              {ALL_MATERIALS.map((m) => (
                <div
                  key={m.id}
                  className="relative aspect-square border border-obsidian-600/60"
                  style={{ backgroundColor: m.color }}
                  title={`${m.name} · ${m.kind} · ${m.tier}`}
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/40" />
                </div>
              ))}
            </div>
          </Section>

          <Section Icon={Layers} title="Foam system" hint="3 tiers × 5 slots">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {FOAMS.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between border border-obsidian-600/60 bg-obsidian-900/40 p-3"
                >
                  <div>
                    <p className="text-[11px] text-cream-50">{f.name}</p>
                    <p className="mt-0.5 text-[9px] uppercase tracking-luxe text-cream-200/50">
                      {f.slot} · {f.tier}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-gold-200">
                    {formatINR(f.pricePerDensity)}/d
                  </span>
                </div>
              ))}
            </div>
          </Section>

          <Section
            Icon={ReceiptIndianRupee}
            title="Pricing rules"
            hint="Per-product complexity · dimensions · tag premiums"
          >
            <div className="divide-y divide-obsidian-600/60 text-sm">
              {CATALOG.filter((p) => p.pricing).map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-cream-50">{p.name}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-luxe text-cream-200/45">
                      {summarizeRule(p.pricing)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section Icon={Sparkles} title="Collections" hint={`${COLLECTIONS.length} curated`}>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {COLLECTIONS.map((c) => (
                <Link
                  key={c.id}
                  href={`/collections/${c.slug}`}
                  className="group border border-obsidian-600/60 bg-obsidian-900/40 p-3 transition-colors hover:border-gold-500/40"
                >
                  <p className="text-cream-50">{c.label}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-luxe text-cream-200/50">
                    {c.subtitle}
                  </p>
                </Link>
              ))}
            </div>
          </Section>

          <Section Icon={Database} title="Phase 3 roadmap">
            <ul className="space-y-2 text-sm text-cream-200/75">
              <li>Auth (NextAuth) + role-based access for admins.</li>
              <li>Prisma + Postgres persistence — writes against the Zod schemas used above.</li>
              <li>Public / internal Quote inbox with PDF render + email dispatch.</li>
              <li>Real GLTF asset pipeline swapped in via `SofaModel` slot tags.</li>
              <li>A/B material showcase + CMS-editable collection curation.</li>
            </ul>
          </Section>
        </div>

        <div className="mt-14 flex items-center gap-3 text-[10px] uppercase tracking-luxe text-cream-200/50">
          <Settings2 className="h-3.5 w-3.5 text-gold-300" />
          Configuration is read from <code className="text-gold-200">src/lib/data/*</code>
          · Phase 3 switches this to Postgres.
        </div>
      </div>
    </section>
  );
}

function StatCard({
  Icon,
  label,
  value
}: {
  Icon: typeof Package;
  label: string;
  value: number;
}) {
  return (
    <div className="glass-dark border border-gold-500/10 p-6">
      <Icon className="h-4 w-4 text-gold-300" />
      <p className="mt-6 font-display text-4xl text-cream-50 tabular-nums">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-luxe text-cream-200/60">{label}</p>
    </div>
  );
}

function Section({
  Icon,
  title,
  hint,
  children
}: {
  Icon: typeof Package;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-dark border border-gold-500/10 p-6">
      <div className="mb-4 flex items-center gap-3">
        <Icon className="h-4 w-4 text-gold-300" />
        <p className="text-[10px] uppercase tracking-luxe text-gold-200">{title}</p>
        {hint && <p className="ml-auto text-[10px] text-cream-200/50">{hint}</p>}
      </div>
      {children}
    </div>
  );
}
