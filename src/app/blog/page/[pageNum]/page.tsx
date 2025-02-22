import React from 'react';
import BlogMainPage from '@/app/components/BlogMainPage';
import { getPageCount } from '@/app/lib/getPosts';

export function generateStaticParams() {
  const pageCount = getPageCount();
  return Array.from({ length: pageCount }, (_, i) => ({
    pageNum: String(i + 1),
  }));
}

export default async function page(props: {
  params: Promise<{ pageNum: string }>;
}) {
  const params = await props.params;
  return <BlogMainPage pageNum={params.pageNum} />;
}
