'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { dataApi } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import useApi from '@/lib/hooks/useApi';
import { cn } from '@/lib/utils';

export default function DataGrid() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const { userId } = useAuth();
  const MAX_ITEMS = 20; // Show top 20 items

  // Initialize API
  useApi();

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await dataApi.fetchUserData();
        if (response.items) {
          // Sort by creation date (newest first) and limit to 20 items
          const sortedItems = response.items.sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
          ).slice(0, MAX_ITEMS);
          
          setUserData(sortedItems);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Delete an item
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }
    
    try {
      setDeletingId(id);
      // Close popup immediately
      setIsPopupOpen(false);
      setSelectedItem(null);
      
      await dataApi.deleteData(id);
      // Update local state after deletion
      setUserData(userData.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setDeletingId(null);
    }
  };

  // Open popup with item details
  const openPopup = (item) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  // Get icon based on data type
  const getIcon = (type) => {
    switch (type) {
      case 'note':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'pdf':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 3v4a1 1 0 0 0 1 1h4M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'tweet':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  // Get appropriate color for each data type
  const getCardColor = (type) => {
    switch (type) {
      case 'note': return 'bg-emerald-100 dark:bg-emerald-900/30';
      case 'pdf': return 'bg-amber-100 dark:bg-amber-900/30';
      case 'tweet': return 'bg-blue-100 dark:bg-blue-900/30';
      default: return 'bg-gray-100 dark:bg-gray-800/50';
    }
  };
  
  // Get popup accent color
  const getPopupAccentColor = (type) => {
    switch (type) {
      case 'note': return 'from-emerald-500 to-teal-500';
      case 'pdf': return 'from-amber-500 to-orange-500';
      case 'tweet': return 'from-blue-500 to-indigo-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };
  
  // Get span size based on content and index for bento grid
  const getCardSpan = (item, index) => {
    const textLength = item.data_value?.length || 0;
    
    // Create some variety based on index and content length
    if (index % 7 === 0 || textLength > 300) {
      return 'sm:col-span-2 sm:row-span-2'; // Large card
    } else if (index % 5 === 0 || textLength > 200) {
      return 'sm:col-span-2'; // Wide card
    } else if (index % 3 === 0) {
      return 'sm:row-span-2'; // Tall card
    }
    return ''; // Standard card
  };

  // Truncate text for card display
  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (userData.length === 0) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <div className="text-center p-6 bg-white/80 dark:bg-neutral-800/60 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 rounded-2xl">
          <h3 className="text-lg font-medium mb-2">No data found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            You haven't added any content to Forget AI yet. Click the + button to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mt-8 w-full max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Your Memory Vault</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Showing your last {Math.min(MAX_ITEMS, userData.length)} saved items
        </p>
      </div>
      
      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 auto-rows-auto gap-4 p-4 w-full max-w-6xl mx-auto">
        {userData.map((item, index) => (
          <motion.div
            key={item.id}
            className={cn(
              "relative rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800 overflow-hidden cursor-pointer",
              getCardColor(item.data_type),
              getCardSpan(item, index)
            )}
            onClick={() => openPopup(item)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-80 pointer-events-none" />
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-gray-700 dark:text-gray-300">
                  {getIcon(item.data_type)}
                </span>
                <span className="capitalize">{item.data_type}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(item.created_at)}
              </span>
            </div>
            
            <div className="h-full overflow-hidden" style={{ 
              maxHeight: index % 7 === 0 ? '16rem' : 
                         index % 3 === 0 ? '12rem' : 
                         '8rem' 
            }}>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {truncateText(item.data_value, 
                  index % 7 === 0 ? 350 : 
                  index % 3 === 0 ? 250 : 
                  150
                )}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stylized Detail Popup */}
      {isPopupOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden" onClick={() => setIsPopupOpen(false)}>
          <motion.div 
            className="relative max-w-2xl w-full bg-white/90 dark:bg-neutral-900/90 rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.1)] backdrop-blur-xl border border-white/20 dark:border-neutral-800/30"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Animated Background Accent */}
            <div className={`absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r ${getPopupAccentColor(selectedItem.data_type)}`}></div>
            
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            {/* Magic UI Box Reveal Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-neutral-800/10 to-transparent opacity-0 hover:opacity-100 pointer-events-none transition-all duration-1500 transform translate-x-[-100%] hover:translate-x-[100%]" />
            
            <div className="flex justify-between items-center p-6 border-b border-neutral-200 dark:border-neutral-800/50">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  getCardColor(selectedItem.data_type)
                )}>
                  <span className="text-gray-700 dark:text-gray-300">
                    {getIcon(selectedItem.data_type)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold capitalize tracking-tight" style={{
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}>{selectedItem.data_type}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">
                    Created on {formatDate(selectedItem.created_at)}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  onClick={() => setIsPopupOpen(false)}
                  aria-label="Close"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-50/80 dark:bg-black/20 p-4 rounded-lg max-h-[60vh] overflow-y-auto backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-800/30">
                <pre className="text-sm whitespace-pre-wrap font-mono text-gray-700 dark:text-gray-300">
                  {selectedItem.data_value}
                </pre>
              </div>
            </div>
            
            <div className="p-6 pt-2 flex justify-end">
              {/* Stylized Delete Button */}
              <button
                onClick={() => handleDelete(selectedItem.id)}
                className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-red-500 rounded-full shadow-md"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500 group-hover:translate-x-0 ease">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-red-500 transition-all duration-300 transform group-hover:translate-x-full ease">Delete Item</span>
                <span className="relative invisible">Delete Item</span>
              </button>
            </div>
            
            {/* Floating particles animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 8 + 4 + 'px',
                    height: Math.random() * 8 + 4 + 'px',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    opacity: Math.random() * 0.3,
                    background: `linear-gradient(to right, ${selectedItem.data_type === 'note' ? '#10B981' : selectedItem.data_type === 'pdf' ? '#F59E0B' : '#3B82F6'}, transparent)`,
                    animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                    animationDelay: Math.random() * 5 + 's'
                  }}
                />
              ))}
              <style jsx>{`
                @keyframes float {
                  0% { transform: translateY(0) rotate(0deg); }
                  100% { transform: translateY(-100vh) rotate(360deg); }
                }
              `}</style>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Loading Indicator */}
      <AnimatePresence>
        {deletingId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-zinc-700 flex items-center space-x-3"
          >
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Deleting item...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}