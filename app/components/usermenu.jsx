'use client';

import { useState, useRef, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Heart, Github, ChevronDown } from 'lucide-react';

export function UserMenu({ afterSignOutUrl = '/' }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const menuRef = useRef(null);
  
  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);
  
  const handleSignOut = async () => {
    await signOut(() => {
      window.location.href = afterSignOutUrl;
    });
    setIsOpen(false);
  };
  
  if (!user) return null;
  
  // Get user data
  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const imageUrl = user.imageUrl || '';
  
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 p-1 transition-colors duration-200"
      >
        <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-transparent hover:border-green-400 transition-all duration-200">
          <img
            src={imageUrl}
            alt={`${firstName} ${lastName}`}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0D8ABC&color=fff`;
            }}
          />
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-600 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-900 shadow-lg py-2 border border-gray-200 dark:border-gray-800 z-50"
          >
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <p className="font-medium text-gray-800 dark:text-white">
                {firstName} {lastName}
              </p>
            </div>
            
            <div className="py-2">
              <a 
                href="https://github.com/sidgupt12/forgetai" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)} 
                className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Github size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                GitHub
              </a>
              
              <a 
                href="#sponsor"
                onClick={() => setIsOpen(false)} 
                className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Heart size={16} className="mr-3 text-pink-500" />
                Sponsor
              </a>
            </div>
            
            <div className="border-t border-gray-100 dark:border-gray-800 pt-2 mt-1">
              <button 
                onClick={handleSignOut}
                className="flex w-full items-center px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <LogOut size={16} className="mr-3" />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}