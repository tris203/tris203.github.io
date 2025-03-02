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

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  // read route params then fetch data
  const { slug } = params;
  const post = getPostBySlug(slug, ['title']);
  // return an object
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

  const post = getPostBySlug(slug, [
    'title',
    'date',
    'slug',
    'content',
    'categories',
  ]);

  const stringDate = new Date(post.date).toISOString().split('T')[0];

  return (
    <div className='container mx-auto px-4 py-4'>
      <div className='mb-4 flex w-full text-gray-100'>
        <BackButton />
      </div>
      <div className='mb-[-2px] rounded-t-lg border-4 border-gray-700 bg-gray-700 px-6 py-4'>
        <div className='grid justify-center'>
          <h1 className='text-3xl font-bold text-gray-100'>{post.title}</h1>
          <p className='mb-4 text-sm text-gray-100'>{stringDate}</p>

          {post.categories && (
            <p className='text-gray-100'>
              <span className='mr-2'>Categories</span>
              {post.categories.map((category: string) => (
                <span
                  key={category}
                  className='mr-2 inline-block rounded-full border-t-white bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'
                >
                  {category}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
      <div className='grid justify-center rounded-b-lg border-4 border-gray-700 bg-gray-800'>
        <div className='px-3 py-6'>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
