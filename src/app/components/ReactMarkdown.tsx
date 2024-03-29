'use client';

import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function generateCodeBlock(
  props: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
  >,
) {
  const match = /language-(\w+)/.exec(props.className || '');
  return match ? (
    <SyntaxHighlighter
      style={vscDarkPlus}
      language={match[1]}
      showLineNumbers
      className='max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none'
    >
      {String(props.children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code>
      {props.children}

    </code>
  );
}

function noPreWrap(
  props: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
  >,
) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{props.children}</>;
}

function kbd(
  props: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
  >,
) {
  return <kbd className='px-2 py-1.5 text-xs font-semibold border rounded-lg bg-gray-950 text-gray-100 border-gray-600'>{props.children}</kbd>;
}

export default function ReactMarkdown({ children }: { children: string }) {
  return (
    <div className='container'>
      <Markdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        className='prose prose-invert break-words text-gray-100 prose-p:break-words prose-p:text-justify prose-a:break-all prose-img:h-1/6 max-w-none'
        components={{
          code: generateCodeBlock,
          pre: noPreWrap,
          kbd,
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
