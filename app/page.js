//CC:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\page.js
"use client";
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
import ProjectViewer from "./components/main/iframe";
import GptStore from "./components/main/gpt_store";
import Head from 'next/head'
import { Layout66 } from "./components/main/number66";
import { Cta7 } from "./components/main/cta7";

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-white">
      <Head>
      <meta name="google-adsense-account" content="ca-pub-8779702295184066" />
      </Head>
      <HeroSection />
      {/*Intro*/}
      <section className="flex flex-col items-center justify-center min-h-screen p-10 text-center">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-black">
          Welcome to Luis-ruiz.com
        </h1>
        <p className="mt-3 text-xl text-gray-600 dark:text-black">
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

      <div className="container mx-auto w-1/2 border border-blue-400"></div>

      {/*Frameworks I work with*/}
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

      {/*About Me*/}
      <section className="flex flex-col items-center justify-center min-h-screen p-10 bg-white dark:bg-gray-800">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          About Me
        </h2>
        <p className="lg:w-[500px] mt-3 text-lg text-gray-600 dark:text-gray-300">
          With over a decade of experience as a full-stack web developer, I
          possess a profound expertise in technologies including NextJS,
          Sveltekit, JavaScript, TypeScript, among others.
        </p>
        <Image
          src="/images/me_2.PNG"
          alt="About Luis"
          width={400}
          height={300}
          className="rounded-xl"
        />
      </section>

      {/*Quick Bio Section*/}
      <section className="bg-gradient-to-r from-yellow-200 via-green-200 to-green-500">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-4xl font-bold text-center text-white">
            Luis Ruiz
          </h1>
          <p className="text-center text-xl mt-2 text-gray-800">
            New York City Native
          </p>

          <div className="mt-8 bg-cover bg-center rounded-full w-48 h-48 mx-auto shadow-lg">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/images/IMG_3287.jpg"
                alt="Luis Ruiz"
                width={200}
                height={200}
                className="top-0 absolute z-10 w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-8 text-center max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed text-gray-800">
              Luis Ruiz, a 35-year-old professional with roots in New York City,
              currently oversees management operations at ruizTechServices.
              Demonstrating a strong commitment to community engagement, Luis
              conducts educational initiatives aimed at enhancing brand
              visibility and trust.
            </p>
            <div className="my-8 text-xl font-bold border-b-4 border-gray-700"></div>
            <h3 className="text-2xl font-bold text-gray-800">
              Professional Skills
            </h3>
            <p className="text-lg mt-2 text-gray-800">
              Luis, with his deep expertise in software development and a
              profound passion for technology, excels in environments that
              demand both technical proficiency and customer engagement. His
              extensive experience spans web design and software development.
              Additionally, Luis is adept at imparting knowledge, offering both
              in-person and online instruction.
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mt-8">Interests</h3>
            <p className="text-lg mt-2 text-gray-800">
              Luis finds pleasure in engaging with complex video games like Red
              Dead Redemption 2, Helldivers 2, and Genshin Impact, which he
              believes stimulate strategic and analytical thinking. His
              enthusiasm for programming is driven by a goal to reach a level of
              expertise where his skills are indispensable to others. So, he
              studies and practices programming in his free time.
              He is currently perfecting his design skills,as well.
            </p>
          </div>
        </main>
      </section>

      <div className="my-10 mx-auto md:container w-3/4 border border-blue-400"></div>

      {/*My Work Section*/}
      <section className="animate-in shadow-2xl mx-auto flex flex-col">
        <div className="text-center md:mx-[300px] bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 p-6 rounded-lg shadow-lg my-5 mx-2">
          <h2 className="text-4xl font-bold text-black drop-shadow-2xl">
            My Work
          </h2>
          <p className="md:mx-10 mt-3 text-lg text-black font-bold">
            I&apos;ve contributed to numerous projects that help companies
            achieve their goals. Here&apos;s a glimpse of my work.
          </p>
        </div>
        <ProjectViewer />
        <GptStore />
      </section>

      {/*Bottom section*/}
      <section className="animate-in shadow-2xl mx-auto flex flex-col md:flex-row md:h-[500px] my-5">
        <div className="flex overflow-hidden h-full md:w-1/2 bg-gradient-to-r from-yellow-200 via-green-200 to-green-500">
          <div className="flex flex-col justify-center text-center w-full font-bold text-4xl gap-5 dark:text-black">
            <h1>Web Designer</h1>
            <h1>Web Developer</h1>
            <h1>DevOps Engineer</h1>
            <h1>Software Engineer</h1>
          </div>
        </div>
        <div className="flex overflow-hidden h-full md:w-1/2 bg-white">
          <div className="flex justify-center items-center align-middle w-full mx-5 my-5 overflow-hidden">
            <Image
              src={"/images/IMG_4818.JPG"}
              alt="Luis"
              width={500}
              height={0}
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>
      <Layout66 />
      <Cta7 />
    </main>
  );
}
