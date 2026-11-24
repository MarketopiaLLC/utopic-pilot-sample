import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatCents } from '../src/money.ts';

test('formats simple amounts', () => {
  assert.equal(formatCents(399), '$3.99');
  assert.equal(formatCents(0), '$0.00');
  assert.equal(formatCents(5), '$0.05');
  assert.equal(formatCents(100), '$1.00');
});
test('adds thousands separators', () => {
  assert.equal(formatCents(123456789), '$1,234,567.89');
  assert.equal(formatCents(100000), '$1,000.00');
  assert.equal(formatCents(99999), '$999.99');
});
test('negative amounts get a leading minus', () => {
  assert.equal(formatCents(-150), '-$1.50');
  assert.equal(formatCents(-1), '-$0.01');
  assert.equal(formatCents(-0), '$0.00');
});
test('non-whole numbers are refused', () => {
  for (const bad of [1.5, NaN, Infinity, -Infinity, 1e21, 0.1]) {
    assert.throws(() => formatCents(bad), RangeError);
  }
  assert.throws(() => formatCents('5' as unknown as number), RangeError);
});
