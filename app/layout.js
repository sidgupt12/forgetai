import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs'; // Import ClerkProvider
import ThemeProviderWrapper from './components/ThemeProviderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ForgetAI',
  description: 'A second brain designed to never forget what matters to you.',
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://forgetai.siddhant.cc'),
  openGraph: {
    title: 'ForgetAI',
    description: 'Your personal AI memory assistant that helps you remember everything important. Capture thoughts, organize ideas, and retrieve information instantly.',
    url: 'https://forgetai.siddhant.cc/',
    siteName: 'ForgetAI',
    images: [
      {
        url: 'https://forgetai.siddhant.cc/preview.png',
        width: 1200,
        height: 630,
        alt: 'ForgetAI - Your personal AI memory assistant',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ForgetAI',
    description: 'Your personal AI memory assistant that helps you remember everything important. Capture thoughts, organize ideas, and retrieve information instantly.',
    images: ['https://forgetai.siddhant.cc/preview.png'],
    creator: '@sidgupt12',
    site: '@sidgupt12',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sidgupt12" />
        <meta name="twitter:creator" content="@sidgupt12" />
        <meta name="twitter:title" content="ForgetAI" />
        <meta name="twitter:description" content="Your personal AI memory assistant that helps you remember everything important. Capture thoughts, organize ideas, and retrieve information instantly." />
        <meta name="twitter:image" content="https://forgetai.siddhant.cc/preview.png" />
        <meta name="twitter:image:alt" content="ForgetAI - Your personal AI memory assistant" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        
        <meta property="og:title" content="ForgetAI" />
        <meta property="og:description" content="Your personal AI memory assistant that helps you remember everything important. Capture thoughts, organize ideas, and retrieve information instantly." />
        <meta property="og:image" content="https://forgetai.siddhant.cc/preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="ForgetAI - Your personal AI memory assistant" />
        <meta property="og:url" content="https://forgetai.siddhant.cc/" />
        <meta property="og:site_name" content="ForgetAI" />
        <meta property="og:type" content="website" />
      </head>
      <body className={inter.className}>
        <ClerkProvider>
          <ThemeProviderWrapper>
            {children}
          </ThemeProviderWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
}