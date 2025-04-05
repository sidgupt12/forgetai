// // 'use client';

// // import { useState } from 'react';
// // import { useAuth } from '@clerk/nextjs';
// // import axios from 'axios';

// // export default function TestInterface() {
// //   const { getToken, userId } = useAuth();
// //   const [saveData, setSaveData] = useState({ selected_type: '', text: '' });
// //   const [tweetData, setTweetData] = useState({ tweetUrl: '' });
// //   const [pdfFile, setPdfFile] = useState(null); // New state for PDF file
// //   const [queryData, setQueryData] = useState({ text: '', sessionId: '' });
// //   const [saveResponse, setSaveResponse] = useState(null);
// //   const [tweetSaveResponse, setTweetSaveResponse] = useState(null);
// //   const [pdfSaveResponse, setPdfSaveResponse] = useState(null); // New state for PDF response
// //   const [queryResponse, setQueryResponse] = useState(null);

// //   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// //   const handleSave = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const token = await getToken();
// //       const response = await axios.post(
// //         `${apiUrl}/api/save`,
// //         { ...saveData, user_id: userId },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       setSaveResponse(response.data);
// //     } catch (error) {
// //       setSaveResponse({ error: error.response?.data?.error || 'Failed to save data' });
// //     }
// //   };

// //   const handleSaveTweet = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const token = await getToken();
// //       const response = await axios.post(
// //         `${apiUrl}/api/save-tweet`,
// //         { tweetUrl: tweetData.tweetUrl },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       setTweetSaveResponse(response.data);
// //     } catch (error) {
// //       setTweetSaveResponse({ error: error.response?.data?.error || 'Failed to save tweet' });
// //     }
// //   };

// //   const handleSavePdf = async (e) => {
// //     e.preventDefault();
// //     if (!pdfFile) {
// //       setPdfSaveResponse({ error: 'No PDF file selected' });
// //       return;
// //     }

// //     try {
// //       const token = await getToken();
// //       const formData = new FormData();
// //       formData.append('pdf', pdfFile); // Match the key expected by the backend

// //       const response = await axios.post(
// //         `${apiUrl}/api/save-pdf`,
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'multipart/form-data', // Required for file uploads
// //           },
// //         }
// //       );
// //       setPdfSaveResponse(response.data);
// //     } catch (error) {
// //       setPdfSaveResponse({ error: error.response?.data?.error || 'Failed to save PDF' });
// //     }
// //   };

// //   const handleQuery = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const token = await getToken();
// //       const response = await axios.post(
// //         `${apiUrl}/api/query`,
// //         { ...queryData, userId },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       setQueryResponse(response.data);
// //     } catch (error) {
// //       setQueryResponse({ error: error.response?.data?.error || 'Failed to query data' });
// //     }
// //   };

// //   return (
// //     <div className="test-interface">
// //       <section>
// //         <h2>Save Data</h2>
// //         <form onSubmit={handleSave}>
// //           <div>
// //             <label>Type:</label>
// //             <input
// //               type="text"
// //               value={saveData.selected_type}
// //               onChange={(e) => setSaveData({ ...saveData, selected_type: e.target.value })}
// //             />
// //           </div>
// //           <div>
// //             <label>Text:</label>
// //             <textarea
// //               value={saveData.text}
// //               onChange={(e) => setSaveData({ ...saveData, text: e.target.value })}
// //             />
// //           </div>
// //           <button type="submit">Save</button>
// //         </form>
// //         {saveResponse && (
// //           <pre>{JSON.stringify(saveResponse, null, 2)}</pre>
// //         )}
// //       </section>

// //       <section>
// //         <h2>Save Tweet</h2>
// //         <form onSubmit={handleSaveTweet}>
// //           <div>
// //             <label>Tweet URL:</label>
// //             <input
// //               type="text"
// //               value={tweetData.tweetUrl}
// //               onChange={(e) => setTweetData({ ...tweetData, tweetUrl: e.target.value })}
// //               placeholder="e.g., https://x.com/username/status/123456789"
// //             />
// //           </div>
// //           <button type="submit">Save Tweet</button>
// //         </form>
// //         {tweetSaveResponse && (
// //           <pre>{JSON.stringify(tweetSaveResponse, null, 2)}</pre>
// //         )}
// //       </section>

