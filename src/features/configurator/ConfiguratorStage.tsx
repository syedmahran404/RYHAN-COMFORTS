'use client';

import dynamic from 'next/dynamic';
import { useConfiguratorStore } from '@/lib/state/configurator';

const Stage = dynamic(() => import('@/components/three/Stage').then((m) => m.Stage), {
  ssr: false
});
const SofaModel = dynamic(
  () => import('@/components/three/SofaModel').then((m) => m.SofaModel),
  { ssr: false }
);

/**
 * ConfiguratorStage — reactive R3F canvas driven by the configurator store.
 * Subscribes only to the material/variant slots it needs for minimal re-renders.
 */
export function ConfiguratorStage({ className }: { className?: string }) {
  const product = useConfiguratorStore((s) => s.product);
  const upholstery = useConfiguratorStore(
    (s) => (s.selection['upholstery'] as string) ?? product?.defaultMaterials['upholstery']
  );
  const base = useConfiguratorStore(
    (s) => (s.selection['base'] as string) ?? product?.defaultMaterials['base']
  );
  const seating = useConfiguratorStore((s) => (s.selection['seating'] as number) ?? 3);
  const variant = useConfiguratorStore((s) => (s.selection['model'] as string) ?? null);

  if (!product || !upholstery || !base) {
    return <div className={className} />;
  }

  return (
    <Stage className={className} interactive camera={[3.8, 1.8, 5.4]} shadowOpacity={0.55}>
      <SofaModel
        upholsteryId={upholstery}
        baseWoodId={base}
        seatCount={seating}
        variantId={variant}
        autoRotate={false}
        idle
      />
    </Stage>
  );
}
