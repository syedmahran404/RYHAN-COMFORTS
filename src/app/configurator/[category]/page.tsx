import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { ProductCategory } from '@/lib/schemas/product';
import { FLAGSHIPS, getProductsByCategory } from '@/lib/data/catalog';
import { CATEGORIES } from '@/lib/data/categories';
import { ConfiguratorShell } from '@/features/configurator/ConfiguratorShell';
import { Badge } from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils/format';

const VALID: ProductCategory[] = [
  'sofa',
  'chair',
  'bed',
  'hydraulic-bed',
  'headboard',
  'mattress',
  'curtain'
];

export const dynamicParams = false;

export function generateStaticParams() {
  return VALID.map((category) => ({ category: categorySlug(category) }));
}

function categorySlug(c: ProductCategory) {
  return c === 'hydraulic-bed' ? 'beds' : `${c}s`;
}

function resolveCategory(slug: string): ProductCategory | null {
  const normalized = slug.toLowerCase();
  const map: Record<string, ProductCategory> = {
    sofas: 'sofa',
    chairs: 'chair',
    beds: 'bed',
    'hydraulic-beds': 'hydraulic-bed',
    mattresses: 'mattress',
    curtains: 'curtain',
    headboards: 'headboard'
  };
  return map[normalized] ?? null;
}

export function generateMetadata({
  params
}: {
  params: { category: string };
}): Metadata {
  const cat = resolveCategory(params.category);
  if (!cat) return { title: 'Configurator' };
  const meta = CATEGORIES.find((c) => c.id === cat || c.id === 'bed');
  return {
    title: `${meta?.label ?? 'Configurator'} Configurator`,
    description: meta?.description ?? 'Design your bespoke piece live in 3D.'
  };
}

export default function CategoryConfiguratorPage({
  params
}: {
  params: { category: string };
}) {
  const cat = resolveCategory(params.category);
  if (!cat) notFound();

  const flagship = FLAGSHIPS[cat];
  if (!flagship) notFound();
  const siblings = getProductsByCategory(cat).filter((p) => p.id !== flagship.id);

  return (
    <>
      <ConfiguratorShell product={flagship} />

      {siblings.length > 0 && (
        <section className="luxe-container pb-24">
          <div className="flex items-end justify-between">
            <div>
              <Badge>
                <Sparkles className="h-3 w-3" /> Other silhouettes in this category
              </Badge>
              <h2 className="mt-4 font-display text-3xl text-cream-50">More to commission</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.slice(0, 9).map((p) => (
              <Link
                key={p.id}
                href={`/configurator/${params.category}/${p.slug}`}
                className="group block overflow-hidden border border-obsidian-600/70 bg-obsidian-900/40 p-6 transition-all duration-500 hover:border-gold-500/40 hover:bg-obsidian-800/60"
              >
                <div className="flex items-start justify-between">
                  <p className="text-[10px] uppercase tracking-luxe text-gold-300">
                    {p.style?.replace(/-/g, ' ') ?? p.category}
                  </p>
                  {p.tags?.[0] && (
                    <span className="text-[9px] uppercase tracking-luxe text-cream-200/60">
                      · {p.tags[0].replace(/-/g, ' ')}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-2xl text-cream-50">{p.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-cream-200/60">{p.tagline}</p>
                <div className="mt-6 flex items-end justify-between">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-luxe text-gold-200 transition-transform duration-500 group-hover:translate-x-1">
                    Configure <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-mono text-xs text-cream-200/70 tabular-nums">
                    from {formatINR(p.basePrice)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
