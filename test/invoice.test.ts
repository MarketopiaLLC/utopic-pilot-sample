import { test } from 'node:test';
import assert from 'node:assert/strict';
import { totalCents } from '../src/invoice.ts';

test('sums quantity times price', () => {
  assert.equal(totalCents([{ description: 'a', quantity: 2, unitCents: 150 }, { description: 'b', quantity: 1, unitCents: 99 }]), 399);
});
test('an empty invoice is zero', () => assert.equal(totalCents([]), 0));
test('a negative quantity is refused', () => assert.throws(() => totalCents([{ description: 'x', quantity: -1, unitCents: 1 }]), RangeError));
