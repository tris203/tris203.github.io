'use client';

import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function relativeImg(props: React.ImgHTMLAttributes<HTMLElement>) {
  const alt = props.alt || 'No Alt';
  const src = props.src || '';
  // remove relative ./ from src
  const safeSrc = src.replace(/^(\.\/)+/, '/');

  return <img src={safeSrc} alt={alt} />;
}

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
    <code>{props.children}</code>
  );
}

function noPreWrap(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement
  >,
) {
  return <>{props.children}</>;
}

function kbd(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >,
) {
  return (
    <kbd className='rounded-lg border border-gray-600 bg-gray-950 px-2 py-1.5 text-xs font-semibold text-gray-100'>
      {props.children}
    </kbd>
  );
}

export default function ReactMarkdown({ children }: { children: string }) {
  return (
    <div className='container'>
      <div className='prose prose-invert max-w-none break-words text-gray-100 prose-p:break-words prose-p:text-justify prose-a:break-all prose-img:h-1/6'>
        <Markdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          components={{
            code: generateCodeBlock,
            pre: noPreWrap,
            img: relativeImg,
            kbd,
          }}
        >
          {children}
        </Markdown>
      </div>
    </div>
  );
}
