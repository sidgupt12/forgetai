'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { SignedIn, UserButton } from '@clerk/nextjs'; 
import { Github, HandHeart, Heart, Menu, X } from 'lucide-react'; // Import Lucide icons

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white dark:bg-true-black border-b border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
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
        <a
          href="https://github.com/sidgupt12/forgetai"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center shadow-sm hover:shadow-md transform hover:-translate-y-1"
        >
          <Github className="h-5 w-5 mr-2" />
          GitHub
        </a>
        <a
          href="#sponsor"
          className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center shadow-sm hover:shadow-md transform hover:-translate-y-1"
        >
          <HandHeart className="h-5 w-5 mr-2" />
          Sponsor
        </a>
        <ThemeToggle />
        {/* User Button for Logged-In Users */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Modern Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-black transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-all duration-500 ease-in-out shadow-2xl border-l border-gray-200 dark:border-gray-900`}>
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="p-6 flex justify-end">
            <button
              className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
              onClick={toggleSidebar}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Sidebar Content */}
          <nav className="flex flex-col space-y-4 px-6 py-4">
            <a
              href="https://github.com/sidgupt12/forgetai"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 flex items-center text-lg font-medium"
            >
              <span className="absolute left-0 w-1 h-full bg-purple-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></span>
              <Github className="h-6 w-6 mr-3 opacity-70 group-hover:opacity-100 transition-opacity" />
              GitHub
            </a>
            <a
              href="#sponsor"
              className="group relative px-6 py-3 text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 flex items-center text-lg font-medium"
            >
              <span className="absolute left-0 w-1 h-full bg-pink-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></span>
              <Heart className="h-6 w-6 mr-3 opacity-70 group-hover:opacity-100 transition-opacity" />
              Sponsor
            </a>
            <div className="px-6 py-3">
              <ThemeToggle />
            </div>
            {/* User Button in Sidebar for Logged-In Users */}
            <SignedIn>
              <div className="px-6 py-3">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-60 md:hidden transition-opacity duration-300" 
          onClick={toggleSidebar}
        />
      )}
    </header>
  );
}