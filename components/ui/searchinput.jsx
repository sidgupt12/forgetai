'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

export function SearchInput({
  placeholders = ["Search...", "Type here..."],
  onChange,
  onSubmit,
  className = "",
  isLoading = false,
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Rotate through placeholders
  useEffect(() => {
    if (!isFocused && inputValue === '') {
      const interval = setInterval(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isFocused, inputValue, placeholders.length]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      if (onSubmit) onSubmit(e);
      // Clear input after submit for better UX
      setInputValue('');
      // Optionally refocus the input
      inputRef.current?.focus();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative w-full max-w-2xl ${className}`}
      style={{ WebkitBackdropFilter: 'blur(24px)', backdropFilter: 'blur(24px)' }}
    >
      {/* Glassmorphic pill background */}
      <div className="flex items-center rounded-full bg-white/30 dark:bg-zinc-900/40 backdrop-blur-2xl overflow-hidden relative w-full" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}>
        {/* Gradient overlay for glassmorphism */}
        <div className="absolute inset-0 pointer-events-none rounded-full" style={{
          background: 'linear-gradient(120deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.10) 100%)',
          mixBlendMode: 'overlay',
          zIndex: 1
        }} />
        {/* Input and send button */}
        <input
          ref={inputRef}
          type="text"
          name="input"
          className="w-full py-4 px-6 bg-transparent text-gray-800 dark:text-white text-lg font-medium font-sans outline-none placeholder-transparent z-10"
          placeholder={placeholders[currentPlaceholder]}
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {/* Animated placeholder with improved typography */}
        <AnimatePresence mode="wait">
          {inputValue === '' && (
            <motion.span
              key={placeholders[currentPlaceholder]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-6 text-lg font-medium pointer-events-none text-gray-500 dark:text-gray-400 z-10"
            >
              {placeholders[currentPlaceholder]}
            </motion.span>
          )}
        </AnimatePresence>
        {/* Submit button - circular with green color scheme */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`h-10 w-10 mr-3 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out z-10 ${
            inputValue.trim() && !isLoading
              ? 'bg-green-500 text-white' 
              : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
          }`}
          disabled={!inputValue.trim() || isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <Send size={16} />
          )}
        </motion.button>
      </div>
      {/* Optional typing effect indicator */}
      <AnimatePresence>
        {inputValue && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.8, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -bottom-6 left-2 text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center"
          >
            <span className="mr-1">ForgetAI is listening</span>
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              •
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}