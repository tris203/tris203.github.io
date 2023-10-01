import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

type Fields = {
  title: string;
  date: string;
  slug: string;
  content: string;
  categories: string[];
};

const excludeSlugs = ['about', 'portfolio'];

// type AvailableField = (typeof availableFields)[number];
type FieldTypes = keyof Fields;

const postsDirectory = join('content');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: FieldTypes[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}/index.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: Fields = {} as Fields;

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    switch (field) {
      case 'slug':
        items[field] = realSlug;
        break;
      case 'content':
        items[field] = content;
        break;
      default:
        items[field] = data[field];
    }
  });
  return items;
}

export function getAllPosts(fields: FieldTypes[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .filter((slug) => !excludeSlugs.includes(slug))
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
