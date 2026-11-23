export interface Line { description: string; quantity: number; unitCents: number }

/** Total of an invoice in cents. Quantities and prices must be non-negative whole numbers. */
export function totalCents(lines: Line[]): number {
  let total = 0;
  for (const l of lines) {
    if (!Number.isInteger(l.quantity) || l.quantity < 0) throw new RangeError(`bad quantity for ${l.description}`);
    if (!Number.isInteger(l.unitCents) || l.unitCents < 0) throw new RangeError(`bad price for ${l.description}`);
    total += l.quantity * l.unitCents;
  }
  return total;
}
