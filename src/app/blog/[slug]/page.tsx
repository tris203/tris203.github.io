import { Metadata } from 'next';
import { getPostBySlug, getPostSlugs } from '../../lib/getPosts';
import ReactMarkdown from '@/app/components/ReactMarkdown';

import BackButton from '@/app/components/BackButton';

export function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => {
    const slugNoExt = slug.replace(/\.md$/, '');
    return {
      slug: slugNoExt,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // read route params then fetch data
  const { slug } = params;
  const post = getPostBySlug(slug, ['title']);
  // return an object
  return {
    title: `TrisK>Blog>${post.title}`,
    description: `Blog post titled ${post.title}`,
  };
}

export default function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = getPostBySlug(slug, [
    'title',
    'date',
    'slug',
    'content',
    'categories',
  ]);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-4 flex w-full text-gray-100'>
        <BackButton />
      </div>
      <h1 className='text-3xl font-bold text-gray-100'>{post.title}</h1>
      <p className='mb-4 text-sm text-gray-100'>{post.date}</p>
      {post.categories && (
        <p className='mb-4 text-gray-100'>
          <span className='mr-2'>Categories</span>
          {post.categories.map((category: string) => (
            <span
              key={category}
              className='mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'
            >
              {category}
            </span>
          ))}
        </p>
      )}
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  );
}
