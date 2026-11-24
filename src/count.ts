import type { Line } from './invoice.ts';

/** Sum of the quantity of every line. Quantities must be non-negative whole numbers. */
export function totalQuantity(lines: Line[]): number {
  let total = 0;
  for (const l of lines) {
    if (!Number.isInteger(l.quantity) || l.quantity < 0) throw new RangeError(`bad quantity for ${l.description}`);
    total += l.quantity;
  }
  return total;
}
