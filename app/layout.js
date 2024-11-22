import { Inter } from "next/font/google";
import "./globals.css";
import MainFooter from "./components/main/mainFooter";
import Adsense from "./components/adsense";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Luis Ruiz: Full-Stack Web Developer",
  description: "Portfolio of Luis Ruiz, a full-stack Developer",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: "Luis Ruiz, Portfolio, Full-Stack Developer",
  viewport: "width=device-width,initial-scale=1",
  googleAdsenseAccount: "ca-pub-8779702295184066",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-white`}>
        {children}
        <MainFooter />
        <Adsense pId="8779702295184066" />
      </body>
    </html>
  );
}
