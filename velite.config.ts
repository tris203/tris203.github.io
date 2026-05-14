import { defineCollection, defineConfig, s } from 'velite';

const baseSchema = s.object({
  title: s.string().optional(),
  date: s.isodate(),
  slug: s.slug(),
  tags: s.array(s.string()).default([]),
  content: s.raw(),
});

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.md',
  schema: baseSchema.transform((data) => ({
    ...data,
    title: data.title ?? 'Untitled',
    tags: data.tags.map((tag) => tag.replace(/^blog\//, '')),
  })),
});

const pages = defineCollection({
  name: 'Page',
  pattern: 'pages/**/*.md',
  schema: baseSchema.transform((data) => ({
    ...data,
    title: data.title ?? data.slug,
    tags: data.tags.map((tag) => tag.replace(/^blog\//, '')),
  })),
});

export default defineConfig({
  root: 'content',
  collections: { posts, pages },
});
