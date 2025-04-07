// 'use client';

// import { useState, useEffect } from 'react';
// import Header from './Header';
// import Hero from './Hero';
// import Features from './Features';
// import Footer from './Footer';

// export default function ClientPage() {
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-grow">
//         <Hero />
//         <Features />
//       </main>
//       <Footer />
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Footer from './Footer';

export default function ClientPage() {
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Pass sidebar state to Header to maintain a single source of truth
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  useEffect(() => {
    setMounted(true);
    
    // Handle body scroll locking from ClientPage to ensure it works
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
      // This helps with iOS Safari issues
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isSidebarOpen]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Pass sidebar state to Header component */}
      <Header 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      
      {/* Mobile overlay that ensures touches work properly */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-[9998] bg-black bg-opacity-60 md:hidden transition-opacity duration-300" 
          onClick={toggleSidebar}
          style={{ touchAction: 'none' }}
          aria-hidden="true"
        />
      )}
      
      <main className={`flex-grow ${isSidebarOpen ? 'pointer-events-none' : ''}`}>
        <Hero />
        <Features />
      </main>
      <Footer className={isSidebarOpen ? 'pointer-events-none' : ''} />
    </div>
  );
}