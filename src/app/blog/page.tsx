import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '../lib/getPosts';

export default function page() {
  const posts = getAllPosts(['title', 'date', 'content', 'slug']);
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6 flex w-full text-3xl text-gray-100'>Blog Posts</div>
      <div className='grid grid-cols-1 gap-6 gap-y-12 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className='min-h-full transform flex-col rounded-lg bg-gray-800 p-6 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gray-700'>
              <div className='min-h-full flex-col rounded-lg bg-gray-800 p-6'>
                <h1 className='pb-2 text-3xl font-bold text-gray-100'>
                  {post.title}
                </h1>
                <div className='break-words text-gray-100'>
                  {`${post.content.substring(0, 160)}...`}
                </div>
                <div className='mt-4 flex h-auto justify-between'>
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
    </div>
  );
}
