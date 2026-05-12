import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CATALOG, getProductBySlug } from '@/lib/data/catalog';
import { ConfiguratorShell } from '@/features/configurator/ConfiguratorShell';

export const dynamicParams = false;

const categorySlug = (category: string) =>
  category === 'hydraulic-bed' ? 'beds' : `${category}s`;

export function generateStaticParams() {
  return CATALOG.map((p) => ({
    category: categorySlug(p.category),
    slug: p.slug
  }));
}

export function generateMetadata({
  params
}: {
  params: { category: string; slug: string };
}): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Configurator' };
  return {
    title: `${product.name} · Configure`,
    description: product.description
  };
}

export default function ProductConfiguratorPage({
  params
}: {
  params: { category: string; slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return <ConfiguratorShell product={product} />;
}
