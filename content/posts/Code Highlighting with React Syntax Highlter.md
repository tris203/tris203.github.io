---
title: Code Highlighting In This Blog
date: 2023-10-03
slug: code-highlighting
tags:
  - blog/tech
  - blog/typescript
---
I decided to rewrite this entire website, migrating from WordPress to a static site generated in NextJS, partly because I wanted to have something more customisable and partly because I wanted to get away from WordPress.

One of the things I knew I had to get working was code highlighting, I wanted to be able to write code in my posts and have it look nice and pretty. The source files for these posts are written in Markdown, and I was already using [react-markdown](https://github.com/remarkjs/react-markdown) to parse the markdown into HTML, so I needed to find a way to get code highlighting working with react-markdown.

Their docs suggest using [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) and then using Prism.js (apparently it has better JSX highlighting support over highlight.js) as the highlighter, so after installing the packages I then went looking at the docs to see how to integrate it. The example code in their docs, reads pretty horrifically:

```jsx
ReactDom.render(
  <Markdown
    children={markdown}
    components={{
      code(props) {
        const {children, className, node, ...rest} = props
        const match = /language-(\w+)/.exec(className || '')
        return match ? (
          <SyntaxHighlighter
            {...rest}
            children={String(children).replace(/\n$/, '')}
            style={dark}
            language={match[1]}
            PreTag="div"
          />
        ) : (
          <code {...rest} className={className}>
            {children}
          </code>
        )
      }
    }}
  />,
  document.body
)
```

Now, firstly I find the lack of types disturbing.
![Darth Vader GIF](./images/vaderlack.gif)

Secondly, I don't like the way it's written, it's not very readable, and it's not very maintainable, I don't like the obscure ternary operator, I don't like the shadowed variable names, I don't like the prop spreading. It didn't fill me with hope or happiness. But, I pasted the code in, and it worked, so I decided to try and refactor it to something I was happier with.

I have split the code generator out into a separate function, and then had to do the same with the Pre tags, as it would insist on putting a pre tag around the code block, which I didn't want, I also added a max width to the code blocks, as they were stretching the page out too much especially on mobile.

```jsx
'use client';

import Markdown from 'react-markdown';
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
      customStyle={{
        maxWidth: 'calc(100vw - 50px)',
      }}
    >
      {String(props.children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={props.className}>{props.children}</code>
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

export default function ReactMarkdown({ children }: { children: string }) {
  return (
    <div className='container'>
      <Markdown
        className='prose prose-invert break-words text-gray-100 prose-p:break-words prose-p:text-justify prose-a:break-all prose-img:h-1/6'
        components={{
          code: generateCodeBlock,
          pre: noPreWrap,
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
```

I'm much happier with this, it's more readable, it's more maintainable, it's more type safe. I'm sure there are still improvements to be made, and I don't like the linting override, but I'm happy with it for now.

If I get the time, I might clean it up a bit and submit a PR to their docs to see if they want to use this instead. I think it's better to have a more readable example in the docs, and it's definitely clearer to me what is going on in this code.

But mainly this post is for me to remember how I did it, and to check that the code highlighting works as I write this.
Also, a friendly reminder to myself that when you are struggling to type something <kbd>Ctrl + Click</kbd> or Highlight and <kbd>F12</kbd> is your friend.

This has also made me realise that KBD tags don't work[^1], so I guess I'll have to fix that next.
[^1]: They work now!
