'use client';

import { useState, useEffect } from 'react';
import { VolumeOffIcon, Volume2Icon } from 'lucide-react';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const CustomSignInButton = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  
  const handleSignIn = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    } else {
      router.push('/sign-in?redirect_url=/dashboard');
    }
  };

  return (
    <button 
      onClick={handleSignIn}
      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md"
    >
      Get Started
    </button>
  );
};

export default function Hero() {
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentWord, setCurrentWord] = useState('Something');
  const [isInitial, setIsInitial] = useState(true);

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentWord('AI');
      setIsInitial(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between py-24 px-6 max-w-7xl mx-auto">
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight flex items-center">
          <span className="inline-flex">
            <span className="char-1 text-red-500">F</span>
            <span className="char-2 text-orange-500">o</span>
            <span className="char-3 text-yellow-500">r</span>
            <span className="char-4 text-green-500">g</span>
            <span className="char-5 text-blue-500">e</span>
            <span className="char-6 text-purple-500">t</span>
          </span>
          <span className="flip-container ml-2">
            <span className={`flip-word text-black dark:text-white ${isInitial ? 'animate-out' : 'animate-in'}`}>
              {currentWord}
            </span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl pr-10">
          Welcome to Forget AI, your ultimate second brain designed to never forget what matters to you.
          Effortlessly save notes, tweets, and PDFs—and let AI keep it all organized and retrievable.
        </p>

        <div className="button-container">
          <SignedOut>
            <div className="button-wrapper">
              <CustomSignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <div className="button-wrapper">
              <Link href="/dashboard">
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md">
                  Get Started
                </button>
              </Link>
            </div>
          </SignedIn>
        </div>
      </div>

      <div className="md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-xl w-50 h-80 md:h-96 flex items-center justify-center overflow-hidden shadow-lg relative">
          {videoError ? (
            <div className="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">Video Placeholder</p>
            </div>
          ) : (
            <video
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
              onError={() => setVideoError(true)}
            >
              <source src="/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <button
            onClick={toggleSound}
            className="absolute bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition"
          >
            {isMuted ? (
              <VolumeOffIcon className="h-6 w-6" />
            ) : (
              <Volume2Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}