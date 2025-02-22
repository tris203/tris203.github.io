import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

type Fields = {
  title: string;
  date: Date;
  slug: string;
  content: string;
  categories: string[];
};

const perPage = 9 as const;

const excludeSlugs = ['about', 'portfolio'];

type FieldTypes = keyof Fields;
const postsDirectory = join('content');

export function getPostSlugs() {
  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'));

  const slugs = files.map((file) => {
    const filePath = join(postsDirectory, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return data.slug;
  });

  return slugs;
}

export function getPostBySlug(slug: string, fields: FieldTypes[] = []) {
  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'));

  let matchingFile = null;
  files.find((file) => {
    const filePath = join(postsDirectory, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    if (data.slug === slug) {
      matchingFile = file;
      return true;
    }
    return false;
  });
  if (!matchingFile) {
    throw new Error(`No post found with slug: ${slug}`);
  }

  const fullPath = join(postsDirectory, matchingFile);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: Fields = {} as Fields;

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    switch (field) {
      case 'slug':
        items[field] = data.slug;
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

export function getAllPosts(page: number = 1) {
  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'));

  const posts = files
    .map((file) => {
      const filePath = join(postsDirectory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      if (excludeSlugs.includes(data.slug)) {
        return null;
      }
      const post: Partial<Fields> = {
        title: data.title || 'Untitled',
        date: data.date || new Date(),
        slug: data.slug,
        content,
        categories: data.categories || [],
      };
      return post;
    })
    .filter((post) => post !== null)
    .sort((post1, post2) => ((post1?.date || new Date()) > (post2?.date || new Date()) ? -1 : 1))
    .slice((page - 1) * perPage, page * perPage);

  return posts as Fields[];
}

export function getPageCount() {
  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'));

  const posts = files
    .map((file) => {
      const filePath = join(postsDirectory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      return data.slug;
    })
    .filter((slug) => !excludeSlugs.includes(slug));

  return Math.ceil(posts.length / perPage);
}
