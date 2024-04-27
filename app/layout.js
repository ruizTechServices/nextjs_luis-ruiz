import { Inter } from "next/font/google";
import "./globals.css";
import MainFooter from "./components/main/mainFooter";
import Head from "next/head";
import Adsense from "../app/components/main/adsense"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Luis Ruiz: Full-Stack Web Developer",
  description: "Portfolio of Luis Ruiz, a full-stack Developer",
};



export default function RootLayout({ children }) {
  return (
    <><Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content="Luis Ruiz Portfolio" />
      <meta name="author" content="<NAME>" />
      <meta
        name="keywords"
        content="Luis Ruiz, Portfolio, Full-Stack Developer" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <Adsense pId="ca-pub-8779702295184066" />
    </Head><body className={inter.className}>
        {children}
        <MainFooter />
      </body></>
  );
}
