import Markdown from 'react-markdown';
import { getPostBySlug, getPostSlugs } from '../../lib/getPosts';

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

export default function Post({ params } = { params: { slug: 'default' } }) {
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
      <Markdown className='space-y-6 text-lg text-gray-100'>
        {post.content}
      </Markdown>
    </div>
  );
}
