/** Format a whole number of cents as US dollars, e.g. 123456789 -> "$1,234,567.89". */
export function formatCents(cents: number): string {
  if (typeof cents !== 'number' || !Number.isSafeInteger(cents)) {
    throw new RangeError(`cents must be a whole number: ${String(cents)}`);
  }
  const abs = Math.abs(cents);
  const dollars = Math.floor(abs / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const rest = (abs % 100).toString().padStart(2, '0');
  return `${cents < 0 ? '-' : ''}$${dollars}.${rest}`;
}
