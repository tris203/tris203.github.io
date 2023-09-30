'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      type='button'
      className='mb-4 flex w-full text-gray-100'
      onClick={() => router.back()}
    >
      ←
    </button>
  );
}
