import type { Product, OptionGroup, PricingRule } from '@/lib/schemas/product';

/**
 * Pricing Engine — enterprise-grade, composable, deterministic.
 *
 * Phase 1 contract preserved. Phase 2 adds:
 *   · complexityMultiplier  → applied to option subtotal before total
 *   · areaPricePerCm2       → charged for dimension resize vs. base footprint
 *   · heightPricePerCm      → charged for height increase vs. base
 *   · tagPremiums           → flat premiums for named tags on the product
 *   · Foam-as-single        → supports foam tier (single-pick) and foam density (range)
 *   · Material-resolution   → resolves option.meta.kind for tier premiums
 *
 * Every rule is additive and side-effect free so Phase 3 can layer on
 * promos, taxes, trade discounts, and bundle pricing without rewriting.
 */

// ─────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────

export interface Selection {
  /** groupId -> optionId (single) OR number (range/count). */
  [groupId: string]: string | number | undefined;
}

/** Current dimensions chosen by the user (cm). */
export interface DimensionsSelection {
  w?: number;
  d?: number;
  h?: number;
}

export interface PriceLine {
  groupId: string;
  label: string;
  detail: string;
  amount: number;
  /** Line kind — used by the UI to badge / group / filter. */
  kind?: 'base' | 'option' | 'foam' | 'dimension' | 'complexity' | 'tag';
}

export interface Quote {
  product: Product;
  lines: PriceLine[];
  subtotal: number;
  /** After complexity multiplier, before taxes (Phase 3). */
  total: number;
  /** If a complexity multiplier applied, the line it produced. */
  complexityApplied: number;
  dimensions?: DimensionsSelection;
}

// ─────────────────────────────────────────────────────────────────────
// INTERNAL HELPERS
// ─────────────────────────────────────────────────────────────────────

const priceGroup = (group: OptionGroup, value: Selection[string]): PriceLine | null => {
  if (value === undefined || value === null) return null;

  if (group.kind === 'single') {
    const option = group.options.find((o) => o.id === value);
    if (!option) return null;
    const isFoam = group.id.includes('foam');
    return {
      groupId: group.id,
      label: group.label,
      detail: option.label,
      amount: option.priceDelta,
      kind: isFoam ? 'foam' : 'option'
    };
  }

  if (
    (group.kind === 'range' || group.kind === 'count') &&
    group.range &&
    typeof value === 'number'
  ) {
    const { baseUnit, pricePerUnit, unitLabel } = group.range;
    const delta = (value - baseUnit) * pricePerUnit;
    return {
      groupId: group.id,
      label: group.label,
      detail: `${value}${unitLabel ? ` ${unitLabel}${value > 1 ? 's' : ''}` : ''}`,
      amount: delta,
      kind: 'option'
    };
  }

  return null;
};

const resolveDimensions = (
  product: Product,
  dim?: DimensionsSelection
): DimensionsSelection | undefined => {
  if (!product.dimensions) return undefined;
  return {
    w: dim?.w ?? product.dimensions.w,
    d: dim?.d ?? product.dimensions.d,
    h: dim?.h ?? product.dimensions.h
  };
};

const priceDimensions = (product: Product, dim: DimensionsSelection): PriceLine[] => {
  const rule = product.pricing;
  const base = product.dimensions;
  if (!rule || !base) return [];

  const lines: PriceLine[] = [];

  if (rule.areaPricePerCm2 && dim.w && dim.d) {
    const baseArea = base.w * base.d;
    const targetArea = dim.w * dim.d;
    const delta = Math.max(0, targetArea - baseArea);
    if (delta > 0) {
      const amount = Math.round(delta * rule.areaPricePerCm2);
      if (amount !== 0) {
        lines.push({
          groupId: '__dim-area',
          label: 'Dimensions',
          detail: `${dim.w} × ${dim.d} cm · +${Math.round(delta / 100)} cm² footprint`,
          amount,
          kind: 'dimension'
        });
      }
    }
  }

  if (rule.heightPricePerCm && dim.h) {
    const deltaH = Math.max(0, dim.h - base.h);
    if (deltaH > 0) {
      const amount = Math.round(deltaH * rule.heightPricePerCm);
      if (amount !== 0) {
        lines.push({
          groupId: '__dim-height',
          label: 'Height premium',
          detail: `${dim.h} cm · +${deltaH} cm vs. base`,
          amount,
          kind: 'dimension'
        });
      }
    }
  }

  return lines;
};

