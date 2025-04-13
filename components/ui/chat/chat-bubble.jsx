// "use client";

// import { motion } from 'framer-motion';

// export default function ChatBubble({ message, isUser }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full max-w-3xl mx-auto`}
//     >
//       <div
//         className={`relative rounded-2xl px-4 py-3 max-w-[80%] ${
//           isUser
//             ? 'bg-green-500 text-white rounded-tr-none'
//             : 'bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-zinc-700 rounded-tl-none shadow-sm'
//         }`}
//       >
//         <div className="prose dark:prose-invert prose-sm prose-p:my-1 prose-pre:my-1 prose-headings:my-2">
//           {typeof message === 'string' ? (
//             <div dangerouslySetInnerHTML={{ __html: message }} />
//           ) : (
//             message
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client";

import { motion } from 'framer-motion';
// If you plan to render markdown:
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

export default function ChatBubble({ message, role }) {
  const isUser = role === 'user';

  // Define base styles
  const bubbleBaseStyle = "relative rounded-2xl px-4 py-3 max-w-full shadow-lg"; // Use max-w-full here, parent controls width limit

  // Define role-specific styles
  const userStyle = "bg-gradient-to-br from-green-500 to-green-600 text-white rounded-tr-none";
  const assistantStyle = "bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-zinc-700/50 rounded-tl-none";
  const systemStyle = "bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 text-xs italic border border-gray-200 dark:border-zinc-600 text-center py-2"; // Example for system messages

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
      specificStyle = assistantStyle; // Default fallback
  }

  // Define motion variants for a subtle slide-in/fade-in
  const variants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    // The parent div in ChatRoom now controls alignment (justify-start/end) and max-width
    <motion.div
        className={`${bubbleBaseStyle} ${specificStyle}`}
        variants={variants}
        initial="hidden"
        animate="visible"
    >
      {/* Using prose for nice typography, customize as needed */}
      <div className="prose dark:prose-invert prose-sm max-w-none prose-p:my-1 prose-pre:my-1 prose-pre:bg-gray-100 prose-pre:dark:bg-zinc-900 prose-pre:p-2 prose-pre:rounded prose-headings:my-2 prose-a:text-green-600 dark:prose-a:text-green-400 hover:prose-a:underline">
        {/* Basic Handling - Render simple strings or use dangerouslySetInnerHTML cautiously */}
        {typeof message === 'string' ? (
            // Consider using a Markdown renderer if your API returns Markdown
            // <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
            <div dangerouslySetInnerHTML={{ __html: message.replace(/\n/g, '<br />') }} /> // Basic newline handling
        ) : (
          // Render non-string messages directly (e.g., React components, though unlikely here)
          message
        )}
      </div>
    </motion.div>
  );
}