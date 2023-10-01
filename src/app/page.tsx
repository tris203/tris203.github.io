import Link from 'next/link';
import { getAllPosts, getPostBySlug } from './lib/getPosts';
import ReactMarkdown from './components/ReactMarkdown';

export default function HomePage() {
  const posts = getAllPosts(['title', 'slug', 'date']);
  return (
    <div className='pt=12 flex h-full flex-col bg-gradient-to-tr from-black to-gray-700 pt-24 md:h-screen'>
      <div className='container mx-auto px-4'>
        <div className='w-max'>
          <h2 className='overflow-hidden whitespace-nowrap  pr-5 text-5xl font-bold text-white'>
            TrisK
          </h2>
          <h2 className='mb-1 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-transparent pr-5 text-2xl font-bold text-white'>
            Software Developer
          </h2>
          <h2 className='mb-1 animate-typing2 overflow-hidden whitespace-nowrap border-r-4 border-r-transparent pr-5 text-2xl font-bold text-white'>
            Web Developer
          </h2>
          <h2 className='mb-1 animate-typing3 overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-2xl font-bold text-white'>
            Business Analyst
          </h2>
        </div>

        <div className='mt-6 grid animate-fadein grid-cols-1 content-end items-start gap-4 py-4 text-lg md:grid-cols-3'>
          <div className='flex h-full w-full flex-col rounded-lg border-4 border-gray-700 bg-gray-800 p-6 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105  hover:bg-gray-700'>
            <div className='mb-4 flex w-full text-3xl text-gray-100'>Blog</div>
            <div className='mb-! text-lg'>Latest Blog Posts</div>
            <ol className='whitespace-nowrap text-sm text-gray-100'>
              {posts.slice(0, 5).map((post) => (
                <li key={post.slug}>
                  <div className='mb-1 ml-2 flex w-full text-sm  text-gray-100 '>
                    <Link href={`/blog/${post.slug}`}>
                      <span className='overflow-hidden whitespace-nowrap text-sm text-gray-100 hover:animate-pulse hover:text-gray-100'>{`${post.title} - ${post.date}`}</span>
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
            <div className='mt-2 text-sm text-gray-100'>
              <Link href='/blog'>View All</Link>
            </div>
          </div>
          <div className='flex h-full w-full flex-col rounded-lg border-4 border-gray-700 bg-gray-800 p-6 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gray-700'>
            <div className='mb-4 flex w-full text-3xl text-gray-100'>
              Portfolio
            </div>
            <div className='text-sm'>
              <ReactMarkdown>
                {getPostBySlug('portfolio', ['content']).content}
              </ReactMarkdown>
            </div>
          </div>

          <div className='flex h-full w-full flex-col rounded-lg border-4 border-gray-700 bg-gray-800 p-6 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gray-700'>
            <div className='mb-4 flex w-full text-3xl text-gray-100'>About</div>
            <div className='text-sm'>
              <ReactMarkdown>
                {getPostBySlug('about', ['content']).content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
