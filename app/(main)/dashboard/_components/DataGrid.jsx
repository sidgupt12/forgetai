'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { dataApi } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import useApi from '@/lib/hooks/useApi';
import { cn } from '@/lib/utils';

// Custom Delete Confirmation Modal
function DeleteConfirmModal({ open, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center">
        <svg className="w-10 h-10 text-red-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        <h3 className="text-lg font-bold mb-2 text-center">Delete Memory?</h3>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">Are you sure you want to delete this memory? This action cannot be undone.</p>
        <div className="flex gap-2 w-full">
          <button onClick={onCancel} className="flex-1 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-zinc-700 transition">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function DataGrid() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ success: false, message: '' });
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
  const handleDelete = (id) => {
    setPendingDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      setDeletingId(pendingDeleteId);
      setIsPopupOpen(false);
      setSelectedItem(null);
      await dataApi.deleteData(pendingDeleteId);
      setUserData(userData.filter(item => item.id !== pendingDeleteId));
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
      setPendingDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPendingDeleteId(null);
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
      case 'note': return 'bg-gradient-to-br from-emerald-300/80 to-emerald-100/60 dark:from-emerald-700/60 dark:to-emerald-500/40 border-emerald-400/50 dark:border-emerald-600/50 shadow-lg dark:shadow-emerald-900/30';
      case 'pdf': return 'bg-gradient-to-br from-amber-300/80 to-yellow-100/60 dark:from-amber-700/60 dark:to-yellow-500/40 border-amber-400/50 dark:border-amber-600/50 shadow-lg dark:shadow-amber-900/30';
      case 'tweet': return 'bg-gradient-to-br from-blue-300/80 to-cyan-100/60 dark:from-blue-700/60 dark:to-cyan-500/40 border-blue-400/50 dark:border-blue-600/50 shadow-lg dark:shadow-blue-900/30';
      default: return 'bg-gradient-to-br from-gray-300/80 to-gray-100/60 dark:from-gray-700/60 dark:to-gray-500/40 border-gray-200/50 dark:border-gray-700/50 shadow-lg dark:shadow-black/30';
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
              "relative rounded-2xl p-5 border overflow-hidden cursor-pointer transition-all duration-300",
              getCardColor(item.data_type),
              getCardSpan(item, index),
              "hover:scale-[1.025] hover:shadow-2xl hover:z-10 dark:hover:shadow-lg dark:hover:shadow-emerald-500/20"
            )}
            onClick={() => openPopup(item)}
            whileHover={{ scale: 1.03 }}
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-hidden" onClick={() => setIsPopupOpen(false)}>
          <motion.div 
            className="relative w-full max-w-[95vw] md:max-w-lg max-h-[90vh] overflow-hidden bg-white dark:bg-zinc-900 shadow-xl rounded-2xl flex flex-col p-0"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button 
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-2 right-2 p-1 rounded-full bg-white/50 dark:bg-zinc-800/50 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/80 dark:hover:bg-zinc-700/80 transition"
              aria-label="Close popup"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="flex items-center gap-3 px-6 pt-6 pb-2 border-b border-gray-100 dark:border-zinc-800">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                getCardColor(selectedItem.data_type)
              )}>
                <span className="text-gray-700 dark:text-gray-300">
                  {getIcon(selectedItem.data_type)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold capitalize tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{selectedItem.data_type}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                  Created on {formatDate(selectedItem.created_at)}
                </span>
              </div>
            </div>
            {/* If PDF, show Open PDF button */}
            {selectedItem.data_type === 'pdf' && selectedItem.file_url && (
              <div className="flex justify-end px-6 pt-2">
                <a
                  href={selectedItem.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white font-semibold text-sm shadow hover:bg-emerald-700 transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  Open PDF
                </a>
              </div>
            )}

            <div className="px-6 py-8">
              <div className="bg-gray-50 dark:bg-zinc-800 p-5 rounded-xl max-h-[50vh] overflow-y-auto border border-gray-100 dark:border-zinc-800">
                <div className="text-base whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-100">
                  {renderContentWithLinks(selectedItem.data_value)}
                </div>
              </div>
            </div>
            <div className="flex justify-end px-6 pb-6">
              <button
                onClick={() => handleDelete(selectedItem.id)}
                className="inline-flex items-center gap-1 px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold text-sm shadow transition-all"
                aria-label="Delete Memory"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Delete
              </button>
            </div>
            
          </motion.div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      <DeleteConfirmModal open={showDeleteModal} onCancel={cancelDelete} onConfirm={confirmDelete} />
      {/* Modern Success Popup for Memory Creation */}
      <AnimatePresence>
        {deletingId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl px-6 py-4 border border-gray-100 dark:border-zinc-800 flex items-center gap-3"
          >
            <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            <span className="text-base text-gray-700 dark:text-gray-200">Deleting memory...</span>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {saveStatus && saveStatus.success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
          >
            <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl px-10 py-8 flex flex-col items-center border border-gray-100 dark:border-zinc-800">
              <svg className="w-16 h-16 text-emerald-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l3 3 5-5" /></svg>
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Memory Added!</span>
              <span className="text-base text-gray-600 dark:text-gray-300 text-center">Your memory was saved successfully.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper to render clickable links in memory content
function renderContentWithLinks(text) {
  if (!text) return null;
  // Regex to match URLs
  const urlRegex = /(https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=%]+)|(www\.[\w\-._~:/?#[\]@!$&'()*+,;=%]+)/gi;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.match(urlRegex)) {
      const url = part.startsWith('http') ? part : `https://${part}`;
      return <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline break-all hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">{part}</a>;
    }
    return <span key={i}>{part}</span>;
  });
}