// //       <section>
// //         <h2>Save PDF</h2>
// //         <form onSubmit={handleSavePdf}>
// //           <div>
// //             <label>Upload PDF:</label>
// //             <input
// //               type="file"
// //               accept="application/pdf"
// //               onChange={(e) => setPdfFile(e.target.files[0])} // Set the selected file
// //             />
// //           </div>
// //           <button type="submit">Save PDF</button>
// //         </form>
// //         {pdfSaveResponse && (
// //           <pre>{JSON.stringify(pdfSaveResponse, null, 2)}</pre>
// //         )}
// //       </section>

// //       <section>
// //         <h2>Query Data</h2>
// //         <form onSubmit={handleQuery}>
// //           <div>
// //             <label>Query Text:</label>
// //             <textarea
// //               value={queryData.text}
// //               onChange={(e) => setQueryData({ ...queryData, text: e.target.value })}
// //             />
// //           </div>
// //           <div>
// //             <label>Session ID (optional):</label>
// //             <input
// //               type="text"
// //               value={queryData.sessionId}
// //               onChange={(e) => setQueryData({ ...queryData, sessionId: e.target.value })}
// //             />
// //           </div>
// //           <button type="submit">Query</button>
// //         </form>
// //         {queryResponse && (
// //           <pre>{JSON.stringify(queryResponse, null, 2)}</pre>
// //         )}
// //       </section>
// //     </div>
// //   );
// // }

// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { useAuth } from '@clerk/nextjs';
// import axios from 'axios';
// import Image from 'next/image';
// import { 
//   Send, 
//   FileUp, 
//   Twitter, 
//   Plus, 
//   FileText, 
//   Search, 
//   Loader2, 
//   X, 
//   ChevronRight 
// } from 'lucide-react';
// import Header from '../../components/Header';

