"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Check,
  Shield,
  ArrowRight,
  Menu,
  X,
  Play,
  Pause,
  ChevronUp,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Moon,
  Sun,
  Loader2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useTheme } from './ThemeProvider'
import { SignedOut, SignInButton, useUser, UserButton, SignedIn } from '@clerk/nextjs'
import { UserMenu } from './usermenu'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVideoPopup, setIsVideoPopup] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("hero")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const videoRef = useRef(null)
  const videoContainerRef = useRef(null)
  const popupVideoRef = useRef(null)
  const { theme, toggleTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load GSAP-like animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    const animateElements = document.querySelectorAll(".animate-on-scroll")
    animateElements.forEach((el) => observer.observe(el))

    // Hero animation on load
    setTimeout(() => {
      if (heroRef.current) {
        heroRef.current.classList.add("hero-loaded")
      }
    }, 100)

    // Scroll progress tracking and active section detection
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.pageYOffset / totalHeight) * 100
      setScrollProgress(Math.min(progress, 100))

      // Show/hide scroll to top button
      setShowScrollTop(window.pageYOffset > 400)

      // Active section detection
      const sections = [
        { id: "hero", element: heroRef.current },
        { id: "features", element: featuresRef.current },
      ]

      const scrollPosition = window.pageYOffset + 100 // Offset for header

      let currentSection = "hero" // Default to hero

      sections.forEach((section) => {
        if (section.element) {
          const sectionTop = section.element.offsetTop
          const sectionHeight = section.element.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.id
          }
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    // Call once to set initial state
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Smooth scroll function
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId)
    if (element) {
      const headerHeight = 80 // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    // Close mobile menu if open
    setIsMenuOpen(false)
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleWatchDemo = () => {
    if (videoRef.current && videoContainerRef.current) {
      const rect = videoContainerRef.current.getBoundingClientRect()

      // Sync video time
      if (popupVideoRef.current && videoRef.current) {
        popupVideoRef.current.currentTime = videoRef.current.currentTime
        if (!videoRef.current.paused) {
          popupVideoRef.current.play()
        }
      }

      // Create smooth popup animation
      setIsVideoPopup(true)

      // Animate the transition
      setTimeout(() => {
        const popup = document.querySelector(".video-popup")
        if (popup) {
          popup.classList.add("popup-active")
        }
      }, 50)
    }
  }

  const handleClosePopup = () => {
    const popup = document.querySelector(".video-popup")
    if (popup) {
      popup.classList.remove("popup-active")

      // Sync back to original video
      if (popupVideoRef.current && videoRef.current) {
        videoRef.current.currentTime = popupVideoRef.current.currentTime
        if (!popupVideoRef.current.paused) {
          videoRef.current.play()
        } else {
          videoRef.current.pause()
        }
      }

      setTimeout(() => {
        setIsVideoPopup(false)
      }, 300)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const handleGetStarted = () => {
    setIsLoading(true)
  }

  const { isSignedIn } = useUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-black dark:via-gray-950 dark:to-black">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200/50 dark:bg-gray-800/50 z-[60] backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Modern Header */}
      <header className="sticky top-4 z-50 w-full px-4 md:px-6">
        <div className="container mx-auto">
          <div className="bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-3xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-md dark:shadow-xl dark:shadow-black/40">
            <div className="flex h-14 items-center justify-between px-6">
              <div className="flex items-center space-x-3">
                <div className="relative w-7 h-7">
                  <Image
                    src="/logo-dark.png"
                    alt="forgetAI Logo"
                    fill
                    className={`transition-transform duration-300 hover:scale-110 ${theme === 'dark' ? 'hidden' : 'block'}`}
                  />
                  <Image
                    src="/logo-light.png"
                    alt="forgetAI Logo"
                    fill
                    className={`transition-transform duration-300 hover:scale-110 ${theme === 'dark' ? 'block' : 'hidden'}`}
                  />
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-gray-200">
                  forgetAI
                </span>
              </div>

              <nav className="hidden md:flex items-center space-x-6">
                <button
                  onClick={() => smoothScrollTo("features")}
                  className={`text-sm font-medium transition-all duration-200 cursor-pointer relative ${
                    activeSection === "features"
                      ? "text-emerald-600 dark:text-emerald-500 font-semibold"
                      : "text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  Features
                  {activeSection === "features" && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 dark:from-emerald-400 dark:to-blue-400 rounded-full" />
                  )}
                </button>
                <button
                  onClick={toggleTheme}
                  className="text-sm font-medium transition-all duration-200 cursor-pointer relative text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
              </nav>

              <div className="flex items-center space-x-3">
                <SignedOut>
                  <SignInButton mode="redirect" signInFallbackRedirectUrl="/dashboard">
                    <button className="hidden md:inline-flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white py-2 px-4">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="hidden md:block">
                    <UserMenu afterSignOutUrl="/" />
                  </div>
                </SignedIn>
                <Link href={isSignedIn ? '/dashboard' : '/sign-in?redirect_url=/dashboard'} passHref onClick={handleGetStarted}>
                  <Button asChild size="sm" className="bg-slate-900 hover:bg-slate-800 dark:bg-gray-950 dark:hover:bg-gray-900 text-white transition-all duration-200 hover:scale-105" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading...
                      </span>
                    ) : (
                      <span>Get Started</span>
                    )}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden border-t border-white/20 dark:border-gray-700/50 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-3xl rounded-b-2xl">
                <nav className="px-6 py-4 space-y-3">
                  <button
                    onClick={() => smoothScrollTo("features")}
                    className={`block text-sm font-medium w-full text-left transition-colors duration-200 ${
                      activeSection === "features"
                        ? "text-emerald-600 dark:text-emerald-500 font-semibold"
                        : "text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                  >
                    Features
                    {activeSection === "features" && (
                      <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 dark:from-emerald-400 dark:to-blue-400 rounded-full mt-1" />
                    )}
                  </button>
                  <SignedOut>
                    <SignInButton mode="redirect" signInFallbackRedirectUrl="/dashboard">
                      <button className="block text-sm font-medium w-full text-left transition-colors duration-200 text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white py-2">
                        Sign In
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="block text-sm font-medium w-full text-left py-2">
                      <UserMenu afterSignOutUrl="/" />
                    </div>
                  </SignedIn>
                  <button
                    onClick={toggleTheme}
                    className="block text-sm font-medium w-full text-left transition-colors duration-200 text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white py-2"
                  >
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="py-16 md:py-24 relative overflow-hidden hero-section">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 dark:from-emerald-600/10 dark:to-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-emerald-400/20 dark:from-purple-600/10 dark:to-emerald-600/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          {/* Backed by YC Badge */}
          <div className="flex justify-center mt-[-25px] mb-4">
            <div className="inline-flex items-center bg-gray-200/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              <span>Not Backed by&nbsp;&nbsp; </span>
              <div className="w-6 h-6 mx-1 bg-[#FB651E] rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">Y</span>
              </div>
              <span>Combinator</span>
            </div>
          </div>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8 hero-content">
              <div className="space-y-6">
                <Badge variant="secondary" className="w-fit bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900">
                  ✨ Free Forever
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent dark:from-gray-100 via-gray-200 to-gray-300 leading-tight">
                  Never Forget
                  <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-500 dark:to-blue-500 bg-clip-text text-transparent pb-1" style={{ marginBottom: '-0.25em' }}>
                    Anything Again
                  </span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-gray-400 max-w-[600px] leading-relaxed">
                  Your personal AI memory assistant that helps you remember everything important. Capture thoughts,
                  organize ideas, and retrieve information instantly.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Link href={isSignedIn ? '/dashboard' : '/sign-in?redirect_url=/dashboard'} passHref onClick={handleGetStarted} className="w-full sm:w-auto">
                  <Button asChild size="lg" className="w-full sm:w-auto text-lg px-8 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-white transition-all duration-200 hover:scale-105 border-2 border-transparent dark:border-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-400" disabled={isLoading}>
                    <span>
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Loading...
                        </span>
                      ) : (
                        <>Start Using Free <ArrowRight className="ml-2 h-5 w-5" /></>
                      )}
                    </span>
                  </Button>
                </Link>
                <div className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-lg px-8 border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-950 transition-all duration-200 bg-transparent"
                    onClick={handleWatchDemo}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-8 text-sm text-slate-500 dark:text-gray-500">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Quick Setup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Privacy First</span>
                </div>
              </div>
            </div>

            <div className="relative hero-video mt-8 sm:mt-0">
              <div ref={videoContainerRef} className="relative">
                <div className="relative bg-white dark:bg-gray-950 rounded-2xl p-2 shadow-2xl border border-white/20 dark:border-gray-900/20">
                  <video
                    ref={videoRef}
                    className="w-full h-auto rounded-xl cursor-pointer"
                    loop
                    muted
                    playsInline
                    onClick={togglePlay}
                  >
                    <source src="/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Controls Overlay */}
                  <div className="absolute inset-2 rounded-xl bg-black/20 dark:bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-white/90 text-slate-900 hover:bg-white dark:bg-gray-950/90 dark:text-white dark:hover:bg-gray-950 rounded-full w-16 h-16"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating Elements - Better Icons */}
              <div className="absolute -top-6 left-2 sm:left-[-24px] w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 rounded-2xl shadow-lg flex items-center justify-center floating-element z-10" style={{ maxWidth: '64px', maxHeight: '64px' }}>
                <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <div
                className="absolute -bottom-6 right-2 sm:right-[-24px] w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl shadow-lg flex items-center justify-center floating-element z-10"
                style={{ animationDelay: "0.5s", maxWidth: '56px', maxHeight: '56px' }}
              >
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section id="features" ref={featuresRef} className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16 animate-on-scroll">
            <Badge variant="secondary" className="w-fit mx-auto bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900">
              Capabilities
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300 leading-relaxed pb-1">
              Everything you need to remember
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-[800px] mx-auto leading-relaxed">
              Powerful features designed to help you capture, organize, and recall information effortlessly.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Large Feature Card */}
            <Card className="md:col-span-2 lg:col-span-2 border border-gray-200/50 dark:border-gray-800/50 shadow-lg dark:shadow-md dark:shadow-black/30 bg-gradient-to-br from-emerald-50/80 to-blue-50/80 dark:from-black/40 dark:to-gray-950/40 backdrop-blur-md hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-500 hover:-translate-y-2 animate-on-scroll group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 dark:from-emerald-700/5 dark:to-blue-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-700 dark:to-emerald-800 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                </div>
                <CardTitle className="text-2xl text-slate-900 dark:text-gray-100 mb-2 leading-tight">Smart Capture</CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-400 text-base leading-relaxed">
                  Instantly capture thoughts, ideas, and important information with intelligent categorization and
                  automatic tagging.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="w-full h-32 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-gray-950 dark:to-blue-950 rounded-lg flex items-center justify-center">
                  <div className="flex space-x-3">
                    <div className="w-3 h-3 bg-emerald-400 dark:bg-emerald-500 rounded-full animate-pulse"></div>
                    <div
                      className="w-3 h-3 bg-blue-400 dark:bg-blue-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-purple-400 dark:bg-purple-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tall Feature Card */}
            <Card
              className="md:row-span-2 border border-gray-200/50 dark:border-gray-800/50 shadow-lg dark:shadow-md dark:shadow-black/30 bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-black/40 dark:to-gray-950/40 backdrop-blur-md hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-500 hover:-translate-y-2 animate-on-scroll group overflow-hidden relative" style={{ animationDelay: "0.1s" }}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 dark:from-blue-700/5 dark:to-purple-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-slate-900 dark:text-gray-100 leading-tight">Instant Search</CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  Find anything you have saved with powerful search that understands context and meaning.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-3">
                  <div className="h-2 bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-950 dark:to-blue-900 rounded-full search-bar-animate"></div>
                  <div
                    className="h-2 bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-950 dark:to-blue-900 rounded-full w-3/4 search-bar-animate"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-950 dark:to-blue-900 rounded-full w-1/2 search-bar-animate"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Square Feature Card */}
            <Card
              className="border border-gray-200/50 dark:border-gray-800/50 shadow-lg dark:shadow-md dark:shadow-black/30 bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-black/40 dark:to-gray-950/40 backdrop-blur-md hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-500 hover:-translate-y-2 animate-on-scroll group overflow-hidden relative" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 dark:from-purple-700/5 dark:to-pink-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-700 dark:to-purple-800 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-slate-900 dark:text-gray-100 leading-tight">Easy Organization</CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  Organize your memories with tags, categories, and smart folders.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Wide Feature Card */}
            <Card
              className="md:col-span-2 border border-gray-200/50 dark:border-gray-800/50 shadow-lg dark:shadow-md dark:shadow-black/30 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-black/40 dark:to-gray-950/40 backdrop-blur-md hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-500 hover:-translate-y-2 animate-on-scroll group overflow-hidden relative" style={{ animationDelay: "0.3s" }}>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 dark:from-green-700/5 dark:to-emerald-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-700 dark:to-emerald-800 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-slate-900 dark:text-gray-100 leading-tight">Privacy First</CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  Your memories stay private and secure with end-to-end encryption and local storage options.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-emerald-200 dark:bg-emerald-700 rounded-full animate-pulse"></div>
                  <div
                    className="w-4 h-4 bg-emerald-300 dark:bg-emerald-600 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-4 h-4 bg-emerald-400 dark:bg-emerald-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-black dark:via-gray-950 dark:to-black relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 dark:from-emerald-600/10 dark:to-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-emerald-400/20 dark:from-purple-600/10 dark:to-emerald-600/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative">
          <div className="space-y-8 max-w-3xl mx-auto animate-on-scroll">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300 leading-relaxed pb-1">
              Ready to never forget again?
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-400 leading-relaxed">
              Join thousands of users who have transformed their memory and productivity with forgetAI. Start using it
              today - completely free, forever.
            </p>
            <div className="flex flex-row gap-4 justify-center">
              <Link href={isSignedIn ? '/dashboard' : '/sign-in?redirect_url=/dashboard'} passHref onClick={handleGetStarted}>
                <Button asChild size="lg" className="text-base md:text-lg px-5 md:px-8 bg-slate-900 hover:bg-slate-800 dark:bg-gray-950 dark:hover:bg-gray-900 text-white transition-all duration-200 hover:scale-105" disabled={isLoading}>
                  <span>
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Loading...
                      </span>
                    ) : (
                      <>Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></>
                    )}
                  </span>
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-base md:text-lg px-5 md:px-8 border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-950 transition-all duration-200 bg-transparent"
              >
                Learn More
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-slate-500 dark:text-gray-500">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Always Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>No Limits</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Privacy Focused</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image src="/logo.png" alt="forgetAI Logo" width={24} height={24} />
                <span className="text-xl font-semibold text-slate-900 dark:text-gray-100">forgetAI</span>
              </div>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                Your personal AI memory assistant that helps you remember everything important.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-gray-100">Quick Links</h4>
              <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                <li>
                  <Link
                    href="https://github.com/sidgupt12/forgetai"
                    className="hover:text-slate-900 dark:hover:text-gray-200 transition-colors flex items-center space-x-2"
                  >
                    <Github className="h-4 w-4" />
                    <span>Frontend Repo</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/sidgupt12/forgetai-backend"
                    className="hover:text-slate-900 dark:hover:text-gray-200 transition-colors flex items-center space-x-2"
                  >
                    <Github className="h-4 w-4" />
                    <span>Backend Repo</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-slate-500 dark:text-gray-500 text-sm">© {new Date().getFullYear()} forgetAI. All rights reserved.</p>
              <p className="text-slate-500 dark:text-gray-500 text-sm flex items-center">
                Made with <span className="text-red-500 mx-1">❤️</span> by siddhant
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="mailto:hello@forgetai.com" className="text-slate-400 hover:text-slate-600 dark:hover:text-gray-400 transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com/s0lomate"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-gray-400 transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/sidgupt12"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-gray-400 transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/siddhantgupta12/"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-gray-400 transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Popup */}
      {isVideoPopup && (
        <div className="video-popup fixed inset-0 z-[100] bg-black/80 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-12 right-0 text-white hover:text-gray-300 dark:hover:text-gray-400 z-10"
              onClick={handleClosePopup}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="relative bg-white dark:bg-black rounded-2xl p-2 shadow-2xl">
              <video ref={popupVideoRef} className="w-full h-auto rounded-xl" controls autoPlay>
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hero-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        
        .hero-section.hero-loaded {
          opacity: 1;
          transform: translateY(0);
        }
        
        .hero-content {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out 0.2s;
        }
        
        .hero-section.hero-loaded .hero-content {
          opacity: 1;
          transform: translateY(0);
        }
        
        .hero-video {
          opacity: 0;
          transform: translateX(30px);
          transition: all 0.8s ease-out 0.4s;
        }
        
        .hero-section.hero-loaded .hero-video {
          opacity: 1;
          transform: translateX(0);
        }
        
        .floating-element {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
        
        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .video-popup {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s ease-out;
        }
        
        .video-popup.popup-active {
          opacity: 1;
          transform: scale(1);
        }
        
        .search-bar-animate {
          animation: searchPulse 2s ease-in-out infinite;
        }
        
        @keyframes searchPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .scroll-to-top-btn {
          opacity: 0;
          transform: translateY(20px);
          animation: slideInUp 0.3s ease-out forwards;
        }
        
        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
} 