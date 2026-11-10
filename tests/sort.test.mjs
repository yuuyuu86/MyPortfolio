import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sortWorks, publishedOnly, selectFeatured } from '../src/lib/sort.mjs';

const w = (id, data) => ({ id, data: { status: 'published', ...data } });

test('order → date(新しい順) → slug の順に並ぶ', () => {
  const list = [w('c', {}), w('b', { date: '2025-01' }), w('a', {}), w('z', { order: 2 }), w('y', { order: 1 }), w('d', { date: '2026-03' })];
  assert.deepEqual(sortWorks(list).map((x) => x.id), ['y', 'z', 'd', 'b', 'a', 'c']);
});

test('draft は除外される', () => {
  assert.deepEqual(publishedOnly([w('a', {}), w('b', { status: 'draft' })]).map((x) => x.id), ['a']);
});

test('featured は最大3件', () => {
  const list = ['a', 'b', 'c', 'd'].map((id) => w(id, { featured: true }));
  assert.equal(selectFeatured(list).length, 3);
  assert.equal(selectFeatured([]).length, 0);
});
