//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\page.js
import Image from "next/image";
import HeroSection from "./components/main/heroSection";
import Link from "next/link";
import { IoLogoJavascript } from "react-icons/io5";
import { FaPython } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { BiLogoTailwindCss } from "react-icons/bi";
import { FaPhp } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { RiSvelteFill } from "react-icons/ri";
import { FcLinux } from "react-icons/fc";
import { createClient } from "@/lib/utils/supabase/server";

export default async function Portfolio() {
  const supabase = createClient();
  
const { data: { user } } = await supabase.auth.getUser()


  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <HeroSection />
      <section className="flex flex-col items-center justify-center min-h-screen p-10 text-center">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
          Welcome to Luis-ruiz.com
        </h1>
        <p className="mt-3 text-xl text-gray-600 dark:text-gray-300">
          A portfolio of Luis Ruiz, An Awesome Full-Stack Web Developer
        </p>
        <Image
          src="/images/luisIT.jpg"
          alt="Luis Ruiz"
          width={200}
          height={200}
          className="rounded-full"
        />
      </section>

      <section className="flex flex-col items-center justify-center min-h-screen p-10 text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          I code in <span>many</span> programming languages & frameworks.
        </h2>
        <div className="flex flex-col flex-wrap md:flex-row justify-center mt-6 md:space-x-10">
          <div className="flex justify-center m-6 hover:animate-bounce">
              <IoLogoJavascript className="text-6xl text-yellow-300 bg-black" />
          </div>
          <div className="flex justify-center m-6 hover:animate-bounce">
            <FaPython className="text-6xl text-blue-500 shadow-4xl" />
          </div>
          <div className="flex justify-center mt-6 hover:animate-bounce ">
            <FaHtml5 className="text-6xl text-orange-400" />
          </div>
          <div className="flex justify-center mt-6 hover:animate-bounce">
            <BiLogoTailwindCss className="text-6xl text-blue-300" />
          </div>
          <div className="flex justify-center mt-6 hover:animate-bounce">
            <FaPhp className="text-6xl text-black" />
          </div>
          <div className="flex justify-center mt-6 hover:animate-bounce">
            <FaNodeJs className="text-6xl text-green-600" />
          </div>
          <div className="flex justify-center mt-6 hover:animate-bounce">
            <FaReact className="text-6xl text-blue-300" />
          </div>
          <div className="flex justify-center mt-6 hover:animate-bounce">
            <TbBrandNextjs className="text-6xl text-black" />
          </div>
          <div className="flex justify-center mt-6 hover:animate-bounce">
            <RiSvelteFill className="text-6xl text-orange-600" />
          </div>
          <div className="flex justify-center mt-6 hover:animate-bounce">
            <FcLinux className="text-6xl text-orange-600" />
          </div>
        </div>
        {/* <div>
          <Link
            className="hover:animate-bounce"
            href="https://ruiztechservices.com"
            target="_blank"
          >
            ruizTechServices<span className="animate-blink">|</span>
          </Link>
        </div> */}
      </section>

      <section className="flex flex-col items-center justify-center min-h-screen p-10 text-center bg-white dark:bg-gray-800">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          About Me
        </h2>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          With 10 years of experience as a full-stack web developer, I have a
          deep understanding of technologies such as NextJS, Sveltekit,
          JavaScript, TypeScript, and more.
        </p>
        <Image
          src="/images/me_2.PNG"
          alt="About Luis"
          width={400}
          height={300}
        />
      </section>

      <section className="flex flex-col items-center justify-center min-h-screen p-10 text-center bg-white dark:bg-gray-700">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-white drop-shadow-2xl">
            My Work
          </h2>
          <p className="mt-3 text-lg text-white dark:text-gray-300">
            I&apos;ve contributed to numerous projects that help companies
            achieve their goals. Here&apos;s a glimpse of my work.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <iframe
            src="https://catherineruiz.com"
            title="Project 1"
            className="h-[500px]"
          ></iframe>
          <iframe
            src="https://Compulogicpc.com"
            title="Project 2"
            className="h-[500px]"
          ></iframe>
          <iframe
            src="https://ruiztechsevices.com"
            title="Project 3"
            className="h-[500px]"
          ></iframe>
          <iframe
            src="https://24hourgpt.com"
            title="Project 4"
            className="h-[500px]"
          ></iframe>
          <iframe
            src="https://demon-child.com"
            title="Project 5"
            className="h-[500px]"
          ></iframe>
          <iframe
            src="https://letmeexplain.online"
            title="Project 6"
            className="h-[500px]"
          ></iframe>
          <iframe
            src="https://rrtruckingservices.com"
            title="Project 7"
            className="h-[500px]"
          ></iframe>
          <iframe
            src="https://dont-download.com"
            title="Project 8"
            className="h-[500px]"
          ></iframe>      
        </div>
      </section>
    </main>
  );
}
