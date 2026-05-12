'use client';

import dynamic from 'next/dynamic';
import { useConfiguratorStore } from '@/lib/state/configurator';

const Stage = dynamic(() => import('@/components/three/Stage').then((m) => m.Stage), {
  ssr: false
});
const ProductViewer = dynamic(
  () => import('@/components/three/ProductViewer').then((m) => m.ProductViewer),
  { ssr: false }
);

/**
 * ConfiguratorStage — reactive R3F canvas driven by the configurator store.
 * Phase 2 uses the ProductViewer dispatcher which selects the right
 * procedural model for the active product's category.
 */
export function ConfiguratorStage({ className }: { className?: string }) {
  const product = useConfiguratorStore((s) => s.product);

  if (!product) return <div className={className} />;

  // Camera tuned per category
  const cam: [number, number, number] =
    product.category === 'curtain'
      ? [0, 0.4, 6.5]
      : product.category === 'mattress'
        ? [3, 2.6, 4.2]
        : product.category === 'headboard'
          ? [0, 0.3, 4.6]
          : [3.8, 1.8, 5.4];

  return (
    <Stage className={className} interactive camera={cam} shadowOpacity={0.55}>
      <ProductViewer />
    </Stage>
  );
}
