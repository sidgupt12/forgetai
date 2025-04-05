'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Footer from './Footer';

export default function ClientPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
