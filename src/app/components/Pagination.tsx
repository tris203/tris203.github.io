import Link from 'next/link';

export default function Pagination({
  currentPage = '1',
  numPages,
}: {
  currentPage: string;
  numPages: number;
}) {
  return (
    <div
      className='
    sticky bottom-0 left-0 right-0
    flex w-full justify-center text-gray-100'
    >
      {Array.from({ length: Number(numPages) }, (_, i) => (
        <Link key={`pagination-number${i + 1}`} href={`/blog/page/${i + 1}`}>
          <div
            key={`pagination-number${i + 1}`}
            className={`mx-1 mt-2 rounded-md px-3 py-2 text-sm font-medium ${
              Number(currentPage) === i + 1
                ? 'bg-gray-700 text-gray-100'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-100'
            }`}
          >
            {i + 1}
          </div>
        </Link>
      ))}
    </div>
  );
}
