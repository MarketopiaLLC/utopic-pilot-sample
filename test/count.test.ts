import { test } from 'node:test';
import assert from 'node:assert/strict';
import { totalQuantity } from '../src/count.ts';

test('sums quantities', () => {
  assert.equal(totalQuantity([{ description: 'a', quantity: 2, unitCents: 150 }, { description: 'b', quantity: 3, unitCents: 99 }]), 5);
});
test('an empty invoice is zero', () => assert.equal(totalQuantity([]), 0));
test('a negative quantity is refused', () => assert.throws(() => totalQuantity([{ description: 'x', quantity: -1, unitCents: 1 }]), RangeError));
test('a fractional quantity is refused', () => assert.throws(() => totalQuantity([{ description: 'x', quantity: 1.5, unitCents: 1 }]), RangeError));
