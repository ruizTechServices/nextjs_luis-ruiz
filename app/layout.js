import { Inter } from "next/font/google";
import "./globals.css";
import MainFooter from "./components/main/mainFooter";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Luis Ruiz: Full-Stack Web Developer",
  description: "Portfolio of Luis Ruiz, a full-stack Developer",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: "Luis Ruiz, Portfolio, Full-Stack Developer",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-white dark:bg-white`}>
          {children}
          <Analytics />
          <MainFooter />
        </body>
      </html>
    </ClerkProvider>
  );
}
