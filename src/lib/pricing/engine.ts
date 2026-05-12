import type { Product, OptionGroup } from '@/lib/schemas/product';

/**
 * Pricing Engine — schema-driven, composable, deterministic.
 *
 * Given a product definition + a selection map, returns a full quote breakdown.
 * Every rule is additive and side-effect free so Phase 2 can layer on:
 *  - promotional rules
 *  - regional taxes
 *  - trade discounts
 *  - bundle pricing
 * without rewriting existing code.
 */

export interface Selection {
  /** groupId -> optionId (for 'single') OR number (for 'range' / 'count'). */
  [groupId: string]: string | number | undefined;
}

export interface PriceLine {
  groupId: string;
  label: string;
  detail: string;
  amount: number;
}

export interface Quote {
  product: Product;
  lines: PriceLine[];
  subtotal: number;
  total: number;
}

const priceGroup = (group: OptionGroup, value: Selection[string]): PriceLine | null => {
  if (value === undefined || value === null) return null;

  if (group.kind === 'single') {
    const option = group.options.find((o) => o.id === value);
    if (!option) return null;
    return {
      groupId: group.id,
      label: group.label,
      detail: option.label,
      amount: option.priceDelta
    };
  }

  if ((group.kind === 'range' || group.kind === 'count') && group.range && typeof value === 'number') {
    const { baseUnit, pricePerUnit, unitLabel } = group.range;
    const delta = (value - baseUnit) * pricePerUnit;
    return {
      groupId: group.id,
      label: group.label,
      detail: `${value}${unitLabel ? ` ${unitLabel}${value > 1 ? 's' : ''}` : ''}`,
      amount: delta
    };
  }

  return null;
};

/**
 * Compute a full quote for a given product + selection.
 */
export function computeQuote(product: Product, selection: Selection): Quote {
  const lines: PriceLine[] = [
    {
      groupId: '__base',
      label: 'Base craftsmanship',
      detail: product.name,
      amount: product.basePrice
    }
  ];

  for (const group of product.groups) {
    const line = priceGroup(group, selection[group.id]);
    if (line && line.amount !== 0) lines.push(line);
  }

  const subtotal = lines.reduce((sum, l) => sum + l.amount, 0);

  return {
    product,
    lines,
    subtotal,
    total: subtotal
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
