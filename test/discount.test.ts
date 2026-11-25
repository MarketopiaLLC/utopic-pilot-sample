import { test } from 'node:test';
import assert from 'node:assert/strict';
import { totalCents } from '../src/invoice.ts';

const lines = [{ description: 'a', quantity: 2, unitCents: 150 }, { description: 'b', quantity: 1, unitCents: 99 }]; // 399

test('no discount leaves the total unchanged', () => assert.equal(totalCents(lines), 399));
test('a typical discount reduces the subtotal', () => assert.equal(totalCents(lines, 10), 359)); // 359.1
test('discount rounds to cents', () => assert.equal(totalCents([{ description: 'x', quantity: 1, unitCents: 5 }], 10), 5)); // 4.5 -> 5
test('0 percent changes nothing', () => assert.equal(totalCents(lines, 0), 399));
test('100 percent makes the total zero', () => assert.equal(totalCents(lines, 100), 0));
test('a discount below 0 is refused', () => assert.throws(() => totalCents(lines, -1), RangeError));
test('a discount above 100 is refused', () => assert.throws(() => totalCents(lines, 100.5), RangeError));
test('a NaN discount is refused', () => assert.throws(() => totalCents(lines, NaN), RangeError));
