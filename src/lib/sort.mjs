// 作品の公開判定・並び順（テストからも使うため純粋な JS にしている）
// 並び順: order 昇順（未指定は最後）→ date 降順（新しい順、未指定は最後）→ slug 昇順
export function sortWorks(works) {
  return [...works].sort((a, b) => {
    const oa = a.data.order ?? Infinity;
    const ob = b.data.order ?? Infinity;
    if (oa !== ob) return oa - ob;
    const da = a.data.date ?? '';
    const db = b.data.date ?? '';
    if (da !== db) {
      if (!da) return 1;
      if (!db) return -1;
      return da < db ? 1 : -1;
    }
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  });
}

export const publishedOnly = (works) => works.filter((w) => w.data.status === 'published');

export function selectFeatured(sorted, limit = 3) {
  return sorted.filter((w) => w.data.featured).slice(0, limit);
}
