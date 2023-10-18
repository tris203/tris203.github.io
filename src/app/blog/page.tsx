import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllPosts, getPageCount } from '@/app/lib/getPosts';
import BackButton from '@/app/components/BackButton';
import Pagination from '@/app/components/Pagination';

export const metadata: Metadata = {
  title: 'TrisK>Blog',
  description: 'Blog posts',
};

export default function BlogMainPage({ pageNum } : { pageNum: string }) {
  const pageCount = getPageCount();
  const posts = getAllPosts(
    ['title', 'date', 'content', 'slug'],
    pageNum ? Number(pageNum) : 1,
  );
  return (
    <div className='container mx-auto px-4 py-4'>
      <BackButton />
      <div className='mb-6 flex w-full text-3xl text-gray-100'>Blog Posts</div>
      <div className='gap-y8 grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className='boder-gray-700 min-h-full transform flex-col rounded-lg border-4 border-gray-700 bg-gray-800 p-6 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gray-700'>
              <div className='flex-col rounded-lg bg-gray-800 p-2'>
                <h1 className='pb-2 text-3xl font-bold text-gray-100'>
                  {post.title}
                </h1>
                <div className='mb-6 overflow-hidden text-ellipsis break-words text-gray-100'>
                  {post.content.substring(0, 150)}
                </div>

                <div className='absolute bottom-0 left-0 right-0 mx-8 flex justify-between'>
                  <span className='mb-4 flex text-sm text-gray-100'>
                    Read More
                  </span>
                  <span className='mb-4 flex text-sm text-gray-100'>
                    {post.date}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination currentPage={pageNum} numPages={pageCount} />
    </div>
  );
}
