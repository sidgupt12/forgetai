// "use client";

// import { motion } from 'framer-motion';

// export default function ChatLoading() {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="flex justify-start w-full max-w-3xl mx-auto"
//     >
//       <div className="bg-white dark:bg-zinc-800 rounded-2xl px-4 py-3 shadow-sm border border-gray-200 dark:border-zinc-700 rounded-tl-none">
//         <div className="flex space-x-2">
//           {[0, 1, 2].map((i) => (
//             <motion.div
//               key={i}
//               className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full"
//               animate={{
//                 opacity: [0.4, 1, 0.4],
//                 scale: [0.8, 1.2, 0.8],
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 delay: i * 0.2,
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client";

import { motion } from 'framer-motion';

export default function ChatLoading() {
  // Match assistant bubble style for seamless integration
  const assistantStyle = "bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700/50 rounded-tl-none shadow-lg";
  const bubbleBaseStyle = "relative rounded-2xl px-4 py-3";

  return (
    // Container now matches the assistant bubble's look
    <div className={`${bubbleBaseStyle} ${assistantStyle}`}>
      <div className="flex space-x-1.5"> {/* Reduced space */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 rounded-full" // Changed color
            animate={{
              opacity: [0.5, 1, 0.5], // Slightly different opacity
              scale: [0.9, 1.1, 0.9], // Slightly different scale
              y: [0, -2, 0],       // Add a subtle bounce
            }}
            transition={{
              duration: 1.2,      // Slightly faster
              repeat: Infinity,
              repeatType: "loop", // Explicit loop type
              delay: i * 0.15,    // Adjusted delay
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}