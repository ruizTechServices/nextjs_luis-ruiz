// C:\Users\Gio\OneDrive\Desktop\ruizTechServices\luis-ruiz\nextjs\nextjs_luis-ruiz\app\services\page.js
import Head from "next/head";
import { Layout38 } from "../components/main/layout38";

export default function Services() {
  return (
    <>
      <div className="lg:h-full mx-auto px-4 sm:px-6 lg:px-8 py-12 dark:text-white">
        <div className="text-center mb-48">
          <h1 className="text-4xl font-bold">
            Services Offered by Luis Ruiz
          </h1>
          <p className="mt-4 text-lg">
            I am a full-stack developer with a plethora of abilities and skills
            ready to bring your projects to life.
          </p>
        </div>
        <Layout38
          className="mt-12"
          heading="Web Services"
          description="I can build your website or app for you."
          image={{
            src: "/images/luisIT.jpg",
            alt: "Placeholder image",
          }}
        />
        <br/>
        <br/>
        <Layout38
          className="mt-12"
          heading="Integrations"
          description="I can enable your business to work seamlessly with your existing systems, and newly developed ones."
          image={{
            src: "/images/appsImage.jpg",
            alt: "Placeholder image",
          }}
        />
      </div>
    </>
  );
}
