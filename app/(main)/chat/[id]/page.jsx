// "use client";

// import { useState, useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { use } from 'react'; // Keep if needed for params unwrapping
// import { AnimatePresence, motion } from 'framer-motion';
// import { queryApi, initializeApi } from '@/lib/api'; // Adjust path if needed
// import ChatInput from '@/components/ui/chat/chat-input'; // Adjust path if needed
// import ChatBubble from '@/components/ui/chat/chat-bubble'; // Adjust path if needed
// import ChatLoading from '@/components/ui/chat/chat-loading'; // Adjust path if needed
// import Header from '@/app/components/Header'; // Adjust path if needed
// import { useAuth } from '@clerk/nextjs';
// // import Image from 'next/image'; // Use if you prefer Next/Image optimization

// // --- Fixed Icons ---
// const UserIcon = () => (
//     <svg className="w-8 h-8 text-white bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-1 shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//     </svg>
// );

// const AssistantIcon = () => (
//     // Using a slightly different style for the assistant icon background
//     <div className="w-8 h-8 rounded-full p-1.5 flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 dark:from-zinc-800 dark:to-zinc-700 shadow-md">
//         <svg className="w-full h-full text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//         <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
//         </svg>
//     </div>
// );
// // --- End Icons ---

// export default function ChatRoom({ params }) {
//   // Unwrap params
//   const unwrappedParams = use(params);
//   const sessionId = unwrappedParams.id;

//   const searchParams = useSearchParams();
//   const initialQuery = searchParams.get('q') || null; // Explicitly null if no query

//   const { getToken, userId } = useAuth();

//   // --- Initial Messages ---
//   const getInitialMessages = () => {
//     if (initialQuery) {
//       console.log("Setting initial message state with query:", initialQuery);
//       return [{
//         role: 'user',
//         content: initialQuery,
//         id: `user-initial-${Date.now()}`
//       }];
//     }
//     return [];
//   };
//   const [messages, setMessages] = useState(getInitialMessages);
//   // --- End Initial Messages ---

//   const [isLoading, setIsLoading] = useState(false);
//   const [isAuthReady, setIsAuthReady] = useState(false);
//   const messagesEndRef = useRef(null);
//   const router = useRouter();
//   const [error, setError] = useState(null);
//   const initialAiResponseFetched = useRef(false);

//   // State Hooks (1, 2, 3, 4) and HandleSendMessage (5) remain the same...
//   useEffect(() => {
//     if (userId) {
//       setIsAuthReady(true);
//     } else {
//       setIsAuthReady(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (getToken) {
//       initializeApi(getToken);
//     }
//   }, [getToken]);

//   useEffect(() => {
//     const shouldFetchInitialAiResponse = Boolean(
//       initialQuery &&
//       isAuthReady &&
//       !initialAiResponseFetched.current &&
//       !isLoading
//     );

//     if (shouldFetchInitialAiResponse) {
//       initialAiResponseFetched.current = true;
//       setIsLoading(true);
//       setError(null);

//       queryApi.sendQuery(initialQuery, userId, sessionId)
//         .then(response => {
//           if (response && response.answer) {
//             const assistantMessage = {
//               role: 'assistant',
//               content: response.answer,
//               id: `asst-initial-${Date.now()}`
//             };
//             setMessages(prev => [...prev, assistantMessage]);
//           } else {
//             console.error('Initial AI Response: Invalid format', response);
//             throw new Error('Received an unexpected response from the server.');
//           }
//         })
//         .catch(err => {
//           const errorContent = err.message || "Failed to get initial response.";
//           setError(errorContent);
//           setMessages(prev => [...prev, {
//             role: 'system',
//             content: `Error: ${errorContent}`,
//             id: `sys-initial-error-${Date.now()}`
//           }]);
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     }
//   }, [initialQuery, isAuthReady, userId, sessionId, isLoading]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = async (text) => {
//     const trimmedText = text.trim();
//     if (!trimmedText || isLoading || !isAuthReady) return;

//     setError(null);

//     const userMessage = { role: 'user', content: trimmedText, id: `user-${Date.now()}` };
//     setMessages(prev => [...prev, userMessage]);

