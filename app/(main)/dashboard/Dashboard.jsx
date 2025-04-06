// 'use client';
// import Header from "@/app/components/Header";
// import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
// import ColourfulText from "@/components/ui/colourful-text";
// import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
// import { CardSpotlight } from "@/components/ui/card-spotlight";
// import { FlipWords } from "@/components/ui/flip-words";

// import React from 'react'

// function handleChange(event) {
//   console.log(event.target.value);
// }

// function handleSubmit(event) {
//   event.preventDefault();
//   const inputValue = event.target.elements.input.value;
//   console.log("Submitted:", inputValue);
// }


// function Dashboard({ displayName }) {
//   return (
//     <BackgroundBeamsWithCollision className="h-screen md:h-screen">
//       <div className="w-full h-full">
//         <Header/>
//         <div className="flex flex-col items-center justify-center h-full">
//           <div className="text-6xl font-bold font-serif flex pb-2">
//             <ColourfulText text="Forget " />
//             <h1>AI</h1>
//           </div>
//           <h3 className="ml-4 text-2xl">Hello, {displayName}</h3>
//           <div className="pt-10 text-2xl pt=[-100px]">
//             <PlaceholdersAndVanishInput
//               placeholders={["Forgot Something?", "Find Tweet", "Question PDF"]}
//               onChange={handleChange}
//               onSubmit={handleSubmit}
//             />
//           </div>
//           <div className="w-full max-w-6xl px-4 mt-12 flex justify-start">
//             <div className="relative">
//               <div className="absolute inset-0 rounded-2xl bg-blue-500 blur-xl opacity-50 animate-pulse z-0" />
              
//               <CardSpotlight className="relative z-10 w-72 h-72 bg-white/80 dark:bg-neutral-800/60 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center overflow-hidden rounded-2xl">
//                 <div className="flex flex-col items-center text-center">
//                   <p className="text-lg font-bold relative z-20 text-black dark:text-white">
//                     Never lose your
//                   </p>
//                   <div className="text-xl font-semibold mt-1 relative z-20 text-blue-600 dark:text-blue-400">
//                     <FlipWords 
//                       words={["Memories", "PDFs", "Tweets", "Thoughts"]} 
//                     />
//                   </div>
//                   <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 relative z-20">
//                     click to save
//                   </p>
//                 </div>
//               </CardSpotlight>
//             </div>
//           </div>

//         </div>
//       </div>
//     </BackgroundBeamsWithCollision>
//   )
// }

// const Feature = ({ text }) => {
//   return (
//     <li className="flex gap-2 items-start">
//       <CheckIcon />
//       <p className="text-black dark:text-neutral-200 text-xs">{text}</p>
//     </li>
//   );
// };

// const CheckIcon = () => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       className="h-3 w-3 text-blue-500 mt-0.5 shrink-0">
//       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//       <path
//         d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
//         fill="currentColor"
//         strokeWidth="0" />
//     </svg>
//   );
// };

// export default Dashboard

// Updated Dashboard.jsx
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
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-blue-500 blur-xl opacity-50 animate-pulse z-0" />
              
              <CardSpotlight className="relative z-10 w-72 h-72 bg-white/80 dark:bg-neutral-800/60 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center overflow-hidden rounded-2xl">
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
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  )
}

export default Dashboard;