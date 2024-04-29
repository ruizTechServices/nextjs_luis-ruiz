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
import ProjectViewer from "./components/main/iframe";

export default async function Portfolio() {

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
      <div className="md:container mx-auto w-1/2 border border-blue-400"></div>

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
      </section>

      <section className="flex flex-col items-center justify-center min-h-screen p-10 text-center bg-white dark:bg-gray-800">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          About Me
        </h2>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          With over a decade of experience as a full-stack web developer, I
          possess a profound expertise in technologies including NextJS,
          Sveltekit, JavaScript, TypeScript, among others.
        </p>
        <Image
          src="/images/me_2.PNG"
          alt="About Luis"
          width={400}
          height={300}
        />
      </section>

      <section className="bg-gradient-to-r from-yellow-200 via-green-200 to-green-500">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-bold text-center text-white">Luis Ruiz</h1>
        <p className="text-center text-xl mt-2 text-gray-800">New York City Native</p>

        <div className="mt-8 bg-cover bg-center rounded-full w-48 h-48 mx-auto shadow-lg">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="/images/luisIT.jpg"
              alt="Luis Ruiz"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>

        <div className="mt-8 text-center max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed text-gray-800">
            Luis Ruiz, a 35-year-old professional with roots in New York City, currently oversees
            management operations at Compulogic. Demonstrating a strong commitment to community
            engagement, Luis conducts educational initiatives aimed at enhancing brand visibility
            and trust.
          </p>
          <div className="my-8 text-xl font-bold border-b-4 border-gray-700"></div>
          <h3 className="text-2xl font-bold text-gray-800">Professional Skills</h3>
          <p className="text-lg mt-2 text-gray-800">
            With expertise in general maintenance and a profound passion for business growth and
            personal development, Luis excels in diverse environments. He holds a Bachelor&apos;s
            degree in Information Technology from the University of Phoenix, underscoring his strong
            foundation in technical skills.
          </p>
          <h3 className="text-2xl font-bold text-gray-800 mt-8">Interests</h3>
          <p className="text-lg mt-2 text-gray-800">
            Luis finds pleasure in engaging with complex video games like Red Dead Redemption 2,
            Helldivers 2, and Genshin Impact, which he believes stimulate strategic and analytical
            thinking. His enthusiasm for programming is driven by a goal to reach a level of
            expertise where his skills are indispensable to others.
          </p>
        </div>
      </main>
    </section>

      <div className="my-10 mx-auto md:container w-3/4 border border-blue-400"></div>

      <section className="flex flex-col items-center justify-center min-h-screen p-10 text-center bg-white dark:bg-gray-700">
        <div className="bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 p-6 rounded-lg shadow-lg my-5">
          <h2 className="text-4xl font-bold text-black drop-shadow-2xl">
            My Work
          </h2>
          <p className="mt-3 text-lg text-black font-bold dark:text-gray-300">
            I&apos;ve contributed to numerous projects that help companies
            achieve their goals. Here&apos;s a glimpse of my work.
          </p>
        </div>
        <ProjectViewer />
      </section>

      <section className="animate-in shadow-2xl mx-auto flex flex-col md:flex-row md:h-[500px]">
        <div className="flex overflow-hidden h-full md:w-1/2 bg-white">
          <div className="flex flex-col justify-center text-center w-full font-bold text-4xl ">
            <h1>Web Designer</h1>
            <h1>Web Developer</h1>
            <h1>DevOps Engineer</h1>
            <h1>Software Engineer</h1>
          </div>
        </div>
        <div className="flex overflow-hidden h-full md:w-1/2 bg-white">
          <div className="flex justify-center items-center align-middle w-full mx-5 my-5 border-2 overflow-hidden">
            <Image
              src={"/images/gioWater.jpg"}
              alt="Luis"
              width={5000}
              height={0}
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>



      {/* <section className="border-4 h-[500px] bg-gradient-to-r from-yellow-200 via-green-200 to-green-500">
        <div className="flex overflow-hidden border-4 h-[200px] w-1/2 bg-white">
          <div className="border-4 border-blue-500 h-[200px] w-1/2 bg-white">

          </div>
          <div className="border-4 border-red-500 h-[200px] w-1/2 bg-white">

          </div>
        </div>
      </section> */}
    </main>
  );
}
