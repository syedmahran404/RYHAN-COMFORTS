'use client';

import type { ProductCategory } from '@/lib/schemas/product';
import { useConfiguratorStore } from '@/lib/state/configurator';
import { SofaModel } from './SofaModel';
import { ChairModel } from './ChairModel';
import { BedModel } from './BedModel';
import { HeadboardModel } from './HeadboardModel';
import { MattressModel } from './MattressModel';
import { CurtainModel } from './CurtainModel';

/**
 * ProductViewer — the 3D dispatcher.
 *
 * Receives the active category and routes to the right procedural model.
 * Reads all options from the configurator store via narrow selectors
 * so unrelated state changes don't re-render.
 */
export function ProductViewer() {
  const product = useConfiguratorStore((s) => s.product);
  const selection = useConfiguratorStore((s) => s.selection);
  const dimensions = useConfiguratorStore((s) => s.dimensions);

  if (!product) return null;
  const category: ProductCategory = product.category;

  const upholstery =
    (selection['upholstery'] as string) ?? product.defaultMaterials['upholstery'] ?? 'linen-sandstone';
  const backUpholstery = (selection['back-upholstery'] as string) ?? upholstery;
  const pillowUpholstery = (selection['pillow-upholstery'] as string) ?? upholstery;
  const base =
    (selection['base'] as string) ??
    product.defaultMaterials['base'] ??
    product.defaultMaterials['frame'] ??
    'walnut-natural';
  const variant = (selection['model'] as string) ?? null;

  switch (category) {
    case 'sofa':
      return (
        <SofaModel
          upholsteryId={upholstery}
          backUpholsteryId={backUpholstery}
          pillowUpholsteryId={pillowUpholstery}
          baseWoodId={base}
          seatCount={(selection['seating'] as number) ?? 3}
          pillowCount={(selection['pillow-count'] as number) ?? 2}
          variantId={variant}
          armStyleId={(selection['arm-style'] as string) ?? 'arm-track'}
          backStyleId={(selection['back-style'] as string) ?? 'back-pillow'}
          legStyleId={(selection['leg-style'] as string) ?? 'leg-tapered'}
          seatPatternId={(selection['seat-pattern'] as string) ?? 'seat-plain'}
          dimensions={dimensions}
          idle
        />
      );
    case 'chair':
      return (
        <ChairModel
          upholsteryId={upholstery}
          baseWoodId={base}
          armStyleId={(selection['arm-style'] as string) ?? 'arm-rolled'}
          backStyleId={(selection['back-style'] as string) ?? 'back-pillow'}
          legStyleId={(selection['leg-style'] as string) ?? 'leg-tapered'}
          variantId={variant}
          dimensions={dimensions}
          idle
        />
      );
    case 'bed':
    case 'hydraulic-bed':
      return (
        <BedModel
          upholsteryId={upholstery}
          baseWoodId={base}
          headboardPattern={(selection['headboard-pattern'] as string) ?? 'hb-tufted'}
          variantId={variant}
          sizeId={(selection['size'] as string) ?? 'size-queen'}
          lightingId={(selection['lighting'] as string) ?? 'light-none'}
          idle
        />
      );
    case 'headboard':
      return (
        <HeadboardModel
          upholsteryId={upholstery}
          baseWoodId={base}
          variantId={variant}
          patternId={(selection['pattern'] as string) ?? undefined}
          dimensions={dimensions}
          idle
        />
      );
    case 'mattress':
      return (
        <MattressModel
          coreId={(selection['core'] as string) ?? 'core-pocket-spring'}
          variantId={variant}
          sizeId={(selection['size'] as string) ?? 'size-queen'}
          thicknessId={(selection['thickness'] as string) ?? 'thickness-8'}
          idle
        />
      );
    case 'curtain':
      return (
        <CurtainModel
          fabricId={upholstery}
          baseWoodId={base}
          variantId={variant}
          transparencyId={(selection['transparency'] as string) ?? 'trans-opaque'}
          foldId={(selection['fold'] as string) ?? 'fold-pinch'}
          rodId={(selection['rod'] as string) ?? 'rod-bronze'}
        />
      );
    default:
      return null;
  }
}
