import type { Metadata } from 'next';
import Link from 'next/link';
import Pagination from '@/app/components/Pagination';
import {
  blogPosts,
  getBlogPostsPage,
  pageCount,
  postsPerPage,
} from '@/app/lib/content';

export const metadata: Metadata = {
  title: 'TrisK>Blog',
  description: 'Blog posts',
};

type BlogPostPreview = ReturnType<typeof getBlogPostsPage>[number];

export default async function BlogMainPage({ pageNum }: { pageNum: string }) {
  const page = pageNum ? Number(pageNum) : 1;
  const posts = getBlogPostsPage(page);

  return (
    <div>
      <section className='divide-y divide-[var(--tn-border)] border border-[var(--tn-border)] bg-[var(--tn-bg)]'>
        {posts.map((post, index) => (
          <PostRow key={post.slug} post={post} index={index} page={page} />
        ))}
      </section>
      <Pagination currentPage={String(page)} numPages={pageCount} />
    </div>
  );
}

function PostRow({
  post,
  index,
  page,
}: {
  post: BlogPostPreview;
  index: number;
  page: number;
}) {
  const sequence = blogPosts.length - ((page - 1) * postsPerPage + index);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className='grid gap-3 p-5 transition hover:bg-[var(--tn-selection)] md:grid-cols-[6rem_1fr_8rem]'
    >
      <span className='text-[var(--tn-comment)]'>
        #{String(sequence).padStart(3, '0')}
      </span>
      <span>
        <span className='block text-2xl font-bold text-[var(--tn-cyan)]'>
          {post.title}
        </span>
        <span className='mt-2 block text-sm leading-6 text-[var(--tn-fg-muted)]'>
          {excerpt(post, 160)}...
        </span>
      </span>
      <span className='text-sm text-[var(--tn-yellow)]'>
        {formatDate(post.date)}
      </span>
    </Link>
  );
}

function formatDate(date: string) {
  return new Date(date).toISOString().split('T')[0];
}

function excerpt(post: BlogPostPreview, length = 180) {
  return post.content.replace(/\s+/g, ' ').trim().substring(0, length);
}
