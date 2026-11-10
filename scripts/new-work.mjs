// 新しい作品の下書きを作る: npm run new:work -- <slug> ["作品名"]
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

const [slug, title = slug?.toUpperCase()] = process.argv.slice(2);
if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error('使い方: npm run new:work -- <slug> ["作品名"]\n  slug は半角英小文字・数字・ハイフン（例: store-canvas）');
  process.exit(1);
}
const file = `src/content/works/${slug}.md`;
if (existsSync(file)) { console.error(`すでに存在します: ${file}`); process.exit(1); }

mkdirSync(`public/images/works/${slug}`, { recursive: true });
writeFileSync(file, `---
title: ${title}
summary: 一覧に出す短い紹介文（1文）
cover: /images/works/${slug}/cover.webp
alt: 代表画像の内容を説明する文
category: WEB / DEVELOPMENT
status: draft          # 公開するときは published
# featured: true       # トップの Selected Works に載せる（最大3件）
# order: 10            # 小さいほど先頭
# date: "2026-04"      # 制作時期
# role: 企画・デザイン・開発
# technologies: [Astro, TypeScript]
# gallery:
#   - src: /images/works/${slug}/screen-01.webp
#     alt: 画面の説明
# links:
#   - label: 公開サイト
#     url: https://example.com
---

背景・課題・工夫・結果などを書きます（任意）。
`);
console.log(`作成しました:\n  ${file}\n  public/images/works/${slug}/ ← cover.webp を置いてください`);
