import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";

export default function Services() {
  return (
    <Fragment>
      <Head>
        <title>Luis Ruiz - Services</title>
        <meta
          name="description"
          content="Discover the professional services offered by Luis Ruiz, a full-stack developer with a wide range of skills."
        />
      </Head>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Services Offered by Luis Ruiz
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            I am a full-stack developer with a plethora of abilities and skills
            ready to bring your projects to life.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Full-Stack Website Development
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              I build full-stack websites tailored to your needs for a flat fee
              of $1000. Development time ranges from 24 to 360 hours.
            </p>
          </div>
          <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Web App Development
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              Creating dynamic and responsive web apps for $500. Transform your
              ideas into reality with modern web technologies.
            </p>
          </div>
          <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Mobile App Development
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              Developing high-quality mobile apps for both Android and iOS
              platforms for $1000. Bring your mobile app idea to life.
            </p>
          </div>
          {/* Add more cards for other services as needed */}
        </div>
      </div>
    </Fragment>
  );
}
