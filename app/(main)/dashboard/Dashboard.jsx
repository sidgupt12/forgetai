'use client';
import Header from "@/app/components/Header";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import ColourfulText from "@/components/ui/colourful-text";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { FlipWords } from "@/components/ui/flip-words";
import React from 'react';
import { SearchInput } from "@/components/ui/searchinput";

function handleChange(event) {
  console.log(event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();
  const inputValue = event.target.elements.input.value;
  console.log("Submitted:", inputValue);
  // Here you would typically call your AI service with the input
}

function Dashboard({ displayName }) {
  return (
    <BackgroundBeamsWithCollision className="h-screen md:h-screen">
      <div className="w-full h-full">
        <Header/>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-6xl font-bold font-serif flex pb-2">
            <ColourfulText text="Forget " />
            <h1>AI</h1>
          </div>
            <h3 className="text-2xl mb-8 font-bold">
                Welcome back, <span className="text-green-500">{displayName}</span>
            </h3>          
          <div className="w-full max-w-2xl px-4 mb-10">
            <SearchInput
              placeholders={["Forgot something?", "Search your memories...", "Find that tweet...", "Question your PDF..."]}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
          
          <div className="w-full max-w-6xl px-4 mt-4 flex justify-center md:justify-start">

            <CardSpotlight className="relative z-10 w-72 h-72 bg-white/80 dark:bg-neutral-800/60 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center overflow-hidden rounded-2xl">
              {/* Bigger plus symbol with no circle or background */}
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
          {/* Uncomment this section if you want to add a background animation */}

          
            {/* <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-blue-500 blur-xl opacity-50 animate-pulse z-0" />
              
              <CardSpotlight className="relative z-10 w-72 h-72 bg-white/80 dark:bg-neutral-800/60 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center overflow-hidden rounded-2xl">
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
            </div> */}
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  )
}

export default Dashboard;