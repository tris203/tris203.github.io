import Link from 'next/link';

export default function HomePage() {
  return (
    <div className='flex h-screen items-center justify-center bg-gradient-to-tr from-black to-gray-700 p-10'>
      <div className='container mx-auto px-4 py-8'>
        <div className='w-max'>
          <h2 className='overflow-hidden whitespace-nowrap  pr-5 text-5xl font-bold text-white'>
            TrisK
          </h2>
          <h2 className='animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-2xl font-bold text-white'>
            Software Developer
          </h2>
        </div>
      </div>
      <div className='grid grid-cols-1 content-end items-end gap-16 text-lg'>
        <Link href='/blog'>
          <div>Blog</div>
        </Link>
        <Link href='https://github.com/tris203'>
          <div>GitHub</div>
        </Link>
        <Link href='/about'>
          <div>About</div>
        </Link>
      </div>
    </div>
  );
}
