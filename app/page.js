//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\page.js
import Image from "next/image";
import HeroSection from "./components/main/heroSection";
import Link from "next/link";

export default function Portfolio() {
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
        </div>
      </section>
    </main>
  );
}