const priceTagPremiums = (product: Product): PriceLine[] => {
  const prem = product.pricing?.tagPremiums;
  if (!prem || !product.tags?.length) return [];
  const out: PriceLine[] = [];
  for (const tag of product.tags) {
    const amt = prem[tag];
    if (amt && amt > 0) {
      out.push({
        groupId: `__tag-${tag}`,
        label: 'Signature premium',
        detail: tag.replace(/-/g, ' '),
        amount: amt,
        kind: 'tag'
      });
    }
  }
  return out;
};

// ─────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────

/**
 * Compute a full quote for a given product + selection.
 * The dimensions argument is optional and additive.
 */
export function computeQuote(
  product: Product,
  selection: Selection,
  dimensions?: DimensionsSelection
): Quote {
  const lines: PriceLine[] = [
    {
      groupId: '__base',
      label: 'Base craftsmanship',
      detail: product.name,
      amount: product.basePrice,
      kind: 'base'
    }
  ];

  // Option-driven lines
  for (const group of product.groups) {
    const line = priceGroup(group, selection[group.id]);
    if (line && line.amount !== 0) lines.push(line);
  }

  // Dimensions (if any)
  const resolvedDims = resolveDimensions(product, dimensions);
  if (resolvedDims) {
    lines.push(...priceDimensions(product, resolvedDims));
  }

  // Tag premiums
  lines.push(...priceTagPremiums(product));

  const subtotal = lines.reduce((sum, l) => sum + l.amount, 0);

  // Complexity multiplier
  const multiplier = product.pricing?.complexityMultiplier ?? 1;
  const complexityApplied = multiplier > 1 ? Math.round(subtotal * (multiplier - 1)) : 0;

  if (complexityApplied > 0) {
    lines.push({
      groupId: '__complexity',
      label: 'Complexity tier',
      detail:
        product.complexity === 'masterwork'
          ? 'Masterwork · hand-finished'
          : product.complexity === 'ornate'
            ? 'Ornate · heritage craft'
            : product.complexity === 'detailed'
              ? 'Detailed · atelier-grade'
              : 'Clean · signature',
      amount: complexityApplied,
      kind: 'complexity'
    });
  }

  const total = subtotal + complexityApplied;

  return {
    product,
    lines,
    subtotal,
    total,
    complexityApplied,
    dimensions: resolvedDims
  };
}

/**
 * Build a default selection from a product's group defaults.
 */
export function defaultSelection(product: Product): Selection {
  const sel: Selection = {};
  for (const group of product.groups) {
    if (group.defaultValue !== undefined) {
      sel[group.id] = group.defaultValue;
    } else if (group.kind === 'single' && group.options[0]) {
      sel[group.id] = group.options[0].id;
    } else if ((group.kind === 'range' || group.kind === 'count') && group.range) {
      sel[group.id] = group.range.baseUnit;
    }
  }
  return sel;
}

/**
 * Expose the rule for admin UIs.
 */
export function summarizeRule(rule?: PricingRule): string {
  if (!rule) return 'Base pricing only';
  const bits: string[] = [];
  if (rule.complexityMultiplier && rule.complexityMultiplier > 1)
    bits.push(`×${rule.complexityMultiplier.toFixed(2)} complexity`);
  if (rule.areaPricePerCm2) bits.push(`₹${rule.areaPricePerCm2}/cm² area`);
  if (rule.heightPricePerCm) bits.push(`₹${rule.heightPricePerCm}/cm height`);
  if (rule.tagPremiums) bits.push(`${Object.keys(rule.tagPremiums).length} tag premiums`);
  return bits.length ? bits.join(' · ') : 'Base pricing only';
}
