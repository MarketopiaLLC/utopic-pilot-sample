import { test } from 'node:test';
import assert from 'node:assert/strict';
import { totalCents } from '../src/invoice.ts';

const lines = [{ description: 'a', quantity: 2, unitCents: 150 }, { description: 'b', quantity: 1, unitCents: 99 }]; // 399

test('no discount leaves the total unchanged', () => assert.equal(totalCents(lines), 399));
test('a typical discount', () => assert.equal(totalCents(lines, 10), 359)); // 359.1 -> 359
test('discount rounds half up to cents', () => assert.equal(totalCents([{ description: 'x', quantity: 1, unitCents: 5 }], 50), 3));
test('0 percent changes nothing', () => assert.equal(totalCents(lines, 0), 399));
test('100 percent makes it free', () => assert.equal(totalCents(lines, 100), 0));
test('below 0 is refused', () => assert.throws(() => totalCents(lines, -1), RangeError));
test('above 100 is refused', () => assert.throws(() => totalCents(lines, 100.01), RangeError));
test('NaN is refused', () => assert.throws(() => totalCents(lines, NaN), RangeError));
test('a very large subtotal stays exact to the cent', () => {
  const big = [{ description: 'big', quantity: 1, unitCents: 9007199254740991 }];
  const expected = 6034823500676464; // exact: 9007199254740991 * 67% = 6034823500676463.97, rounded
  assert.equal(totalCents(big, 33), expected);
  assert.equal(totalCents(big, 0), 9007199254740991);
  assert.equal(totalCents(big, 100), 0);
});
