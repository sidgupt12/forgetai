'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Header from '@/app/components/Header';
// Assuming BackgroundBeams component path is correct
// import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { SearchInput } from "@/components/ui/searchinput";
import ColourfulText from "@/components/ui/colourful-text";
import { FlipWords } from "@/components/ui/flip-words";
import BrainPopup from './_components/popup';
import DataGrid from './_components/DataGrid';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

function Dashboard({ displayName }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [shouldRefreshGrid, setShouldRefreshGrid] = useState(false);
  const router = useRouter(); // Initialize useRouter

  // Removed isScrolled state and effect as it wasn't used in the final logic

  const handleBrainSubmit = (data) => {
    console.log("Brain data submitted:", data);
    setShouldRefreshGrid(prev => !prev);
  };

  // Dummy handleChange, replace if needed
  function handleChange(event) {
    // console.log(event.target.value);
  }

  // Updated submission handler that redirects to chat page with the query
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    // Ensure you have an input element with name="input" inside SearchInput or adjust selector
    const inputElement = form.elements.namedItem('input');
    const inputValue = inputElement ? inputElement.value : '';


    if (inputValue.trim()) {
      // Generate session ID and redirect to chat with the query in URL params
      const sessionId = uuidv4();
      const encodedQuery = encodeURIComponent(inputValue);
      router.push(`/chat/${sessionId}?q=${encodedQuery}`);
    } else {
      console.log("Search input is empty.");
      // Optionally, provide user feedback that input is needed
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-y-auto bg-gray-50 dark:bg-zinc-900">
      {/* Background (Optional) - kept commented as in original */}
      {/* <div className="fixed inset-0 z-0 pointer-events-none"> */}
      {/* <BackgroundBeamsWithCollision /> */}
      {/* </div> */}

      {/* Main content container */}
      <div className="relative z-10 w-full min-h-screen">
        <Header />

        <div className="flex flex-col items-center pt-20 pb-20 px-4">
          <div className="text-6xl font-bold font-serif flex pb-2">
            <ColourfulText text="Forget " />
            <h1>AI</h1>
          </div>

          {/* Welcome Message */}
          <h3 className="text-xl md:text-2xl mb-8 font-semibold text-gray-600 dark:text-gray-300"> {/* Adjusted style */}
            Welcome back{displayName ? `, ` : ''}<span className="text-green-500 font-medium">{displayName}</span>
          </h3>

          {/* Search Input */}
          <div className="w-full max-w-2xl mb-12"> {/* Increased mb */}
            <SearchInput
              placeholders={["Forgot something?", "Search your memories...", "Find that tweet...", "Question your PDF..."]}
              onChange={handleChange} // Keep if needed elsewhere
              onSubmit={handleSubmit} // Use the redirecting handler
              // Ensure SearchInput renders a form element and an input with name="input"
            />
          </div>

          {/* Main Content Area (Add Card + Data Grid) */}
          <div className="w-full max-w-7xl flex flex-col lg:flex-row lg:gap-8 lg:items-start px-4 md:px-0">
            {/* Add Card Container */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-start mb-10 lg:mb-0 lg:sticky lg:top-24"> {/* Sticky card */}
            <CardSpotlight
                className="w-72 h-72 lg:mt-[100px] bg-white/80 dark:bg-neutral-800/60 backdrop-blur-md
                 border border-neutral-200 dark:border-neutral-700 flex items-center
                  justify-center overflow-hidden rounded-2xl cursor-pointer
                   shadow-lg hover:shadow-xl transition-all"
                onClick={() => setIsPopupOpen(true)}
              >
                <div className="absolute top-3 left-3 flex items-center justify-center text-gray-700 dark:text-gray-300 z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg> {/* Plus Icon */}
                </div>

                <div className="flex flex-col items-center text-center p-4">
                  <p className="text-base md:text-lg font-bold relative z-20 text-black dark:text-white">
                    Never lose your
                  </p>
                  <div className="text-lg md:text-xl font-semibold mt-1 relative z-20 text-blue-600 dark:text-blue-400">
                    <FlipWords
                      words={["Memories", "PDFs", "Tweets", "Thoughts"]}
                    />
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 relative z-20">
                    Click to save
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