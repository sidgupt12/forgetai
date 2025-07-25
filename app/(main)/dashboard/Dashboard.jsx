"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchInput } from "@/components/ui/searchinput";
import { FlipWords } from "@/components/ui/flip-words";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { ChevronUp, Menu, X, Moon, Sun, Sunset, Moon as MoonIcon } from "lucide-react";
import BrainPopup from './_components/popup';
import DataGrid from './_components/DataGrid';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import { useTheme } from '@/app/components/ThemeProvider';
import { UserMenu } from '@/app/components/usermenu';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [shouldRefreshGrid, setShouldRefreshGrid] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
  const displayName = user?.firstName || '';
  const heroRef = useRef(null);
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
      setShowScrollTop(window.pageYOffset > 400);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBrainSubmit = (data) => {
    console.log("Brain data submitted:", data);
    setShouldRefreshGrid(prev => !prev);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const inputValue = form.elements.namedItem('input')?.value || '';

    if (inputValue.trim()) {
      setIsChatLoading(true);
      const sessionId = uuidv4();
      const encodedQuery = encodeURIComponent(inputValue);
      router.push(`/chat/${sessionId}?q=${encodedQuery}`);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-black dark:via-gray-950 dark:to-black">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200/50 dark:bg-gray-800/50 z-[60] backdrop-blur-sm">
        <div className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Modern Header */}
      <header className="sticky top-4 z-50 w-full px-4 md:px-6">
        <div className="container mx-auto">
          <div className="bg-white/20 dark:bg-black/20 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/30 dark:border-white/10 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-black/50 ring-1 ring-white/20 dark:ring-white/5">
            <div className="flex h-14 items-center justify-between px-6">
              <div className="flex items-center space-x-3">
                <div className="relative w-7 h-7">
                  <Image src="/logo-dark.png" alt="forgetAI Logo" fill className={`transition-transform duration-300 hover:scale-110 ${theme === 'dark' ? 'hidden' : 'block'}`} />
                  <Image src="/logo-light.png" alt="forgetAI Logo" fill className={`transition-transform duration-300 hover:scale-110 ${theme === 'dark' ? 'block' : 'hidden'}`} />
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-gray-200">
                  forgetAI
                </span>
              </div>
              <div className="flex-1 flex justify-center">
                <button onClick={toggleTheme} className="hidden md:flex text-sm font-medium transition-all duration-200 cursor-pointer relative text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200 items-center justify-center w-9 h-9 rounded-full">
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm md:px-4 md:py-2 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100 transition-all min-h-0 h-8 md:h-9"
                  onClick={() => setIsPopupOpen(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="hidden md:inline h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-xs md:text-sm">Add Memory</span>
                </Button>
                <SignedOut>
                  <SignInButton mode="redirect" signInFallbackRedirectUrl="/dashboard">
                    <button className="hidden md:inline-flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200 py-2 px-4">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="hidden md:block">
                    <UserMenu afterSignOutUrl="/" />
                  </div>
                </SignedIn>
                <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {isMenuOpen && (
              <div className="md:hidden border-t border-white/30 dark:border-white/10 bg-white/20 dark:bg-black/20 backdrop-blur-[40px] backdrop-saturate-[180%] rounded-b-2xl">
                <nav className="px-6 py-4 space-y-3">
                  <SignedOut>
                    <SignInButton mode="redirect" signInFallbackRedirectUrl="/dashboard">
                      <button className="block text-sm font-medium w-full text-left transition-colors duration-200 text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200 py-2">
                        Sign In
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="block text-sm font-medium w-full text-left py-2">
                      <UserMenu afterSignOutUrl="/" />
                    </div>
                  </SignedIn>
                  <button onClick={toggleTheme} className="block text-sm font-medium w-full text-left transition-colors duration-200 text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200 py-2">
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Scroll to Top */}
      {showScrollTop && (
        <Button onClick={scrollToTop} className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-white/20 dark:bg-black/20 text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white shadow-lg dark:shadow-2xl dark:shadow-black/50 transition-all duration-300 hover:scale-110 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/30 dark:border-white/10 ring-1 ring-white/20 dark:ring-white/5" size="sm">
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative">
        {/* Dashboard Hero Section with background and badge */}
        <section ref={heroRef} className="py-16 md:py-24 relative overflow-hidden hero-section flex flex-col items-center justify-center text-center">
          {/* Soft floating background shapes */}
          <div className="absolute -top-32 -left-32 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 dark:from-emerald-600/10 dark:to-blue-600/10 rounded-full blur-3xl animate-pulse z-0" />
          <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-emerald-400/20 dark:from-purple-600/10 dark:to-emerald-600/10 rounded-full blur-3xl animate-pulse z-0" style={{ animationDelay: '1s' }} />
          {/* Badge */}
          <div className="flex justify-center mb-4 z-10 animate-on-scroll">
            <span className="inline-flex items-center bg-gray-200/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              ✨ Your Dashboard
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 mb-8 animate-on-scroll w-full z-10">
            <div className="flex items-center gap-4 justify-center">
              <div className="relative w-16 h-16 md:w-24 md:h-24 flex-shrink-0 hidden sm:block">
                <Image src="/logo-dark.png" alt="forgetAI Logo" fill className={`transition-transform duration-300 hover:scale-110 ${theme === 'dark' ? 'hidden' : 'block'}`} />
                <Image src="/logo-light.png" alt="forgetAI Logo" fill className={`transition-transform duration-300 hover:scale-110 ${theme === 'dark' ? 'block' : 'hidden'}`} />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 leading-tight animate-on-scroll m-0">
                Welcome back, <span className="bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-500 dark:to-blue-500 bg-clip-text text-transparent">{displayName}</span>
              </h1>
            </div>
            <div className="w-full flex justify-center">
              <div className="max-w-2xl w-full animate-on-scroll">
                <SearchInput
                  placeholders={["How can I help you today?", "Recall a memory...", "Find that note...", "Query your archive..."]}
                  onSubmit={handleSubmit}
                  isLoading={isChatLoading}
                />
              </div>
            </div>
          </div>
          {/* No animation styles, always visible */}
        </section>

        <div className="mt-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-slate-800 dark:text-gray-200 text-center animate-on-scroll" style={{ animationDelay: '600ms' }}>
            Recent Memories
          </h2>
          <div className="bg-white/30 dark:bg-black/30 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/40 dark:border-white/10 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-black/50 p-6 animate-on-scroll ring-1 ring-white/20 dark:ring-white/5" style={{ animationDelay: '800ms' }}>
            <DataGrid key={shouldRefreshGrid} limit={10} />
          </div>
        </div>

        {/* Floating Add Button */}
        {!isPopupOpen && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={() => setIsPopupOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full shadow-lg transition-all duration-200 font-semibold text-base
                bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Add Memory"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Memory
            </button>
          </div>
        )}
      </div>

      <BrainPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onSubmit={handleBrainSubmit} />
    </div>
  );
}

export default Dashboard;