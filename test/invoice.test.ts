import { test } from 'node:test';
import assert from 'node:assert/strict';
import { totalCents } from '../src/invoice.ts';

test('sums quantity times price', () => {
  assert.equal(totalCents([{ description: 'a', quantity: 2, unitCents: 150 }, { description: 'b', quantity: 1, unitCents: 99 }]), 399);
});
test('an empty invoice is zero', () => assert.equal(totalCents([]), 0));
test('a negative quantity is refused', () => assert.throws(() => totalCents([{ description: 'x', quantity: -1, unitCents: 1 }]), RangeError));

const lines = [{ description: 'a', quantity: 2, unitCents: 150 }, { description: 'b', quantity: 1, unitCents: 99 }];
test('no discount leaves the total unchanged', () => assert.equal(totalCents(lines), 399));
test('a typical discount is applied', () => assert.equal(totalCents(lines, 10), 359)); // 399 * 0.9 = 359.1
test('discount rounds to cents', () => assert.equal(totalCents([{ description: 'a', quantity: 1, unitCents: 5 }], 50), 3)); // 2.5 -> 3
test('a 0 discount changes nothing', () => assert.equal(totalCents(lines, 0), 399));
test('a 100 discount gives zero', () => assert.equal(totalCents(lines, 100), 0));
test('a discount below 0 is refused', () => assert.throws(() => totalCents(lines, -1), RangeError));
test('a discount above 100 is refused', () => assert.throws(() => totalCents(lines, 100.5), RangeError));
test('a NaN discount is refused', () => assert.throws(() => totalCents(lines, NaN), RangeError));
