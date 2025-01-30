"use client";
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { useEffect, useState } from 'react';
import Homepage from '@/Components/Homepage';
import Header from '@/Components/Header';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Define a default theme with breakpoints
const theme = createTheme({
  breakpoints: {
    'xs': '320px',
    'sm': '476px',
    'md': '640px',
    'bs': '768px',
    'lg': '900px',
    'xl': '1024',
    '2xl': '1280',
  },
});


export default function HomePage() {
  const [hydrated, setHydrated] = useState(false);

  // Initialize AOS (runs only on the client)
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  // Ensure hydration matches
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Prevent rendering until the client is ready
  if (!hydrated) {
    return null;
  }

  return (
    <MantineProvider theme={theme} >
      <Header />
      <Homepage />
    </MantineProvider>
  );
}
