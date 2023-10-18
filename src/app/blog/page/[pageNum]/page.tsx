import React from 'react';
import BlogMainPage from '@/app/blog/page';
import { getPageCount } from '@/app/lib/getPosts';

export function generateStaticParams() {
  const pageCount = getPageCount();
  return Array.from({ length: pageCount }, (_, i) => ({
    pageNum: String(i + 1),
  }));
}

export default function page({ params }: { params: { pageNum: string } }) {
  return <BlogMainPage pageNum={params.pageNum} />;
}