//     setIsLoading(true);

//     try {
//       if (!userId) throw new Error('Authentication error: User not found.');

//       const response = await queryApi.sendQuery(trimmedText, userId, sessionId);
//       if (response && response.answer) {
//         const assistantMessage = {
//           role: 'assistant',
//           content: response.answer,
//           id: `asst-${Date.now()}`
//         };
//         setMessages(prev => [...prev, assistantMessage]);
//       } else {
//         console.error('handleSendMessage: Invalid API response format', response);
//         throw new Error('Received an unexpected response from the server.');
//       }
//     } catch (err) {
//       const errorContent = err.message || "Failed to get response.";
//       setError(errorContent);
//       setMessages(prev => [...prev, {
//         role: 'system',
//         content: `Error: ${errorContent}`,
//         id: `sys-error-${Date.now()}`
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- UI Rendering ---
//   return (
//     // Added subtle gradient background
//     <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black">
//       <Header /> {/* Assuming Header has appropriate styling */}

//       <div className="flex-1 flex flex-col overflow-hidden pt-16"> {/* Offset for Header */}
//         {/* Chat Messages Area */}
//         <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
//           <div className="max-w-3xl mx-auto w-full space-y-5 md:space-y-6"> {/* Consistent spacing */}

//             {/* Initial State with Logo */}
//             {!initialQuery && messages.length === 0 && !isLoading && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, ease: "easeOut" }}
//                 className="flex flex-col items-center justify-center h-full text-center pt-16"
//               >
//                 {/* Use standard img tag pointing to public folder */}
//                 <img
//                   src="/logo.png" // Make sure logo.png is in /public
//                   alt="ForgetAI Logo"
//                   className="w-20 h-20 md:w-24 md:h-24 mb-5 dark:invert" // Invert color for dark mode
//                 />
//                 {/* <Image src="/logo.png" alt="ForgetAI Logo" width={96} height={96} className="mb-5 dark:invert" /> */}
//                 <p className="text-gray-500 dark:text-gray-400 mt-2 text-base md:text-lg">
//                   How can I help you remember today?
//                 </p>
//               </motion.div>
//             )}

