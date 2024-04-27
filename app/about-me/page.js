// Import Image from next/image for handling optimized images.
import Image from "next/image";

// Define the metadata for the page
export const metadata = {
  title: "About Me - Luis Ruiz",
  description:
    "Learn more about Luis Ruiz, and general manager with a passion for community service and self-improvement.",
};

export default function AboutMe() {
  return (
    <div>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 py-10 text-center">
        <h1 className="text-6xl font-bold bg-orange-700 text-white rounded-2xl shadow-2xl p-5">
          About Luis Ruiz
        </h1>
        <p className="mt-3 text-2xl">New York City Native</p>

        <div className="mt-6 bg-cover bg-center rounded-full w-40 h-40 mx-auto">
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

        <div className="mt-6 text-left max-w-2xl mx-auto">
          <p className="text-lg">
            Luis Ruiz, a 35-year-old professional with roots in New York City, currently oversees management operations at Compulogic. Demonstrating a strong commitment to community engagement, Luis conducts educational initiatives aimed at enhancing brand visibility and trust.
          </p>
          <div className="m-20 text-xl font-bold border-b-2 border-gray-700"></div>
          <br />
          <p className="mt-4 text-lg">
            <h3 className="m-3 text-xl font-bold border-b-2 border-red-200">Professional Skills</h3>
            With expertise in general maintenance and a profound passion for business growth and personal development, Luis excels in diverse environments.
            <br />
            He holds a Bachelor&apos;s degree in Information Technology from the University of Phoenix, underscoring his strong foundation in technical skills.
            <br />
            <h3 className="m-3 text-xl font-bold border-b-2 border-red-200">Interests</h3>
            Luis finds pleasure in engaging with complex video games like Red Dead Redemption 2, Helldivers 2, and Genshin Impact, which he believes stimulate strategic and analytical thinking. His enthusiasm for programming is driven by a goal to reach a level of expertise where his skills are indispensable to others.
          </p>
        </div>

      </main>
    </div>
  );
}
