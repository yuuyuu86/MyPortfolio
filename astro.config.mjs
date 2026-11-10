import { defineConfig } from 'astro/config';

// GitHub Actions の configure-pages から BASE_PATH / SITE_URL を受け取る。
// ユーザーサイト・独自ドメインでは BASE_PATH は空文字。
const base = (process.env.BASE_PATH || '').replace(/\/$/, '') + '/';

export default defineConfig({
  site: process.env.SITE_URL || 'https://example.github.io',
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
});
