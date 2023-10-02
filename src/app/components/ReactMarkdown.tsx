'use client';

import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ReactMarkdown({ children }: { children: string }) {
  return (
    <Markdown
      className='prose prose-invert max-w-4xl break-words text-gray-100 prose-p:text-justify prose-a:break-all prose-img:h-1/6'
      components={{
        // eslint-disable-next-line react/no-unstable-nested-components
        code(props) {
          // eslint-disable-next-line no-shadow
          const { children, className } = props;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter
              className='prose'
              style={vscDarkPlus}
              language={match[1]}
              PreTag='div'
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className}>{children}</code>
          );
        },
      }}
    >
      {children}
    </Markdown>
  );
}
