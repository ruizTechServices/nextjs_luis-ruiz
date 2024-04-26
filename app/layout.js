import { Inter } from "next/font/google";
import "./globals.css";
import MainFooter from "./components/main/mainFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Luis Ruiz: Full-Stack Web Developer",
  description: "Portfolio of Luis Ruiz, a full-stack Developer",
};

// let user = {
//   name: "Luis Chaka Ruiz",
//   email: "github.com/luisr-escobar",
//   image: "/images/luisIT.jpg",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <MainFooter />
      </body>
    </html>
  );
}
