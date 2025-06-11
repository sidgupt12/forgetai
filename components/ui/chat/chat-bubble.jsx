"use client";

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function ChatBubble({ message, role }) {
  const isUser = role === 'user';

  // Define base styles with more modern look and reduced padding
  const bubbleBaseStyle = "relative rounded-2xl px-4 py-2.5 max-w-full shadow-sm backdrop-blur-sm";

  // Define role-specific styles with gradients and modern colors
  const userStyle = "bg-gradient-to-br from-green-500 to-green-600 text-white rounded-tr-none";
  const assistantStyle = "bg-white/80 dark:bg-zinc-800/80 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-zinc-700/30 rounded-tl-none";
  const systemStyle = "bg-gray-50/80 dark:bg-zinc-700/30 text-gray-500 dark:text-gray-400 text-xs italic border border-gray-100 dark:border-zinc-600/30 text-center py-1.5";

  // Determine style based on role
  let specificStyle;
  switch (role) {
    case 'user':
      specificStyle = userStyle;
      break;
    case 'assistant':
      specificStyle = assistantStyle;
      break;
    case 'system':
      specificStyle = systemStyle;
      break;
    default:
      specificStyle = assistantStyle;
  }

  // Define motion variants for a subtle slide-in/fade-in
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  // Custom components for ReactMarkdown with modern styling and reduced spacing
  const components = {
    h1: ({ node, ...props }) => (
      <h1 className="text-xl font-bold mb-2 text-gray-900 dark:text-white" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-base font-semibold mb-1.5 text-gray-700 dark:text-gray-200" {...props} />
    ),
    p: ({ node, ...props }) => (
      <p className="mb-2 leading-relaxed text-gray-700 dark:text-gray-300" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-none mb-2 space-y-1.5" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-none mb-2 space-y-1.5" {...props} />
    ),
    li: ({ node, ordered, ...props }) => (
      <li className="flex items-start space-x-2 text-gray-700 dark:text-gray-300" {...props}>
        {ordered ? (
          <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center bg-gray-100 dark:bg-zinc-700 rounded-full text-xs font-medium">
            {props.index + 1}
          </span>
        ) : (
          <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-emerald-500 rounded-full" />
        )}
        <span className="flex-1">{props.children}</span>
      </li>
    ),
    strong: ({ node, ...props }) => (
      <strong className="font-semibold text-gray-900 dark:text-white" {...props} />
    ),
    em: ({ node, ...props }) => (
      <em className="italic text-gray-700 dark:text-gray-300" {...props} />
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="relative group">
          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => {
                navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
              }}
              className="p-1 rounded bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
            </button>
          </div>
          <SyntaxHighlighter
            language={match[1]}
            style={oneDark}
            customStyle={{
              margin: '0.5em 0',
              borderRadius: '0.5rem',
              padding: '1em',
              fontSize: '0.875rem',
              lineHeight: '1.5',
            }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md text-sm font-mono text-emerald-600 dark:text-emerald-400" {...props}>
          {children}
        </code>
      );
    },
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-3 border-emerald-500 pl-3 italic my-2 text-gray-600 dark:text-gray-400" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a className="text-emerald-600 dark:text-emerald-400 hover:underline" {...props} />
    ),
  };

  return (
    <motion.div
      className={`${bubbleBaseStyle} ${specificStyle}`}
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <div className="prose dark:prose-invert prose-sm max-w-none">
        {typeof message === 'string' ? (
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={components}
          >
            {message}
          </ReactMarkdown>
        ) : (
          message
        )}
      </div>
    </motion.div>
  );
}