export interface Line { description: string; quantity: number; unitCents: number }

/**
 * Total of an invoice in cents. Quantities and prices must be non-negative whole numbers.
 * An optional discountPercent (0 to 100, up to two decimal places are honoured) is taken off the
 * subtotal; the result is rounded to whole cents (half up). The discount is computed in exact
 * integer (BigInt) arithmetic so large subtotals stay exact to the cent.
 */
export function totalCents(lines: Line[], discountPercent?: number): number {
  let total = 0;
  for (const l of lines) {
    if (!Number.isInteger(l.quantity) || l.quantity < 0) throw new RangeError(`bad quantity for ${l.description}`);
    if (!Number.isInteger(l.unitCents) || l.unitCents < 0) throw new RangeError(`bad price for ${l.description}`);
    total += l.quantity * l.unitCents;
  }
  if (discountPercent === undefined) return total;
  if (typeof discountPercent !== 'number' || !Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) {
    throw new RangeError(`discount must be between 0 and 100 percent, got ${discountPercent}`);
  }
  const keepBp = BigInt(10000 - Math.round(discountPercent * 100)); // basis points kept
  return Number((BigInt(total) * keepBp + 5000n) / 10000n);
}
