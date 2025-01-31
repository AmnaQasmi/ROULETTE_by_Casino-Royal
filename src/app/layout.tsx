"use client";
// import type { Metadata } from "next";
import { Inter, Kings } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const kings = Kings({
  variable: "--font-kings",
  subsets: ["latin"],
  weight: "400",
});

// ✅ Correct way to use metadata
//  const metadata: Metadata = {
//   title: "Casino Royale",
//   description: "Casino Royal showcasing bets and games.",
//   openGraph: {
//     title: "Amna Qasmi Portfolio",
//     description: "Amna's portfolio showcasing web development skills.",
//     images: ["/path-to-image.jpg"],
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${kings.variable} antialiased`}>
        <MantineProvider>
          <div id="app">{children}</div>
        </MantineProvider>
      </body>
    </html>
  );
}
