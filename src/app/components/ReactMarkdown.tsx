'use client';

import type { SupportedLanguages } from '@pierre/diffs';
import { File } from '@pierre/diffs/react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

function relativeImg(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const alt = props.alt || 'No Alt';
  const src = typeof props.src === 'string' ? props.src : '';
  // remove relative ./ from src
  const safeSrc = src.replace(/^(\.\/)+/, '/');

  // biome-ignore lint/performance/noImgElement: Markdown content can include arbitrary image dimensions.
  return <img src={safeSrc} alt={alt} />;
}

function generateCodeBlock(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >,
) {
  const match = /language-(\w+)/.exec(props.className || '');
  const language = match?.[1] ?? 'txt';
  return match ? (
    <div className='w-full max-w-full overflow-hidden border border-[var(--tn-border)] bg-[var(--tn-panel)]'>
      <File
        file={{
          contents: String(props.children).replace(/\n$/, ''),
          lang: language as SupportedLanguages,
          name: `snippet.${language}`,
        }}
        options={{
          disableFileHeader: true,
          overflow: 'scroll',
          theme: 'tokyo-night',
          useCSSClasses: false,
          unsafeCSS:
            '.diffs-file { background: var(--tn-panel); } .diffs-code { background: var(--tn-panel); }',
        }}
      />
    </div>
  ) : (
    <code className='border border-[var(--tn-border)] bg-[var(--tn-panel)] px-1 py-0.5 text-[var(--tn-cyan)]'>
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
  return <>{props.children}</>;
}

function kbd(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >,
) {
  return (
    <kbd className='border border-[var(--tn-border)] bg-[var(--tn-panel)] px-2 py-1.5 text-xs font-semibold text-[var(--tn-fg)]'>
      {props.children}
    </kbd>
  );
}

export default function ReactMarkdown({ children }: { children: string }) {
  return (
    <div className='min-w-0 max-w-full overflow-hidden'>
      <div className='prose prose-invert max-w-none break-words text-[var(--tn-fg)] prose-headings:text-[var(--tn-cyan)] prose-p:break-words prose-p:text-justify prose-p:text-[var(--tn-fg-muted)] prose-a:break-all prose-a:text-[var(--tn-blue)] prose-strong:text-[var(--tn-fg)] prose-blockquote:border-l-[var(--tn-purple)] prose-blockquote:text-[var(--tn-fg-muted)] prose-li:text-[var(--tn-fg-muted)] prose-img:h-1/6'>
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
