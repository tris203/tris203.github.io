import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const availableFields = [
  'title',
  'date',
  'slug',
  'content',
  'categories',
] as const;

type AvailableField = (typeof availableFields)[number];
type AvailableFields = { [key in AvailableField]: string };

const postsDirectory = join('content');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: AvailableField[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}\\index.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: AvailableFields = {} as AvailableFields;

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'title') items[field] = data.title;
    if (field === 'slug') items[field] = realSlug;
    if (field === 'content') items[field] = content;
    if (field === 'date') items[field] = data.date;
    if (field === 'categories') items[field] = data.categories;
  });
  return items;
}

export function getAllPosts(fields: AvailableField[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
