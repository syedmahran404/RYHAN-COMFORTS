import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { ProductCategory } from '@/lib/schemas/product';
import { FLAGSHIPS, getProductsByCategory } from '@/lib/data/catalog';
import { CATEGORIES } from '@/lib/data/categories';
import { resolveProductImage } from '@/lib/data/imagery';
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
  const map: Record<string, ProductCategory> = {
    sofas: 'sofa',
    chairs: 'chair',
    beds: 'bed',
    'hydraulic-beds': 'hydraulic-bed',
    mattresses: 'mattress',
    curtains: 'curtain',
    headboards: 'headboard'
  };
  return map[slug.toLowerCase()] ?? null;
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
        <section className="bg-ivory-100 pb-24">
          <div className="luxe-container">
            <div className="flex items-end justify-between">
              <div>
                <Badge>
                  <Sparkles className="h-3 w-3" /> Other silhouettes in this category
                </Badge>
                <h2 className="mt-4 font-display text-3xl text-pewter-800">
                  More to commission
                </h2>
              </div>
              <Link
                href={`/collections/${params.category}`}
                className="hidden text-[11px] uppercase tracking-luxe text-walnut-500 hover:text-walnut-400 md:block"
              >
                Browse entire collection →
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.slice(0, 9).map((p) => {
                const img = resolveProductImage(p.slug, p.category);
                return (
                  <Link
                    key={p.id}
                    href={`/configurator/${params.category}/${p.slug}`}
                    className="group block overflow-hidden border border-pewter-300/60 bg-ivory-50 shadow-soft transition-shadow duration-500 hover:shadow-editorial"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden zoom-frame">
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 img-overlay-bottom opacity-75" />
                      <div className="absolute inset-x-0 top-4 flex items-center justify-between px-4 text-[9px] uppercase tracking-luxe">
                        <span className="border border-white/30 bg-white/10 px-2 py-1 text-ivory-50 backdrop-blur-sm">
                          {p.style?.replace(/-/g, ' ') ?? p.category}
                        </span>
                        {p.tags?.[0] && (
                          <span className="border border-champagne-200/60 bg-ivory-50/90 px-2 py-1 text-walnut-500">
                            {p.tags[0].replace(/-/g, ' ')}
                          </span>
                        )}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-5 text-ivory-50">
                        <h3 className="font-display text-xl">{p.name}</h3>
                        <p className="mt-1 line-clamp-1 text-[11px] text-ivory-100/80">
                          {p.tagline}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-pewter-300/60 px-5 py-4">
                      <span className="font-mono text-xs text-walnut-500 tabular-nums">
                        From {formatINR(p.basePrice)}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-luxe text-pewter-600 group-hover:text-walnut-500">
                        Configure <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
