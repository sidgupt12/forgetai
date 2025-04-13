// "use client";

// import { useState, useRef, useEffect } from 'react';
// import { IconSend } from '@tabler/icons-react'; // Make sure @tabler/icons-react is installed
// import { motion } from 'framer-motion';

// export default function ChatInput({ onSendMessage, isLoading, placeholder }) {
//   const [message, setMessage] = useState('');
//   const textareaRef = useRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!message.trim() || isLoading) return;

//     onSendMessage(message);
//     setMessage('');
//     // Reset height after sending
//     if (textareaRef.current) {
//         textareaRef.current.style.height = 'auto'; // Reset first
//         textareaRef.current.style.height = `48px`; // Back to default min-height
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   // Auto-resize the textarea based on content
//   useEffect(() => {
//     const textarea = textareaRef.current;
//     if (textarea) {
//       textarea.style.height = 'auto'; // Reset height to calculate scrollHeight correctly
//       // Set height based on scroll height but capped at max-height (e.g., 150px)
//       // Add small buffer (e.g., 2px) to prevent scrollbar flicker on single line wrap
//       const scrollHeight = textarea.scrollHeight;
//       const maxHeight = 150;
//       textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
//     }
//   }, [message]);

//   return (
//     <form onSubmit={handleSubmit} className="relative w-full">
//       <div className="relative flex items-end overflow-hidden rounded-xl border border-gray-300 dark:border-zinc-700/60 bg-white dark:bg-zinc-800/80 shadow-sm focus-within:ring-2 focus-within:ring-green-500/50 focus-within:border-green-500/50 transition-all duration-200 backdrop-blur-sm">
//         <textarea
//           ref={textareaRef}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder={placeholder || "Type your message..."}
//           disabled={isLoading}
//           className="w-full flex-1 resize-none bg-transparent py-3 pl-4 pr-12 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
//           style={{ minHeight: '48px', maxHeight: '150px' }} // Controlled by useEffect now
//           rows={1}
//         />
//         {/* Send Button with animation */}
//         <motion.button
//           type="submit"
//           disabled={!message.trim() || isLoading}
//           className={`absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${
//             message.trim() && !isLoading
//               ? 'bg-green-500 text-white hover:bg-green-600'
//               : 'bg-gray-100 dark:bg-zinc-700/80 text-gray-400 dark:text-zinc-500 cursor-not-allowed'
//           }`}
//           aria-label="Send message"
//           whileTap={message.trim() && !isLoading ? { scale: 0.95 } : {}} // Tap animation only when enabled
//         >
//           <IconSend size={16} stroke={1.5} />
//         </motion.button>
//       </div>
//        {/* Removed the helper text from here, it clutters the UI a bit */}
//       {/* <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
//         Press Enter to send, Shift+Enter for new line
//       </p> */}
//     </form>
//   );
// }

"use client";

import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Send } from 'lucide-react'; // Adjust based on your icon library

const ChatInput = forwardRef(function ChatInput({ onSendMessage, isLoading, placeholder = "Type a message..." }, ref) {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef(null);
  
  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    setValue: (value) => {
      setInputText(value);
      if (inputRef.current) {
        inputRef.current.value = value;
      }
    },
    submitMessage: () => {
      if (inputText && !isLoading) {
        onSendMessage(inputText);
        setInputText('');
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <textarea
        ref={inputRef}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        rows={1}
        className="w-full py-3 px-4 pr-12 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-70 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!inputText.trim() || isLoading}
        className="absolute right-2 p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={20} />
      </button>
    </form>
  );
});

export default ChatInput;