// export default function Dashboard() {
//   const { getToken, userId, user } = useAuth();
//   const [messages, setMessages] = useState([
//     { role: 'system', content: 'Hi there! I\'m your personal memory assistant. What would you like to know?' }
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeUploadType, setActiveUploadType] = useState(null);
//   const [uploadData, setUploadData] = useState({
//     text: '',
//     tweetUrl: '',
//     pdfFile: null
//   });
//   const [showAddOptions, setShowAddOptions] = useState(false);
//   const messagesEndRef = useRef(null);
//   const fileInputRef = useRef(null);

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.forgetai.com';

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const handleQuery = async (queryText) => {
//     if (!queryText.trim()) return;
    
//     setIsLoading(true);
//     setMessages(prev => [...prev, { role: 'user', content: queryText }]);
    
//     try {
//       const token = await getToken();
//       const response = await axios.post(
//         `${apiUrl}/api/query`,
//         { 
//           text: queryText, 
//           userId,
//           sessionId: '' 
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
      
//       const aiResponse = response.data.response || response.data.message || JSON.stringify(response.data);
//       setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || 'Sorry, I encountered an error processing your query.';
//       setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
//     } finally {
//       setIsLoading(false);
//       setInputText('');
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleQuery(inputText);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type === 'application/pdf') {
//       setUploadData(prev => ({ ...prev, pdfFile: file }));
//     }
//   };

//   const handleUpload = async (type) => {
//     setIsLoading(true);
//     try {
//       const token = await getToken();
//       let response;
//       let successMessage;

//       switch (type) {
//         case 'thought':
//           response = await axios.post(
//             `${apiUrl}/api/save`,
//             { 
//               selected_type: 'note', 
//               text: uploadData.text, 
//               user_id: userId 
//             },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           successMessage = `Thought saved successfully!`;
//           break;
          
//         case 'tweet':
//           response = await axios.post(
//             `${apiUrl}/api/save-tweet`,
//             { tweetUrl: uploadData.tweetUrl },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           successMessage = `Tweet saved successfully!`;
//           break;
          
//         case 'pdf':
//           if (!uploadData.pdfFile) {
//             throw new Error('No PDF file selected');
//           }
//           const formData = new FormData();
//           formData.append('pdf', uploadData.pdfFile);
          
//           response = await axios.post(
//             `${apiUrl}/api/save-pdf`,
//             formData,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'multipart/form-data',
//               },
//             }
//           );
//           successMessage = `PDF "${uploadData.pdfFile.name}" uploaded successfully!`;
//           break;
          
//         default:
//           throw new Error('Invalid upload type');
//       }
      
//       // Reset form and show success message
//       setUploadData({ text: '', tweetUrl: '', pdfFile: null });
//       setActiveUploadType(null);
//       setMessages(prev => [...prev, 
//         { role: 'system', content: successMessage },
//         { role: 'assistant', content: 'Your content is now safely stored in your memory bank. You can ask me about it anytime!' }
//       ]);
      
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || error.message || 'Failed to upload content';
//       setMessages(prev => [...prev, { role: 'system', content: `Error: ${errorMessage}` }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//       {/* Include your Header component */}
//       <Header />
      
//       {/* Main Dashboard */}
//       <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 py-6 md:py-8">
//         {/* Chat Section */}
//         <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
//           <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
//             <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
//               <span className="flex space-x-2 items-center">
//                 <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full p-1">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
//                   </svg>
//                 </span>
//                 <span>Chat with ForgetAI</span>
//               </span>
//             </h2>
//           </div>
          
//           {/* Chat Messages */}
//           <div className="p-6 max-h-[350px] overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-900">
//             {messages.map((message, index) => (
//               <div 
//                 key={index} 
//                 className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div 
//                   className={`max-w-[85%] rounded-2xl px-5 py-3 ${
//                     message.role === 'user' 
//                       ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
//                       : message.role === 'system'
//                         ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white' 
//                         : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
//                   }`}
//                 >
//                   <p className="whitespace-pre-wrap">{message.content}</p>
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div className="flex justify-start">
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 flex items-center space-x-2 border border-gray-200 dark:border-gray-700">
//                   <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
//                   <p className="text-gray-600 dark:text-gray-400">Thinking...</p>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>
          
//           {/* Chat Input */}
//           <div className="px-6 py-4 bg-white dark:bg-gray-800">
//             <form onSubmit={handleSubmit} className="flex space-x-2">
//               <div className="flex-1 relative">
//                 <input
//                   type="text"
//                   value={inputText}
//                   onChange={(e) => setInputText(e.target.value)}
//                   placeholder="Ask anything about your saved content..."
//                   className="w-full h-12 px-5 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   disabled={isLoading}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={isLoading || !inputText.trim()}
//                 className="h-12 px-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="h-5 w-5 animate-spin" />
//                     <span>Processing</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Ask</span>
//                     <Send className="h-5 w-5" />
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </section>
        
//         {/* Add Content Section */}
//         <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//           <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
//             <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
//               <span className="flex space-x-2 items-center">
//                 <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full p-1">
//                   <Plus className="h-5 w-5" />
//                 </span>
//                 <span>Add to Memory</span>
//               </span>
//             </h2>
//             <div className="flex space-x-1">
//               {activeUploadType && (
//                 <button 
//                   onClick={() => setActiveUploadType(null)}
//                   className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               )}
//             </div>
//           </div>
          
//           {/* Add Options Buttons */}
//           {!activeUploadType && (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
//               <button
//                 onClick={() => setActiveUploadType('thought')}
//                 className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all duration-200"
//               >
//                 <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
//                   <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                 </div>
//                 <div className="text-left">
//                   <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">Add Thought</h3>
//                   <p className="text-sm text-blue-600 dark:text-blue-400">Save notes or ideas</p>
//                 </div>
//               </button>
              
//               <button
//                 onClick={() => setActiveUploadType('tweet')}
//                 className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 hover:shadow-md transition-all duration-200"
//               >
//                 <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
//                   <Twitter className="h-6 w-6 text-purple-600 dark:text-purple-400" />
//                 </div>
//                 <div className="text-left">
//                   <h3 className="text-lg font-medium text-purple-800 dark:text-purple-300">Save Tweet</h3>
//                   <p className="text-sm text-purple-600 dark:text-purple-400">Archive tweets</p>
//                 </div>
//               </button>
              
//               <button
//                 onClick={() => {
//                   setActiveUploadType('pdf');
//                   fileInputRef.current.click();
//                 }}
//                 className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 border border-orange-200 dark:border-orange-800 hover:shadow-md transition-all duration-200"
//               >
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   accept="application/pdf"
//                   onChange={handleFileUpload}
//                   className="hidden"
//                 />
//                 <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
//                   <FileUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
//                 </div>
//                 <div className="text-left">
//                   <h3 className="text-lg font-medium text-orange-800 dark:text-orange-300">Upload PDF</h3>
//                   <p className="text-sm text-orange-600 dark:text-orange-400">Store documents</p>
//                 </div>
//               </button>
//             </div>
//           )}
          
//           {/* Thought Form */}
//           {activeUploadType === 'thought' && (
//             <div className="p-6">
//               <textarea
//                 value={uploadData.text}
//                 onChange={(e) => setUploadData(prev => ({ ...prev, text: e.target.value }))}
//                 placeholder="Enter your thought or note here..."
//                 className="w-full h-32 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4"
//               />
//               <div className="flex justify-end">
//                 <button
//                   onClick={() => handleUpload('thought')}
//                   disabled={isLoading || !uploadData.text.trim()}
//                   className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="h-5 w-5 animate-spin" />
//                       <span>Saving...</span>
//                     </>
//                   ) : (
//                     <>
//                       <span>Save Thought</span>
//                       <ChevronRight className="h-5 w-5" />
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}
          