//             {/* Render Messages */}
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3`}
//               >
//                 {message.role !== 'user' && (
//                   <div className="flex-shrink-0 w-8 h-8 mt-1">
//                     <AssistantIcon />
//                   </div>
//                 )}
//                 <div className={`max-w-[80%] ${message.role === 'user' ? 'order-last' : ''}`}>
//                   <ChatBubble message={message.content} role={message.role} />
//                 </div>
//                 {message.role === 'user' && (
//                   <div className="flex-shrink-0 w-8 h-8 mt-1">
//                     <UserIcon />
//                   </div>
//                 )}
//               </div>
//             ))}

//             {/* Loading Indicator */}
//             <AnimatePresence>
//               {isLoading && messages.length > 0 && ( // Only show loading if messages exist or initial fetch
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className="flex justify-start items-start gap-3"
//                 >
//                   <div className="flex-shrink-0 w-8 h-8 mt-1">
//                     <AssistantIcon />
//                   </div>
//                   <div className="max-w-[80%]">
//                     <ChatLoading />
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Scroll Anchor */}
//             <div ref={messagesEndRef} className="h-1" />
//           </div>
//         </div>

//         {/* Input Area */}
//         <div className="p-4 md:p-6 bg-gradient-to-t from-gray-100 to-white dark:from-black dark:to-zinc-950 border-t border-gray-200 dark:border-zinc-700/50">
//           <div className="max-w-3xl mx-auto w-full">
//             {/* Error Display */}
//             {error && (
//               <div className="mb-3 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm shadow-sm">
//                 {error}
//               </div>
//             )}

//             {/* Chat Input Component */}
//             <ChatInput
//               onSendMessage={handleSendMessage}
//               isLoading={!isAuthReady || isLoading}
//               placeholder={isAuthReady ? "Message ForgetAI..." : "Connecting..."}
//             />
//             {/* Footer Text (Optional) */}
//             {/* <p className="text-xs text-center text-gray-400 dark:text-zinc-500 mt-3">
//               ForgetAI may display inaccurate info. Verify important information.
//             </p> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { use } from 'react'; // Keep if needed for params unwrapping
import { AnimatePresence, motion } from 'framer-motion';
import { queryApi, initializeApi } from '@/lib/api'; // Adjust path if needed
import ChatInput from '@/components/ui/chat/chat-input'; // Adjust path if needed
import ChatBubble from '@/components/ui/chat/chat-bubble'; // Adjust path if needed
import ChatLoading from '@/components/ui/chat/chat-loading'; // Adjust path if needed
import Header from '@/app/components/Header'; // Adjust path if needed
import { useAuth } from '@clerk/nextjs';
// import Image from 'next/image'; // Use if you prefer Next/Image optimization

// --- Fixed Icons ---
const UserIcon = () => (
    <svg className="w-8 h-8 text-white bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-1 shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const AssistantIcon = () => (
    // Using a slightly different style for the assistant icon background
    <div className="w-8 h-8 rounded-full p-1.5 flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 dark:from-zinc-800 dark:to-zinc-700 shadow-md">
        <svg className="w-full h-full text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
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

  // Add this ref for the chat input
  const chatInputRef = useRef(null);
  
  // --- Initial Messages ---
  const getInitialMessages = () => {
    if (initialQuery) {
      console.log("Setting initial message state with query:", initialQuery);
      return [{
        role: 'user',
        content: initialQuery,
        id: `user-initial-${Date.now()}`
      }];
    }
    return [];
  };
  const [messages, setMessages] = useState(getInitialMessages);
  // --- End Initial Messages ---

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const messagesEndRef = useRef(null);
  const router = useRouter();
  const [error, setError] = useState(null);
  const initialAiResponseFetched = useRef(false);

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

  // Add this effect to automatically trigger the chat input when page loads with initialQuery
  useEffect(() => {
    // Check if we have an initialQuery and auth is ready
    if (initialQuery && isAuthReady && chatInputRef.current) {
      // Short timeout to ensure component is fully mounted
      setTimeout(() => {
        if (chatInputRef.current) {
          // Set the value in the input field
          chatInputRef.current.setValue(initialQuery);
          // Submit the message
          chatInputRef.current.submitMessage();
        }
      }, 300);
    }
  }, [initialQuery, isAuthReady]);

  useEffect(() => {
    const shouldFetchInitialAiResponse = Boolean(
      initialQuery &&
      isAuthReady &&
      !initialAiResponseFetched.current &&
      !isLoading
    );

    if (shouldFetchInitialAiResponse) {
      initialAiResponseFetched.current = true;
      setIsLoading(true);
      setError(null);

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
  }, [initialQuery, isAuthReady, userId, sessionId, isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  // --- UI Rendering ---
  return (
    // Added subtle gradient background
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black">
      <Header /> {/* Assuming Header has appropriate styling */}

      <div className="flex-1 flex flex-col overflow-hidden pt-16"> {/* Offset for Header */}
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
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
                  <div className="flex-shrink-0 w-8 h-8 mt-1">
                    <AssistantIcon />
                  </div>
                )}
                <div className={`max-w-[80%] ${message.role === 'user' ? 'order-last' : ''}`}>
                  <ChatBubble message={message.content} role={message.role} />
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 mt-1">
                    <UserIcon />
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
                  <div className="flex-shrink-0 w-8 h-8 mt-1">
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

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-gradient-to-t from-gray-100 to-white dark:from-black dark:to-zinc-950 border-t border-gray-200 dark:border-zinc-700/50">
          <div className="max-w-3xl mx-auto w-full">
            {/* Error Display */}
            {error && (
              <div className="mb-3 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm shadow-sm">
                {error}
              </div>
            )}

            {/* Chat Input Component with ref */}
            <ChatInput
              ref={chatInputRef}
              onSendMessage={handleSendMessage}
              isLoading={!isAuthReady || isLoading}
              placeholder={isAuthReady ? "Message ForgetAI..." : "Connecting..."}
            />
            {/* Footer Text (Optional) */}
            {/* <p className="text-xs text-center text-gray-400 dark:text-zinc-500 mt-3">
              ForgetAI may display inaccurate info. Verify important information.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}