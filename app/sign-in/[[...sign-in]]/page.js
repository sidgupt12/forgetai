import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side - Sign In Component */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">
          <SignIn 
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-xl border border-gray-200 dark:border-gray-800"
              }
            }}
          />
        </div>
      </div>
      
      {/* Right side - ForgetAI Info - Even more subtle gradient */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="flex flex-col justify-center p-12 space-y-8">
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center">
              <span className="inline-flex">
                <span className="text-red-100">F</span>
                <span className="text-orange-100">o</span>
                <span className="text-yellow-100">r</span>
                <span className="text-green-100">g</span>
                <span className="text-blue-100">e</span>
                <span className="text-purple-100">t</span>
              </span>
              <span className="ml-2 text-white">AI</span>
            </h1>
          </div>
          
          <p className="text-lg md:text-xl opacity-80 leading-relaxed">
            Your ultimate second brain designed to never forget what matters to you.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-white bg-opacity-5 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl">Smart Documents</h3>
                <p className="opacity-70">Effortlessly save your notes, tweets, and PDFs.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-white bg-opacity-5 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl">AI-Powered Organization</h3>
                <p className="opacity-70">Let AI keep everything organized and retrievable.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-white bg-opacity-5 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl">Instant Recall</h3>
                <p className="opacity-70">Find anything in seconds with powerful search capabilities.</p>
              </div>
            </div>
          </div>
          
          <div className="pt-6">
            <div className="relative h-20 w-full max-w-xs">
              <div className="absolute top-0 left-0 w-full h-full flex space-x-2">
                <div className="bg-white bg-opacity-5 rounded-xl p-4 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                  <span className="text-sm text-white font-semibold">💭 Notes</span>
                </div>
                <div className="bg-white bg-opacity-5 rounded-xl p-4 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                  <span className="text-sm text-white font-semibold">📄 PDFs</span>
                </div>
                <div className="bg-white bg-opacity-5 rounded-xl p-4 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                  <span className="text-sm text-white font-semibold">🐦 Tweets</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}