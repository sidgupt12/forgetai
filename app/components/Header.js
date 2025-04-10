// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import ThemeToggle from './ThemeToggle';
// import { SignedIn, UserButton } from '@clerk/nextjs';
// import { UserMenu } from './usermenu';

// export default function Header() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <header className="flex items-center justify-between py-2 px-6 bg-white dark:bg-true-black border-b border-gray-200 dark:border-gray-800 shadow-sm">
//       <div className="flex items-center w-full md:w-auto">
//         <Link href="/" className="transition-transform duration-300 hover:scale-105 mr-auto">
//           <div className="relative w-32 h-10 md:w-40 md:h-12">
//             <Image
//               src="/logo-dark.png"
//               alt="Logo for light theme"
//               fill
//               className="object-left object-contain dark:hidden"
//               priority
//             />
//             <Image
//               src="/logo-light.png"
//               alt="Logo for dark theme"
//               fill
//               className="object-left object-contain hidden dark:block"
//               priority
//             />
//           </div>
//         </Link>
//       </div>

//       {/* Desktop Navigation */}
//       <div className="hidden md:flex items-center space-x-6">
//         <ThemeToggle />
//         <SignedIn>
//           <UserMenu afterSignOutUrl="/" />
//         </SignedIn>
//       </div>

//       {/* Mobile Menu Button */}
//       <button
//         className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
//         onClick={toggleSidebar}
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//         </svg>
//       </button>

//       {/* Modern Sidebar */}
//       <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-black transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-all duration-500 ease-in-out shadow-2xl border-l border-gray-200 dark:border-gray-900`}>
//         <div className="flex flex-col h-full">
//           {/* Close Button */}
//           <div className="p-6 flex justify-end">
//             <button
//               className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
//               onClick={toggleSidebar}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           {/* Sidebar Content */}
//           <nav className="flex flex-col space-y-4 px-6 py-4">
//             {/* Added UserButton in mobile sidebar */}
//             <SignedIn>
//               <div className="px-6 py-3 flex">
//               <UserMenu afterSignOutUrl="/" />
//               </div>
//             </SignedIn>
//             <a
//               href="https://github.com/sidgupt12/forgetai"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group relative px-6 py-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 flex items-center text-lg font-medium"
//             >
//               <span className="absolute left-0 w-1 h-full bg-purple-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></span>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//               </svg>
//               GitHub
//             </a>
//             <a
//               href="#sponsor"
//               className="group relative px-6 py-3 text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 flex items-center text-lg font-medium"
//             >
//               <span className="absolute left-0 w-1 h-full bg-pink-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></span>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//               </svg>
//               Sponsor
//             </a>
//             <div className="px-6 py-3">
//               <ThemeToggle />
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Overlay */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 z-40 bg-black bg-opacity-60 md:hidden transition-opacity duration-300" 
//           onClick={toggleSidebar}
//         />
//       )}
//     </header>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// import ThemeToggle from './ThemeToggle';
// import { SignedIn } from '@clerk/nextjs';
// import { UserMenu } from './usermenu';

// export default function Header() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const pathname = usePathname();
  
//   // Determine if we're on the dashboard route
//   const isDashboard = pathname.includes('/dashboard');

//   // Lock body scroll when sidebar is open
//   useEffect(() => {
//     if (isSidebarOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
    
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [isSidebarOpen]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <header className={`flex items-center justify-between py-2 px-6 ${
//       isDashboard 
//         ? 'bg-transparent dark:bg-transparent' 
//         : 'bg-white dark:bg-true-black border-b border-gray-200 dark:border-gray-800'
//       } shadow-sm relative z-100`}>
//       <div className="flex items-center w-full md:w-auto">
//         <Link href="/" className="transition-transform duration-300 hover:scale-105 mr-auto">
//           <div className="relative w-32 h-10 md:w-40 md:h-12">
//             <Image
//               src="/logo-dark.png"
//               alt="Logo for light theme"
//               fill
//               className="object-left object-contain dark:hidden"
//               priority
//             />
//             <Image
//               src="/logo-light.png"
//               alt="Logo for dark theme"
//               fill
//               className="object-left object-contain hidden dark:block"
//               priority
//             />
//           </div>
//         </Link>
//       </div>

//       {/* Desktop Navigation */}
//       <div className="hidden md:flex items-center space-x-6">
//         <ThemeToggle />
//         <SignedIn>
//           <UserMenu afterSignOutUrl="/" />
//         </SignedIn>
//       </div>

//       {/* Mobile Menu Button */}
//       <button
//           className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100/30 dark:hover:bg-gray-800/30 transition-all duration-300"
//           onClick={toggleSidebar}
//           aria-label="Open menu"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//           </svg>
//         </button>

//       {/* Modern Sidebar - Higher z-index and improved touch handling */}
//       <div 
//         className={`fixed inset-y-0 right-0 z-[9999] w-80 bg-white dark:bg-black transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-all duration-500 ease-in-out shadow-2xl border-l border-gray-200 dark:border-gray-900`}
//         style={{ touchAction: 'pan-y' }}
//       >
//         <div className="flex flex-col h-full">
//           {/* Close Button */}
//           <div className="p-6 flex justify-end">
//           <button
//             className="w-12 h-12 rounded-full bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100/30 dark:hover:bg-gray-800/30 transition-all duration-300 flex items-center justify-center"
//             onClick={toggleSidebar}
//             aria-label="Close menu"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//           </div>

