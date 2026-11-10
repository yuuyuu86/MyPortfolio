// 作品データの整合性チェック（公開作品の画像・必須項目・重複など）
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';

const dir = 'src/content/works';
const works = readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => {
  const src = readFileSync(`${dir}/${f}`, 'utf8');
  const fm = src.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const get = (k) => fm.match(new RegExp(`^${k}:\\s*(.+?)\\s*(#.*)?$`, 'm'))?.[1]?.replace(/^["']|["']$/g, '');
  const images = [...fm.matchAll(/^\s*(?:cover|-?\s*src):\s*(\S+)/gm)].map((m) => m[1]);
  return { f, slug: f.replace(/\.md$/, ''), get, images };
});

test('slug は半角英小文字・数字・ハイフン', () => {
  for (const w of works) assert.match(w.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, w.f);
});

test('必須項目がある', () => {
  for (const w of works) for (const k of ['title', 'summary', 'cover', 'alt', 'category', 'status']) assert.ok(w.get(k), `${w.f}: ${k} がありません`);
});

test('status は draft か published', () => {
  for (const w of works) assert.ok(['draft', 'published'].includes(w.get('status')), `${w.f}: status=${w.get('status')}`);
});

test('公開作品の画像ファイルが存在する', () => {
  for (const w of works.filter((w) => w.get('status') === 'published'))
    for (const img of w.images) assert.ok(existsSync(`public${img}`), `${w.f}: public${img} がありません`);
});

test('公開作品に仮テキストが残っていない', () => {
  for (const w of works.filter((w) => w.get('status') === 'published')) {
    const s = readFileSync(`${dir}/${w.f}`, 'utf8');
    assert.ok(!/一覧に出す短い紹介文|代表画像の内容を説明する文|example\.com/.test(s), `${w.f}: テンプレートの文言が残っています`);
  }
});

test('タイトルが重複していない', () => {
  const t = works.map((w) => w.get('title'));
  assert.equal(new Set(t).size, t.length);
});
