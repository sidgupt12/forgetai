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
  openGraph: {
    title: 'ForgetAI',
    description: 'Your personal AI memory assistant that helps you remember everything important. Capture thoughts, organize ideas, and retrieve information instantly.',
    url: 'https://forgetai.siddhant.cc/',
    siteName: 'ForgetAI',
    images: [
      {
        url: 'https://forgetai.siddhant.cc/logo.png',
        width: 1200,
        height: 630,
        alt: 'ForgetAI Preview Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ForgetAI',
    description: 'Your personal AI memory assistant that helps you remember everything important. Capture thoughts, organize ideas, and retrieve information instantly.',
    images: ['https://forgetai.siddhant.cc/logo.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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