//           {/* Sidebar Content */}
//           <nav className="flex flex-col space-y-4 px-6 py-4">
//             {/* Added UserButton in mobile sidebar */}
//             <SignedIn>
//               <div className="px-6 py-3 flex">
//                 <UserMenu afterSignOutUrl="/" />
//               </div>
//             </SignedIn>
//             <a
//               href="https://github.com/sidgupt12/forgetai"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group relative px-6 py-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 flex items-center text-lg font-medium"
//             >
//               <span className="absolute left-0 w-1 h-full bg-purple-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></span>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//               </svg>
//               GitHub
//             </a>
//             <a
//               href="#sponsor"
//               className="group relative px-6 py-3 text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 flex items-center text-lg font-medium"
//             >
//               <span className="absolute left-0 w-1 h-full bg-pink-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></span>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//               </svg>
//               Sponsor
//             </a>
//             <div className="px-6 py-3">
//               <ThemeToggle />
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Improved Overlay with higher z-index and proper touch handling */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 z-[9998] bg-black bg-opacity-60 md:hidden transition-opacity duration-300" 
//           onClick={toggleSidebar}
//           style={{ touchAction: 'none' }}
//           aria-hidden="true"
//         />
//       )}
//     </header>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { SignedIn } from '@clerk/nextjs';
import { UserMenu } from './usermenu';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  
  // Determine if we're on the dashboard route
  const isDashboard = pathname.includes('/dashboard');

  // Enhanced body scroll locking for iOS compatibility
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPosition = window.getComputedStyle(document.body).position;
    const originalWidth = window.getComputedStyle(document.body).width;
    const originalHeight = window.getComputedStyle(document.body).height;
    const originalTop = window.getComputedStyle(document.body).top;
    
    if (isSidebarOpen) {
      // Save scroll position
      const scrollY = window.scrollY;
      
      // Apply fixed positioning to prevent scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.height = '100%';
    } else {
      // Restore scrolling and position
      const scrollY = document.body.style.top;
      document.body.style.overflow = originalStyle;
      document.body.style.position = originalPosition;
      document.body.style.width = originalWidth;
      document.body.style.height = originalHeight;
      document.body.style.top = originalTop;
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    
    return () => {
      // Cleanup function
      document.body.style.overflow = originalStyle;
      document.body.style.position = originalPosition;
      document.body.style.width = originalWidth;
      document.body.style.height = originalHeight;
      document.body.style.top = originalTop;
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className={`flex items-center justify-between py-2 px-6 ${
      isDashboard 
        ? 'bg-transparent dark:bg-transparent' 
        : 'bg-white dark:bg-true-black border-b border-gray-200 dark:border-gray-800'
      } shadow-sm relative z-[100]`}>
      <div className="flex items-center w-full md:w-auto">
        <Link href="/" className="transition-transform duration-300 hover:scale-105 mr-auto">
          <div className="relative w-32 h-10 md:w-40 md:h-12">
            <Image
              src="/logo-dark.png"
              alt="Logo for light theme"
              fill
              className="object-left object-contain dark:hidden"
              priority
            />
            <Image
              src="/logo-light.png"
              alt="Logo for dark theme"
              fill
              className="object-left object-contain hidden dark:block"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <ThemeToggle />
        <SignedIn>
          <UserMenu afterSignOutUrl="/" />
        </SignedIn>
      </div>

      {/* Mobile Menu Button with improved touch target */}
      <button
        className="md:hidden flex items-center justify-center w-12 h-12 -mr-2 rounded-full bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100/30 dark:hover:bg-gray-800/30 transition-all duration-300"
        onClick={toggleSidebar}
        aria-label="Open menu"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Modern Sidebar with improved iOS touch handling */}
      <div 
        className={`fixed inset-y-0 right-0 z-[9999] w-80 bg-white dark:bg-black transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-all duration-500 ease-in-out shadow-2xl border-l border-gray-200 dark:border-gray-900`}
        style={{ touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex flex-col h-full">
          {/* Close Button with larger touch target */}
          <div className="p-4 flex justify-end">
            <button
              className="w-14 h-14 rounded-full bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100/30 dark:hover:bg-gray-800/30 transition-all duration-300 flex items-center justify-center"
              onClick={toggleSidebar}
              aria-label="Close menu"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sidebar Content */}
          <nav className="flex flex-col space-y-4 px-6 py-4 overflow-y-auto">
            {/* Added UserButton in mobile sidebar */}
            <SignedIn>
              <div className="px-6 py-3 flex items-center">
                <UserMenu afterSignOutUrl="/" />
                <span className="ml-3 text-gray-700 dark:text-gray-200 text-lg font-medium">Account</span>
              </div>
            </SignedIn>
            <a
              href="https://github.com/sidgupt12/forgetai"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-4 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 flex items-center text-lg font-medium"
            >
              <span className="absolute left-0 w-1 h-full bg-purple-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a
              href="#sponsor"
              className="group relative px-6 py-4 text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 flex items-center text-lg font-medium"
            >
              <span className="absolute left-0 w-1 h-full bg-pink-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Sponsor
            </a>
            <div className="px-6 py-4">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>

      {/* Improved Overlay with better touch handling for iOS */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-[9998] bg-black bg-opacity-60 md:hidden transition-opacity duration-300" 
          onClick={toggleSidebar}
          style={{ 
            touchAction: 'none',
            WebkitTapHighlightColor: 'transparent',
            cursor: 'pointer'
          }}
          aria-hidden="true"
        />
      )}
    </header>
  );
}