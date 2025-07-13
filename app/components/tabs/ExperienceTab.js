// components/tabs/ExperienceTab.js (Server Component)
import Image from 'next/image';
import RolesSection from '../rolesSection';

export default function ExperienceTab() {
  return (
    <section className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/2 bg-gradient-to-r from-green-200 via-yellow-100 to-yellow-500 p-8 flex items-center justify-center">
        <div className="max-w-lg">
          <RolesSection />
        </div>
      </div>
      <div className="lg:w-1/2 bg-white p-8 flex items-center justify-center">
        <div className="relative w-full max-w-md aspect-square">
          <Image
            src="/images/luisIT.jpg"
            alt="Luis Ruiz Logo"
            layout="fill"
            objectFit="contain"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}