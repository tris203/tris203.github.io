import { pages, posts } from '../../../.velite';

export const postsPerPage = 9;

export const blogPosts = posts.toSorted((post1, post2) =>
  new Date(post1.date) > new Date(post2.date) ? -1 : 1,
);

export const pageCount = Math.ceil(blogPosts.length / postsPerPage);

export const postBySlug = new Map(blogPosts.map((post) => [post.slug, post]));

export const pageBySlug = new Map(pages.map((page) => [page.slug, page]));

export function getBlogPostsPage(page: number) {
  return blogPosts.slice((page - 1) * postsPerPage, page * postsPerPage);
}
