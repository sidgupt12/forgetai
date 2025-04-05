'use client';

import { ThemeProvider } from './ThemeProvider';

export default function ThemeProviderWrapper({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
