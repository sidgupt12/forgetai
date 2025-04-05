import './globals.css';
import { Inter } from 'next/font/google';
import ThemeProviderWrapper from './components/ThemeProviderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ForgetAI',
  description: 'A second brain designed to never forget what matters to you.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
