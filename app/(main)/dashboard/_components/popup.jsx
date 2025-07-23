"use client";

import React, { useState, useRef, useEffect } from "react";
import { IconUpload } from "@tabler/icons-react"; // Make sure IconUpload is imported
import { useDropzone } from "react-dropzone";
import { dataApi } from "@/lib/api"; // Ensure this path is correct
import { motion, AnimatePresence } from "framer-motion";

// --- Updated FileUpload Component ---
const FileUpload = ({ onChange }) => {
  const [file, setFile] = useState(null); 
  const [uploading, setUploading] = useState(false); // Placeholder for potential future upload indication
  const [error, setError] = useState(null); 

  const handleFileChange = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]; 
      setError(null); 
      setFile(selectedFile); 
      onChange(selectedFile); // Pass the single File object
    } else {
      setFile(null);
      onChange(null); 
    }
  };

  const handleRemoveFile = () => {
    setFile(null); 
    setError(null); 
    onChange(null); // Notify parent of removal
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileChange, 
    multiple: false, 
    accept: { 
      'application/pdf': ['.pdf'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    onDropRejected: (fileRejections) => {
      const firstError = fileRejections[0]?.errors[0];
      if (firstError) {
        if (firstError.code === 'file-too-large') {
          setError("File is too large (max 5MB)");
        } else if (firstError.code === 'file-invalid-type') {
          setError("Invalid file type. Please upload a PDF file.");
        } else {
          setError("File upload failed. Please try again.");
        }
      }
      setFile(null); 
      onChange(null); 
    },
    disabled: !!file || uploading, // Disable if file selected or uploading
  });

  return (
    <div className="w-full h-full flex flex-col">
      {file ? (
        // Display selected file info
        <div className="mb-2 flex items-center justify-between bg-white dark:bg-zinc-900 p-3 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm">
          <p className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1 mr-2">
            {file.name} 
          </p>
          <button
            type="button"
            onClick={handleRemoveFile} 
            className="p-1 bg-gray-100 dark:bg-zinc-700 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 dark:focus:ring-offset-zinc-900"
            aria-label="Remove file"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600 dark:text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ) : (
        // Display the dropzone area
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 ease-in-out
            ${isDragActive 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
              : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700'
            }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center pt-4 pb-4 text-center px-4">
            <IconUpload className="h-8 w-8 mb-3 text-gray-500 dark:text-gray-400" />
            {isDragActive ? (
               <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">Drop the PDF here...</p>
            ) : (
              <>
                <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF only (MAX. 5MB)</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Display error messages */}
      {error && (
        <div className="mt-2 text-sm text-red-500 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
};

// --- Main BrainPopup Component ---
export default function BrainPopup({ isOpen, onClose, onSubmit }) {
  const [activeTab, setActiveTab] = useState("note");
  const [content, setContent] = useState({
    note: "",
    document: null, // Will hold the File object or null
    integrations: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saveStatus, setSaveStatus] = useState({ success: false, message: "" });
  const dialogRef = useRef(null);
  
  // Clear error/status message when tab changes
  useEffect(() => {
    setErrorMessage("");
    setSaveStatus({ success: false, message: "" });
  }, [activeTab]);

  // Handle Escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target) && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      // Delay prevents immediate closing if opened by a click
      const timer = setTimeout(() => { 
        document.addEventListener("mousedown", handleClickOutside);
      }, 100); 
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSaveStatus({ success: false, message: "" });
    
    try {
      let result;
      
      if (activeTab === "note" && content.note) {
        result = await dataApi.saveData({
          selected_type: 'note',
          text: content.note
        });
      } 
      else if (activeTab === "document" && content.document) { // Check if document (File object) exists
        if (content.document.size > 5 * 1024 * 1024) {
          setErrorMessage("File size exceeds 5MB limit");
          setIsSubmitting(false);
          return;
        }
        result = await dataApi.savePdf(content.document); // Pass the File object directly
      } 
      else if (activeTab === "integrations" && content.integrations) {
        result = await dataApi.saveTweet(content.integrations);
      } else {
        // Should not happen due to button disabled state, but good practice
        setErrorMessage("No content selected to save.");
        setIsSubmitting(false);
        return;
      }
      
      // Display success message
      setSaveStatus({ 
        success: true, 
        message: `${activeTab === 'note' ? 'Thought' : activeTab === 'document' ? 'PDF' : 'Tweet'} saved successfully!` 
      });
      
      // Reset form state for the current tab
      setContent(prevContent => ({ 
          ...prevContent, 
          [activeTab]: activeTab === "document" ? null : "" 
      }));
      
      // Notify parent component if needed (passing original data might be complex after reset)
      if (typeof onSubmit === 'function') {
        onSubmit({ 
          type: activeTab, 
          // data: content[activeTab], // This will be reset data, might need adjustment if original data is needed post-submit
          response: result 
        });
      }
      
      // Close popup after brief delay
      setTimeout(() => {
        // Check if still mounted/open before closing, especially if success overlay has its own close
        if (isOpen) { 
            onClose();
            // Ensure status is reset when popup closes naturally after success
            setSaveStatus({ success: false, message: "" }); 
        }
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting content:', error);
      const message = error?.response?.data?.message || error?.message || "Failed to save. Please try again.";
      setErrorMessage(message);
      setSaveStatus({ success: false, message: "" }); // Ensure success status is cleared on error
    } finally {
      // Only set submitting false if not showing success (as success has its own flow)
      if (!saveStatus.success) { 
          setIsSubmitting(false);
      }
    }
  };

  // --- JSX for the Popup ---
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        ref={dialogRef}
        className="relative z-50 w-full max-w-[95vw] md:max-w-2xl max-h-[90vh] overflow-hidden bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl shadow-2xl rounded-3xl flex flex-col p-0"
        tabIndex="-1"
        style={{ pointerEvents: "auto" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-6 pt-6 pb-2 border-b border-gray-100 dark:border-zinc-800">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          <h2 className="text-lg font-bold tracking-tight">Add Memory</h2>
        </div>

        {/* Main Content Area (Tabs and Content Panes) */}
        <div className="flex-grow overflow-hidden flex flex-col md:flex-row md:gap-2 px-2 md:px-4 py-4"> 
          {/* Tabs Navigation (Left Column on md+) */}
          <div
            dir="ltr" data-orientation="horizontal"
            className="flex-shrink-0 md:w-1/4 w-full mb-4 md:mb-0"
          >
            <div
              role="tablist" aria-orientation="vertical"
              className="flex flex-row md:flex-col gap-1 md:gap-2 p-2 rounded-xl text-muted-foreground border bg-gray-50/80 dark:bg-zinc-800/80 shadow-sm overflow-x-auto md:overflow-y-auto md:h-full"
              tabIndex="0" style={{ outline: "none" }}
            >
              {/* Tab Buttons */}
              <button
                type="button" role="tab" onClick={() => setActiveTab("note")}
                aria-selected={activeTab === "note"}
                className={`whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full justify-start text-left px-4 py-2 rounded-lg border hover:bg-gray-200 dark:hover:bg-zinc-700 flex flex-col items-start gap-1 transition-all duration-200 hover:shadow-md ${
                  activeTab === "note" ? "border-emerald-500/30 bg-emerald-500/20 text-foreground shadow-md dark:text-white" : "border-transparent text-gray-600 dark:text-gray-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notebook h-5 w-5 text-emerald-500"> <path d="M2 6h4"></path><path d="M2 10h4"></path><path d="M2 14h4"></path><path d="M2 18h4"></path><rect width="16" height="20" x="4" y="2" rx="2"></rect><path d="M16 2v20"></path> </svg>
                  Thoughts
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">Add your thoughts</span>
              </button>

              <button
                type="button" role="tab" onClick={() => setActiveTab("document")}
                aria-selected={activeTab === "document"}
                className={`whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full justify-start text-left px-4 py-2 rounded-lg border hover:bg-gray-200 dark:hover:bg-zinc-700 flex flex-col items-start gap-1 transition-all duration-200 hover:shadow-md ${
                  activeTab === "document" ? "border-amber-500/30 bg-amber-500/20 text-foreground shadow-md dark:text-white" : "border-transparent text-gray-600 dark:text-gray-400"
                }`}
              >
                <div className="flex items-center gap-2">
                   <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500"> <path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/> </svg>
                  PDFs
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">Upload a PDF</span>
              </button>

              <button
                type="button" role="tab" onClick={() => setActiveTab("integrations")}
                 aria-selected={activeTab === "integrations"}
                className={`whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full justify-start text-left px-4 py-2 rounded-lg border hover:bg-gray-200 dark:hover:bg-zinc-700 flex flex-col items-start gap-1 transition-all duration-200 hover:shadow-md ${
                  activeTab === "integrations" ? "border-blue-500/30 bg-blue-500/20 text-foreground shadow-md dark:text-white" : "border-transparent text-gray-600 dark:text-gray-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#1DA1F2]"> <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path> </svg>
                  Tweet
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">Add a tweet URL</span>
              </button>
            </div>
          </div>

          {/* Content Pane (Right Column on md+) */}
          <div className="flex-grow overflow-y-auto md:w-3/4 w-full px-1 md:px-4"> {/* Adjusted width and added overflow */}
            {/* Status Message Area */}
            <AnimatePresence>
              {(errorMessage || saveStatus.success) && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className={`mb-4 p-3 rounded-lg text-sm ${errorMessage ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'}`} // Added dark mode text colors
                >
                  {errorMessage || saveStatus.message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content based on activeTab */}
            {activeTab === "note" && (
              <div data-state="active" role="tabpanel" className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <div className="flex flex-col gap-4 p-4 md:p-6 bg-gray-50 dark:bg-zinc-800 rounded-xl shadow-lg border border-emerald-500/30">
                  <label className="text-lg font-semibold text-zinc-900 dark:text-zinc-100" htmlFor="note">Thoughts</label>
                  <textarea
                    id="note" value={content.note} onChange={(e) => setContent({ ...content, note: e.target.value })}
                    placeholder="Add your thoughts to Forget AI..."
                    className="w-full h-64 p-4 rounded-lg bg-white dark:bg-zinc-900 text-gray-900 dark:text-white text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 resize-none shadow-sm"
                  />
                </div>
              </div>
            )}

            {activeTab === "document" && (
              <div data-state="active" role="tabpanel" className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                 <div className="flex flex-col gap-4 p-4 md:p-6 bg-gray-50 dark:bg-zinc-800 rounded-xl shadow-lg border border-amber-500/30">
                   <label className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Upload PDF</label>
                   {/* Use the updated FileUpload component here */}
                   <FileUpload
                     onChange={(selectedFile) => setContent({ ...content, document: selectedFile })} 
                   />
                 </div>
              </div>
            )}

            {activeTab === "integrations" && (
              <div data-state="active" role="tabpanel" className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <div className="flex flex-col gap-4 p-4 md:p-6 bg-gray-50 dark:bg-zinc-800 rounded-xl shadow-lg border border-blue-500/30">
                   <label className="text-lg font-semibold text-zinc-900 dark:text-zinc-100" htmlFor="tweet">Tweet URL</label>
                   <input
                    id="tweet" type="url" // Changed to type="url" for better semantics
                    value={content.integrations} onChange={(e) => setContent({ ...content, integrations: e.target.value })}
                    placeholder="Enter Tweet URL (e.g., https://twitter.com/user/status/123...)"
                    className="w-full p-4 rounded-lg bg-white dark:bg-zinc-900 text-gray-900 dark:text-white text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 shadow-sm"
                   />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex-shrink-0 flex flex-col gap-2 md:flex-row md:justify-end md:space-x-2 border-t border-gray-100 dark:border-zinc-800 pt-4 mt-4 px-6 pb-6">
          <button
            className="w-full md:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 h-11 px-6 py-2 shadow-sm"
            type="button" onClick={onClose} disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className={`w-full md:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 text-white shadow hover:bg-emerald-700 h-11 px-6 py-2 relative ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              (activeTab === "note" && !content.note.trim()) ||
              (activeTab === "document" && !content.document) ||
              (activeTab === "integrations" && !content.integrations.trim())
            }
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>
                Saving...
              </>
            ) : (
              "Add Memory"
            )}
          </button>
        </div>

        {/* Absolute Close Button (Top Right) */}
        <button
          type="button"
          className="absolute right-4 top-4 rounded-full p-1.5 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 opacity-80 hover:opacity-100 hover:bg-gray-200 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-1 dark:focus:ring-offset-zinc-900 transition-all" // Adjusted padding and focus ring
          onClick={onClose}
          disabled={isSubmitting && !saveStatus.success} // Disable unless showing success overlay
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" > <line x1="18" y1="6" x2="6" y2="18"></line> <line x1="6" y1="6" x2="18" y2="18"></line> </svg>
          <span className="sr-only">Close</span>
        </button>

        {/* Success Animation Overlay */}
        <AnimatePresence>
          {saveStatus.success && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center z-10" // Ensure overlay is above content but below absolute close button if needed
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-xl flex flex-col items-center relative border border-gray-200 dark:border-gray-700"
              >
                 {/* Close button for the success overlay itself */}
                 <button
                    type="button"
                    className="absolute right-2 top-2 rounded-full p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700 opacity-70 hover:opacity-100 transition-opacity"
                    onClick={() => {
                      setSaveStatus({ success: false, message: "" }); // Reset status
                      // Optionally close the main popup immediately if desired
                      // onClose(); 
                    }}
                    aria-label="Close notification"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <line x1="18" y1="6" x2="6" y2="18"></line> <line x1="6" y1="6" x2="18" y2="18"></line> </svg>
                  </button>

                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/> </svg>
                </div>
                <p className="text-lg font-medium text-green-600 dark:text-green-400">Success!</p>
                <p className="text-gray-600 dark:text-gray-300 mt-1 text-center">{saveStatus.message}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
      </motion.div>
    </div>
  );
}