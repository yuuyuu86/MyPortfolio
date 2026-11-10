import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const image = z.object({ src: z.string(), alt: z.string() });

const works = defineCollection({
  // slug はファイル名（例: podle.md → /works/podle/）
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    cover: z.string(),
    alt: z.string(),
    category: z.string(),
    status: z.enum(['draft', 'published']),
    featured: z.boolean().optional(),
    order: z.number().optional(),
    date: z.string().optional(),
    role: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    gallery: z.array(image).optional(),
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).optional(),
  }),
});

export const collections = { works };