//           {/* Tweet Form */}
//           {activeUploadType === 'tweet' && (
//             <div className="p-6">
//               <input
//                 type="text"
//                 value={uploadData.tweetUrl}
//                 onChange={(e) => setUploadData(prev => ({ ...prev, tweetUrl: e.target.value }))}
//                 placeholder="Paste tweet URL here (e.g., https://twitter.com/username/status/123456789)"
//                 className="w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
//               />
//               <div className="flex justify-end">
//                 <button
//                   onClick={() => handleUpload('tweet')}
//                   disabled={isLoading || !uploadData.tweetUrl.trim()}
//                   className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="h-5 w-5 animate-spin" />
//                       <span>Saving...</span>
//                     </>
//                   ) : (
//                     <>
//                       <span>Save Tweet</span>
//                       <ChevronRight className="h-5 w-5" />
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}
          
//           {/* PDF Upload Form */}
//           {activeUploadType === 'pdf' && (
//             <div className="p-6">
//               <div className="border-2 border-dashed border-orange-300 dark:border-orange-700 rounded-lg p-6 text-center mb-4">
//                 {uploadData.pdfFile ? (
//                   <div className="flex flex-col items-center space-y-2">
//                     <FileText className="h-10 w-10 text-orange-500" />
//                     <p className="text-gray-800 dark:text-gray-200 font-medium">{uploadData.pdfFile.name}</p>
//                     <p className="text-gray-500 dark:text-gray-400 text-sm">
//                       {(uploadData.pdfFile.size / 1024 / 1024).toFixed(2)} MB
//                     </p>
//                     <button
//                       onClick={() => {
//                         setUploadData(prev => ({ ...prev, pdfFile: null }));
//                         fileInputRef.current.value = null;
//                       }}
//                       className="text-orange-500 hover:text-orange-600 text-sm"
//                     >
//                       Change file
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center space-y-2">
//                     <FileUp className="h-12 w-12 text-orange-400 dark:text-orange-500 mb-2" />
//                     <p className="text-gray-700 dark:text-gray-300 font-medium">Drag & drop your PDF here</p>
//                     <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">or</p>
//                     <button
//                       onClick={() => fileInputRef.current.click()}
//                       className="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800"
//                     >
//                       Browse files
//                     </button>
//                   </div>
//                 )}
//               </div>
              
//               <div className="flex justify-end">
//                 <button
//                   onClick={() => handleUpload('pdf')}
//                   disabled={isLoading || !uploadData.pdfFile}
//                   className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="h-5 w-5 animate-spin" />
//                       <span>Uploading...</span>
//                     </>
//                   ) : (
//                     <>
//                       <span>Upload PDF</span>
//                       <ChevronRight className="h-5 w-5" />
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// }

import React from 'react'

export default function dashboard() {
  return (
    <div>dashboard</div>
  )
}
