import Link from 'next/link';
import type React from 'react';

export default function Pagination({
  currentPage = '1',
  numPages,
}: {
  currentPage: string;
  numPages: number;
}) {
  const activePage = Number(currentPage);
  const previousPage = Math.max(activePage - 1, 1);
  const nextPage = Math.min(activePage + 1, numPages);

  return (
    <nav className='mt-4 border border-[var(--tn-border)] bg-[var(--tn-panel)] font-mono text-sm text-[var(--tn-fg-muted)]'>
      <div className='flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between'>
        <span className='text-[var(--tn-comment)]'>
          pager.status page {activePage} of {numPages}
        </span>
        <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
          <PagerLink page={previousPage} disabled={activePage === 1}>
            prev
          </PagerLink>
          <span className='flex items-center gap-1 border-x border-[var(--tn-border)] px-3'>
            {Array.from({ length: Number(numPages) }, (_, i) => i + 1).map(
              (page) => (
                <Link
                  key={`pagination-number${page}`}
                  href={`/blog/page/${page}`}
                  className={`px-2 py-1 transition ${
                    activePage === page
                      ? 'bg-[var(--tn-selection)] text-[var(--tn-purple)]'
                      : 'text-[var(--tn-fg-muted)] hover:text-[var(--tn-cyan)]'
                  }`}
                >
                  {page}
                </Link>
              ),
            )}
          </span>
          <PagerLink page={nextPage} disabled={activePage === numPages}>
            next
          </PagerLink>
        </div>
      </div>
    </nav>
  );
}

function PagerLink({
  children,
  disabled,
  page,
}: {
  children: React.ReactNode;
  disabled: boolean;
  page: number;
}) {
  if (disabled) {
    return <span className='text-[var(--tn-comment)]'>{children}</span>;
  }

  return (
    <Link
      href={`/blog/page/${page}`}
      className='text-[var(--tn-blue)] transition hover:text-[var(--tn-cyan)]'
    >
      {children}
    </Link>
  );
}
