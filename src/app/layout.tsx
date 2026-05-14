import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TerminalSidebar from './components/TerminalSidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TrisK',
  description: "TrisK's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='min-h-screen bg-[var(--tn-bg)] px-4 py-8 font-mono text-[var(--tn-fg)] sm:px-8'>
          <div className='mx-auto grid w-full max-w-[96rem] gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]'>
            <div className='border border-[var(--tn-border)] bg-[var(--tn-panel)] shadow-[0_0_80px_rgba(122,162,247,0.12)]'>
              <TerminalSidebar label='/home/session' title='TrisK'>
                <div className='mt-6 w-max text-xl font-bold text-[var(--tn-cyan)]'>
                  <p className='mb-1 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-transparent pr-5'>
                    Software Developer
                  </p>
                  <p className='mb-1 animate-typing2 overflow-hidden whitespace-nowrap border-r-4 border-r-transparent pr-5'>
                    Web Developer
                  </p>
                  <p className='mb-1 animate-typing3 overflow-hidden whitespace-nowrap border-r-4 border-r-[var(--tn-cyan)] pr-5'>
                    Business Analyst
                  </p>
                </div>
              </TerminalSidebar>
            </div>
            <div className='min-w-0'>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
