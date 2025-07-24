"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { use } from 'react'; // Keep if needed for params unwrapping
import { AnimatePresence, motion } from 'framer-motion';
import { queryApi, initializeApi } from '@/lib/api'; // Adjust path if needed
import ChatInput from '@/components/ui/chat/chat-input'; // Adjust path if needed
import ChatBubble from '@/components/ui/chat/chat-bubble'; // Adjust path if needed
import ChatLoading from '@/components/ui/chat/chat-loading'; // Adjust path if needed
import ThemeToggle from '@/app/components/ThemeToggle';
import { UserMenu } from '@/app/components/usermenu';
import { SignedIn } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
// import Image from 'next/image'; // Use if you prefer Next/Image optimization
import { useAuth, useUser } from '@clerk/nextjs';
import { useTheme } from '@/app/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { SignedOut, SignInButton } from '@clerk/nextjs';
import BrainPopup from '../../dashboard/_components/popup';

// --- Fixed Icons ---
const UserIcon = () => (
    <svg className="w-8 h-8 text-white bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-1 shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const AssistantIcon = () => (
    // Using a slightly different style for the assistant icon background
    <div className="w-8 h-8 rounded-full p-1.5 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700 shadow-md">
        <svg className="w-full h-full text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
        </svg>
    </div>
);
// --- End Icons ---

