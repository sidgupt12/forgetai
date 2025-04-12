'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { SearchInput } from "@/components/ui/searchinput";
import ColourfulText from "@/components/ui/colourful-text";
import { FlipWords } from "@/components/ui/flip-words";
import BrainPopup from './_components/popup';
import DataGrid from './_components/DataGrid';

function handleChange(event) {
  console.log(event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();
  const inputValue = event.target.elements.input.value;
  console.log("Submitted:", inputValue);
}

// Update the main content layout section

function Dashboard({ displayName }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shouldRefreshGrid, setShouldRefreshGrid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBrainSubmit = (data) => {
    console.log("Brain data submitted:", data);
    // Trigger a refresh of the data grid
    setShouldRefreshGrid(prev => !prev);
  };


  return (
    <div className="relative min-h-screen w-full overflow-y-auto">
      {/* Background with position fixed so it doesn't affect scrolling */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* <BackgroundBeamsWithCollision /> */}
      </div>
      
      {/* Main content container with explicit z-index */}
      <div className="relative z-10 w-full min-h-screen">
        <Header />
        
        <div className="flex flex-col items-center pt-20 pb-20 px-4">
          <div className="text-6xl font-bold font-serif flex pb-2">
            <ColourfulText text="Forget " />
            <h1>AI</h1>
          </div>
          
          <h3 className="text-2xl mb-8 font-bold">
            Welcome back, <span className="text-green-500">{displayName}</span>
          </h3>
          
          <div className="w-full max-w-2xl mb-10">
            <SearchInput
              placeholders={["Forgot something?", "Search your memories...", "Find that tweet...", "Question your PDF..."]}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
          
          {/* Updated layout with better alignment */}
          <div className="w-full max-w-7xl flex flex-col lg:flex-row lg:gap-8 lg:items-start">
            {/* Add Card Container */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-start mb-10 lg:mb-0">
              <CardSpotlight
                className="w-72 h-72 lg:mt-[100px] bg-white/80 dark:bg-neutral-800/60 backdrop-blur-md
                 border border-neutral-200 dark:border-neutral-700 flex items-center
                  justify-center overflow-hidden rounded-2xl cursor-pointer
                   shadow-lg hover:shadow-xl transition-all"
                onClick={() => setIsPopupOpen(true)}
              >
                <div className="absolute top-3 left-3 flex items-center justify-center text-gray-700 dark:text-gray-300 z-20">
                  <span className="text-4xl font-bold">+</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <p className="text-lg font-bold relative z-20 text-black dark:text-white">
                    Never lose your
                  </p>
                  <div className="text-xl font-semibold mt-1 relative z-20 text-blue-600 dark:text-blue-400">
                    <FlipWords 
                      words={["Memories", "PDFs", "Tweets", "Thoughts"]} 
                    />
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 relative z-20">
                    click to save
                  </p>
                </div>
              </CardSpotlight>
            </div>

            {/* Data Grid Container */}
            <div className="w-full lg:flex-1">
              <DataGrid key={shouldRefreshGrid} />
            </div>
          </div>

          {/* Popup Component */}
          <BrainPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSubmit={handleBrainSubmit}
          />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;