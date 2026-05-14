import Link from 'next/link';
import type React from 'react';
import ReactMarkdown from './components/ReactMarkdown';
import { blogPosts, pageBySlug } from './lib/content';

function formatDate(date: string) {
  return new Date(date).toISOString().split('T')[0];
}

export default function HomePage() {
  const portfolio = pageBySlug.get('portfolio');
  const about = pageBySlug.get('about');

  if (!portfolio || !about) {
    throw new Error('Missing required home page content');
  }

  return (
    <section className='grid gap-6'>
      <div className='border border-[var(--tn-border)] bg-[var(--tn-bg)]'>
        <div className='border-b border-[var(--tn-border)] bg-[var(--tn-panel)] px-5 py-3 text-sm text-[var(--tn-yellow)]'>
          buffer://latest-posts
        </div>
        <ol className='divide-y divide-[var(--tn-border)]'>
          {blogPosts.slice(0, 5).map((post, index) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className='grid gap-2 p-4 transition hover:bg-[var(--tn-selection)] sm:grid-cols-[4rem_1fr_7rem]'
              >
                <span className='text-[var(--tn-comment)]'>
                  #{String(blogPosts.length - index).padStart(3, '0')}
                </span>
                <span className='font-bold text-[var(--tn-cyan)]'>
                  {post.title}
                </span>
                <span className='text-sm text-[var(--tn-yellow)]'>
                  {formatDate(post.date)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <Link
          href='/blog'
          className='block border-t border-[var(--tn-border)] bg-[var(--tn-panel)] px-5 py-3 text-sm font-bold text-[var(--tn-blue)] transition hover:bg-[var(--tn-selection)] hover:text-[var(--tn-cyan)]'
        >
          open /blog/index
        </Link>
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        <Panel title='buffer://portfolio'>
          <ReactMarkdown>{portfolio.content}</ReactMarkdown>
        </Panel>
        <Panel title='buffer://about'>
          <ReactMarkdown>{about.content}</ReactMarkdown>
        </Panel>
      </div>
    </section>
  );
}

function Panel({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className='border border-[var(--tn-border)] bg-[var(--tn-bg)]'>
      <h2 className='border-b border-[var(--tn-border)] bg-[var(--tn-panel)] px-5 py-3 text-sm text-[var(--tn-yellow)]'>
        {title}
      </h2>
      <div className='p-5 text-sm'>{children}</div>
    </section>
  );
}