export default function ChatRoom({ params }) {
  // Unwrap params
  const unwrappedParams = use(params);
  const sessionId = unwrappedParams.id;

  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || null; // Explicitly null if no query

  const { getToken, userId } = useAuth();
  const { user } = useUser();

  // Add this ref for the chat input
  const chatInputRef = useRef(null);
  const isInitialLoad = useRef(true);
  const hasProcessedInitialQuery = useRef(false);
  
  // --- Initial Messages ---
  const getInitialMessages = () => {
    // If no saved messages and we have an initial query, create initial message
    // if (initialQuery && !hasProcessedInitialQuery.current) {
    //   hasProcessedInitialQuery.current = true;
    //   return [{
    //     role: 'user',
    //     content: initialQuery,
    //     id: `user-initial-${Date.now()}`
    //   }];
    // }
    return [];
  };
  const [messages, setMessages] = useState(getInitialMessages);

  // Add effect to save messages to sessionStorage
  // useEffect(() => {
  //   if (typeof window !== 'undefined' && messages.length > 0) {
  //     try {
  //       sessionStorage.setItem(`chat-${sessionId}`, JSON.stringify(messages));
  //     } catch (error) {
  //       console.error('Error saving to sessionStorage:', error);
  //     }
  //   }
  // }, [messages, sessionId]);

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputContainerRef = useRef(null);
  const router = useRouter();
  const [error, setError] = useState(null);
  const initialAiResponseFetched = useRef(false);

  // Detect dark mode for logo switching
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(match.matches);
    const handler = (e) => setIsDark(e.matches);
    match.addEventListener('change', handler);
    return () => match.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (userId) {
      setIsAuthReady(true);
    } else {
      setIsAuthReady(false);
    }
  }, [userId]);

  useEffect(() => {
    if (getToken) {
      initializeApi(getToken);
    }
  }, [getToken]);

  // Modify the scroll effect to be more controlled
  useEffect(() => {
    if (messages.length > 0 && !isInitialLoad.current) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        const chatContainer = document.querySelector('.chat-messages-container');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      });
    }
    
    // Reset initial load flag after first message
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
    }
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  // Modify the initial query effect to prevent reprocessing on reload
  // useEffect(() => {
  //   const savedMessages = sessionStorage.getItem(`chat-${sessionId}`);
  //   const hasExistingMessages = savedMessages && JSON.parse(savedMessages).length > 0;

  //   // Only process initial query if:
  //   // 1. We have an initial query
  //   // 2. Auth is ready
  //   // 3. Chat input is available
  //   // 4. We haven't processed it before
  //   // 5. We don't have existing messages
  //   if (initialQuery && isAuthReady && chatInputRef.current && !hasProcessedInitialQuery.current && !hasExistingMessages) {
  //     hasProcessedInitialQuery.current = true;
  //     // Short timeout to ensure component is fully mounted
  //     setTimeout(() => {
  //       if (chatInputRef.current) {
  //         // Set the value in the input field
  //         chatInputRef.current.setValue(initialQuery);
  //         // Submit the message
  //         chatInputRef.current.submitMessage();
  //       }
  //     }, 300);
  //   }
  // }, [initialQuery, isAuthReady, sessionId]);

  useEffect(() => {
    const shouldFetchInitialAiResponse = Boolean(
      initialQuery &&
      isAuthReady &&
      !initialAiResponseFetched.current &&
      !isLoading
    );

    if (shouldFetchInitialAiResponse) {
      initialAiResponseFetched.current = true;
      // Immediately clean up the URL to prevent re-fetch on quick reload
      router.replace(`/chat/${sessionId}`);
      setIsLoading(true);
      setError(null);

      // Add initial user message
      const userMessage = {
        role: 'user',
        content: initialQuery,
        id: `user-initial-${Date.now()}`
      };
      setMessages([userMessage]);

      queryApi.sendQuery(initialQuery, userId, sessionId)
        .then(response => {
          if (response && response.answer) {
            const assistantMessage = {
              role: 'assistant',
              content: response.answer,
              id: `asst-initial-${Date.now()}`
            };
            setMessages(prev => [...prev, assistantMessage]);
          } else {
            console.error('Initial AI Response: Invalid format', response);
            throw new Error('Received an unexpected response from the server.');
          }
        })
        .catch(err => {
          const errorContent = err.message || "Failed to get initial response.";
          setError(errorContent);
          setMessages(prev => [...prev, {
            role: 'system',
            content: `Error: ${errorContent}`,
            id: `sys-initial-error-${Date.now()}`
          }]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [initialQuery, isAuthReady, userId, sessionId, isLoading, router]);

  const handleSendMessage = async (text) => {
    const trimmedText = text.trim();
    if (!trimmedText || isLoading || !isAuthReady) return;

    setError(null);

    const userMessage = { role: 'user', content: trimmedText, id: `user-${Date.now()}` };
    setMessages(prev => [...prev, userMessage]);

    setIsLoading(true);

    try {
      if (!userId) throw new Error('Authentication error: User not found.');

      const response = await queryApi.sendQuery(trimmedText, userId, sessionId);
      if (response && response.answer) {
        const assistantMessage = {
          role: 'assistant',
          content: response.answer,
          id: `asst-${Date.now()}`
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        console.error('handleSendMessage: Invalid API response format', response);
        throw new Error('Received an unexpected response from the server.');
      }
    } catch (err) {
      const errorContent = err.message || "Failed to get response.";
      setError(errorContent);
      setMessages(prev => [...prev, {
        role: 'system',
        content: `Error: ${errorContent}`,
        id: `sys-error-${Date.now()}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // --- UI Rendering ---
  useEffect(() => {
    const updatePadding = () => {
      if (chatContainerRef.current && inputContainerRef.current) {
        const inputHeight = inputContainerRef.current.offsetHeight;
        chatContainerRef.current.style.paddingBottom = `${inputHeight + 16}px`;
      }
    };

    const resizeObserver = new ResizeObserver(updatePadding);

    if (inputContainerRef.current) {
      resizeObserver.observe(inputContainerRef.current);
    }

    updatePadding(); // Initial call

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    // Added subtle gradient background
    <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black">
      {/* Dashboard Header reused for chat */}
      <header className="sticky top-4 z-50 w-full px-4 md:px-6">
        <div className="container mx-auto">
          <div className="bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-3xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-md dark:shadow-xl dark:shadow-black/40">
            <div className="flex h-14 items-center justify-between px-6">
              <div className="flex items-center space-x-3">
                <div className="relative w-7 h-7">
                  <Image src="/logo-dark.png" alt="forgetAI Logo" fill className={`transition-transform duration-300 hover:scale-110 ${theme === 'dark' ? 'hidden' : 'block'}`} />
                  <Image src="/logo-light.png" alt="forgetAI Logo" fill className={`transition-transform duration-300 hover:scale-110 ${theme === 'dark' ? 'block' : 'hidden'}`} />
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-gray-200">
                  forgetAI
                </span>
              </div>
              <div className="flex-1 flex justify-center">
                <button onClick={toggleTheme} className="hidden md:flex text-sm font-medium transition-all duration-200 cursor-pointer relative text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200 items-center justify-center w-9 h-9 rounded-full">
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm md:px-4 md:py-2 bg-black text-white hover:bg-gray-900 transition-all min-h-0 h-8 md:h-9"
                  onClick={() => setIsPopupOpen(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="hidden md:inline h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-xs md:text-sm">Add Memory</span>
                </Button>
                <SignedOut>
                  <SignInButton mode="redirect" signInFallbackRedirectUrl="/dashboard">
                    <button className="hidden md:inline-flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200 py-2 px-4">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="hidden md:block">
                    <UserMenu afterSignOutUrl="/" />
                  </div>
                </SignedIn>
                <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {isMenuOpen && (
              <div className="md:hidden border-t border-white/20 dark:border-gray-700/50 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-3xl rounded-b-2xl">
                <nav className="px-6 py-4 space-y-3">
                  <SignedOut>
                    <SignInButton mode="redirect" signInFallbackRedirectUrl="/dashboard">
                      <button className="block text-sm font-medium w-full text-left transition-colors duration-200 text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200 py-2">
                        Sign In
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="block text-sm font-medium w-full text-left py-2">
                      <UserMenu afterSignOutUrl="/" />
                    </div>
                  </SignedIn>
                  <button onClick={toggleTheme} className="block text-sm font-medium w-full text-left transition-colors duration-200 text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200 py-2">
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>
      <BrainPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden pt-8 md:pt-12"> {/* Offset for Header */}
        {/* Chat Messages Area */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent chat-messages-container">
          <div className="max-w-3xl mx-auto w-full space-y-5 md:space-y-6"> {/* Consistent spacing */}

            {/* Initial State with Logo */}
            {!initialQuery && messages.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center justify-center h-full text-center pt-16"
              >
                {/* Use standard img tag pointing to public folder */}
                <img
                  src="/logo.png" // Make sure logo.png is in /public
                  alt="ForgetAI Logo"
                  className="w-20 h-20 md:w-24 md:h-24 mb-5 dark:invert" // Invert color for dark mode
                />
                {/* <Image src="/logo.png" alt="ForgetAI Logo" width={96} height={96} className="mb-5 dark:invert" /> */}
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-base md:text-lg">
                  How can I help you remember today?
                </p>
              </motion.div>
            )}

            {/* Render Messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3`}
              >
                {message.role !== 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 mt-1 -ml-2">
                    <AssistantIcon />
                  </div>
                )}
                <div className={`max-w-[80%] ${message.role === 'user' ? 'order-last' : ''}`}>
                  <ChatBubble message={message.content} role={message.role} />
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 mt-1 -ml-2">
                    <img
                      src={user?.imageUrl}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover bg-white dark:bg-black border border-gray-200 dark:border-gray-700"
                      onError={e => { e.target.src = '/logo-dark.png'; }}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            <AnimatePresence>
              {isLoading && messages.length > 0 && ( // Only show loading if messages exist or initial fetch
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-start items-start gap-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 mt-1 -ml-2">
                    <AssistantIcon />
                  </div>
                  <div className="max-w-[80%]">
                    <ChatLoading />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scroll Anchor */}
            <div ref={messagesEndRef} className="h-1" />
          </div>
        </div>

        {/* Glassy Floating Chat Input Bar */}
        <div ref={inputContainerRef} className="fixed bottom-0 left-0 w-full z-40 flex justify-center pointer-events-none">
          <div className="w-full max-w-2xl px-2 pb-4 pointer-events-auto">
            {/* Error Display */}
            {error && (
              <div className="mb-3 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm shadow-sm">
                {error}
              </div>
            )}
            <div className="rounded-full backdrop-blur-3xl shadow-2xl p-0.5 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', WebkitBackdropFilter: 'blur(24px)' }}>
              {/* Glassmorphism gradient overlay */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
                background: 'linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                mixBlendMode: 'overlay',
                zIndex: 1
              }} />
              <ChatInput
                ref={chatInputRef}
                onSendMessage={handleSendMessage}
                isLoading={!isAuthReady || isLoading}
                placeholder={isAuthReady ? "Message ForgetAI..." : "Connecting..."}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}