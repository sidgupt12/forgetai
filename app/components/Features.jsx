'use client';

import { useInView } from 'react-intersection-observer';

const MemoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
  </svg>
);

const TimerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const GlareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const LampHeader = () => (
  <div className="relative w-full overflow-hidden bg-white dark:bg-black py-12">
    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
    <div className="relative max-w-7xl mx-auto text-center">
      <div className="relative inline-block">
        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-30" />
        <h1 className="relative text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          Features
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Discover the tools you need to remember everything that matters
      </p>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`feature-card relative bg-white dark:bg-black backdrop-blur-sm overflow-hidden transition-all duration-500 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      <div
        className="absolute inset-0 rounded-xl p-3 animate-border-pulse"
        style={{
          backgroundImage: 'linear-gradient(to right, #ff4f4f, #ff9500, #ffcc00, #34bf49, #38b6ff, #8c52ff)',
        }}
      >
        <div className="absolute inset-0 bg-white dark:bg-black rounded-xl"></div>
      </div>
      <div className="relative flex flex-col items-center text-center p-8">
        <div className="mb-4 p-4 rounded-full bg-gray-100 dark:bg-gray-800 transition-all duration-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900">
          {icon}
        </div>
        <h3 className="text-2xl font-extrabold mb-2 text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

const GlareCard = ({ icon, title, description, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`relative bg-white dark:bg-black backdrop-blur-sm overflow-hidden transition-all duration-500 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      <div
        className="absolute inset-0 rounded-xl p-3 animate-border-pulse"
        style={{
          backgroundImage: 'linear-gradient(to right, #ff4f4f, #ff9500, #ffcc00, #34bf49, #38b6ff, #8c52ff)',
        }}
      >
        <div className="absolute inset-0 bg-white dark:bg-black rounded-xl" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      <div className="relative flex flex-col items-center text-center p-8">
        <div className="mb-4 p-4 rounded-full bg-white/50 dark:bg-gray-700/50">
          {icon}
        </div>
        <h3 className="text-2xl font-extrabold mb-2 text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function Features() {
  return (
    <section className="bg-white dark:bg-black">
      <LampHeader />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">
          <div className="md:col-span-2">
            <FeatureCard
              icon={<MemoryIcon />}
              title="Memory Vault"
              description="Securely store your thoughts, ideas, and memories in one place."
              delay={0.1}
            />
          </div>
          <div className="md:col-span-1">
            <FeatureCard
              icon={<UploadIcon />}
              title="Effortless Saving"
              description="Save notes, tweets, and PDFs with a single click."
              delay={0.2}
            />
          </div>
          <div className="md:col-span-1">
            <FeatureCard
              icon={<SearchIcon />}
              title="Smart Search"
              description="Find anything instantly with advanced AI-powered search."
              delay={0.3}
            />
          </div>
          <div className="md:col-span-1">
            <FeatureCard
              icon={<DatabaseIcon />}
              title="Knowledge Base"
              description="Build a searchable database of everything you care about."
              delay={0.4}
            />
          </div>
          <div className="md:col-span-2">
            <GlareCard
              icon={<GlareIcon />}
              title="Visual Insights"
              description="Experience your data through stunning visual representations."
              delay={0.5}
            />
          </div>
          <div className="md:col-span-1">
            <FeatureCard
              icon={<TimerIcon />}
              title="Time Saver"
              description="Stop wasting time searching—start focusing on what matters."
              delay={0.6}
            />
          </div>
        </div>
      </div>
    </section>
  );
}