import Link from 'next/link';
import type React from 'react';

export default function TerminalSidebar({
  children,
  label,
  title,
}: {
  children: React.ReactNode;
  label: string;
  title: string;
}) {
  return (
    <aside className='h-full bg-[var(--tn-bg)] p-5'>
      <p className='text-xs uppercase tracking-[0.4em] text-[var(--tn-blue)]'>
        {label}
      </p>
      <h1 className='mt-8 text-4xl font-bold leading-tight text-[var(--tn-fg)]'>
        {title}
      </h1>
      <div className='mt-4 text-sm leading-6 text-[var(--tn-fg-muted)]'>
        {children}
      </div>
      <div className='mt-10 border-t border-[var(--tn-border)] pt-5 text-sm'>
        <p className='text-[var(--tn-comment)]'>quick links</p>
        <nav className='mt-3 grid gap-2'>
          <Link
            href='/'
            className='text-[var(--tn-blue)] transition hover:text-[var(--tn-cyan)]'
          >
            ~/home
          </Link>
          <Link
            href='/blog'
            className='text-[var(--tn-purple)] transition hover:text-[var(--tn-cyan)]'
          >
            ~/blog
          </Link>
        </nav>
      </div>
    </aside>
  );
}
