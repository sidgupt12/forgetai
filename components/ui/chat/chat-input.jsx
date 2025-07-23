"use client";

import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
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

  // Auto-resize the textarea based on content
  useEffect(() => {
    const textarea = inputRef.current;
    if (textarea) {
      // Reset styles
      textarea.style.paddingTop = '0px';
      textarea.style.paddingBottom = '0px';
      textarea.style.height = 'auto';

      const contentHeight = textarea.scrollHeight;
      const normalPadding = 8; // Increased from 6
      const singleLineHeight = 40; // Increased from 36
      const maxHeight = 150;

      if (contentHeight + normalPadding * 2 <= singleLineHeight) {
        // Single line: center the text
        const totalPadding = singleLineHeight - contentHeight;
        const pad = totalPadding / 2;
        textarea.style.paddingTop = `${pad}px`;
        textarea.style.paddingBottom = `${pad}px`;
        textarea.style.height = `${singleLineHeight}px`;
      } else {
        // Multi-line: use normal padding
        textarea.style.paddingTop = `${normalPadding}px`;
        textarea.style.paddingBottom = `${normalPadding}px`;
        const adjustedHeight = contentHeight + normalPadding * 2;
        textarea.style.height = `${Math.min(adjustedHeight, maxHeight)}px`;
      }
    }
  }, [inputText]);

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
    <form onSubmit={handleSubmit} className="relative flex items-center w-full">
      <textarea
        ref={inputRef}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        className="w-full px-4 pr-12 bg-transparent border-none outline-none resize-none text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-0 focus:border-none disabled:opacity-70 disabled:cursor-not-allowed overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        style={{ boxShadow: 'none', borderRadius: 0 }}
      />
      <button
        type="submit"
        disabled={!inputText.trim() || isLoading}
        className="absolute right-2 p-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border-none outline-none"
        style={{ boxShadow: 'none', top: '50%', transform: 'translateY(-50%)' }} // Center vertically
      >
        <Send size={18} />
      </button>
    </form>
  );
});

export default ChatInput;