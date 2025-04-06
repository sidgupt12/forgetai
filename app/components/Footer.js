'use client';

import Link from 'next/link';

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-black dark:bg-true-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Two column grid with better responsive behavior */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
          {/* Left column - original content */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Forget AI</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Your ultimate second brain designed to never forget what matters to you.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-6">
              <Link href="https://x.com/s0lomate" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                <TwitterIcon />
              </Link>
              <Link href="https://github.com/sidgupt12" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                <GitHubIcon />
              </Link>
              <Link href="https://www.linkedin.com/in/siddhantgupta12/" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                <LinkedInIcon />
              </Link>
              <Link href="mailto:sidgupt12@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                <EmailIcon />
              </Link>
            </div>
          </div>

          {/* Right column - quick links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="https://github.com/sidgupt12/forgetai" className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Frontend Repo
                </Link>
              </li>
              <li>
                <Link href="https://github.com/sidgupt12/forgetai-backend" className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Backend Repo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright and credit */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-0">
            &copy; {currentYear} Forget AI. All rights reserved.
          </p>
          <div className="flex items-center">
            <span className="text-gray-500 text-xs sm:text-sm mr-2">Made with ❤️ by</span>
            <span className="font-bold text-black dark:text-white text-xs sm:text-sm">Siddhant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}