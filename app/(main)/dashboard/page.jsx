'use client';
import Header from "@/app/components/Header";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import ColourfulText from "@/components/ui/colourful-text";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

import React from 'react'

function handleChange(event) {
  console.log(event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();
  const inputValue = event.target.elements.input.value;
  console.log("Submitted:", inputValue);
}

function Dashboard() {
  return (
    <div>
      <Header/>
      <BackgroundBeamsWithCollision>
        <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-6xl font-bold font-serif flex">
          <ColourfulText text="Forget " />
          <h1>AI</h1> 
        </div>
        <div className="pt-10 text-2xl">
        <PlaceholdersAndVanishInput
          placeholders={["Ask Something", "Type something", "Enter text"]}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  )
}

export default Dashboard