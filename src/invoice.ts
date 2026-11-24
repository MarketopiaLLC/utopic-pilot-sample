export interface Line { description: string; quantity: number; unitCents: number }

/**
 * Total of an invoice in cents. Quantities and prices must be non-negative whole numbers.
 * An optional discountPercent (0 to 100) is taken off the subtotal; the result is rounded to whole cents.
 * Without a discount the total is the plain sum, as before.
 */
export function totalCents(lines: Line[], discountPercent?: number): number {
  if (discountPercent !== undefined && (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100)) {
    throw new RangeError(`discount must be between 0 and 100 percent, got ${discountPercent}`);
  }
  let total = 0;
  for (const l of lines) {
    if (!Number.isInteger(l.quantity) || l.quantity < 0) throw new RangeError(`bad quantity for ${l.description}`);
    if (!Number.isInteger(l.unitCents) || l.unitCents < 0) throw new RangeError(`bad price for ${l.description}`);
    total += l.quantity * l.unitCents;
  }
  if (discountPercent === undefined) return total;
  return Math.round((total * (100 - discountPercent)) / 100);
}
