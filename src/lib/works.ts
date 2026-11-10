import { getCollection, type CollectionEntry } from 'astro:content';
import { sortWorks, publishedOnly, selectFeatured } from './sort.mjs';

export type Work = CollectionEntry<'works'>;

export async function getPublishedWorks(): Promise<Work[]> {
  return sortWorks(publishedOnly(await getCollection('works')));
}

export async function getFeaturedWorks(): Promise<Work[]> {
  return selectFeatured(await getPublishedWorks(), 3);
}

/** base パスを考慮した URL を返す */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
