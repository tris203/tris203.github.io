import type { Metadata } from 'next';
import ReactMarkdown from '@/app/components/ReactMarkdown';
import { blogPosts, postBySlug } from '../../lib/content';

export function generateStaticParams() {
  return blogPosts.map((post) => {
    return {
      slug: post.slug,
    };
  });
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const post = postBySlug.get(slug);

  if (!post) {
    return {};
  }

  return {
    title: `TrisK>Blog>${post.title}`,
    description: `Blog post titled ${post.title}`,
  };
}

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const { params } = props;
  const { slug } = await params;
  const post = postBySlug.get(slug);

  if (!post) {
    throw new Error(`No post found with slug: ${slug}`);
  }

  const stringDate = new Date(post.date).toISOString().split('T')[0];

  return (
    <article className='min-w-0'>
      <header className='border border-[var(--tn-border)] bg-[var(--tn-panel)] px-6 py-5 shadow-[0_0_80px_rgba(122,162,247,0.12)]'>
        <p className='text-xs uppercase tracking-[0.4em] text-[var(--tn-blue)]'>
          /blog/{post.slug}
        </p>
        <h1 className='mt-5 text-3xl font-bold text-[var(--tn-cyan)] sm:text-5xl'>
          {post.title}
        </h1>
        <p className='mt-3 text-sm text-[var(--tn-yellow)]'>{stringDate}</p>

        {post.tags && (
          <p className='mt-5 text-[var(--tn-fg-muted)]'>
            <span className='mr-2 text-[var(--tn-comment)]'>tags</span>
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className='mr-2 inline-block border border-[var(--tn-border)] bg-[var(--tn-bg)] px-3 py-1 text-sm font-semibold text-[var(--tn-purple)]'
              >
                {tag}
              </span>
            ))}
          </p>
        )}
      </header>
      <div className='min-w-0 border-x border-b border-[var(--tn-border)] bg-[var(--tn-bg)]'>
        <div className='min-w-0 px-5 py-8 sm:px-8'>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
