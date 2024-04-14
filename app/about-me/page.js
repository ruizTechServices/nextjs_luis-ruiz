// Import Image from next/image for handling optimized images.
import Image from "next/image";
import ProfileCard from "../components/ui/profileCard";

// Define the metadata for the page
export const metadata = {
  title: "About Me - Luis Ruiz",
  description: "Learn more about Luis Ruiz, a full-stack web developer.",
};

export default function AboutMe() {
  return (
    <div>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 py-10 text-center">
        <h1 className="text-6xl font-bold bg-orange-700 text-white rounded-2xl shadow-2xl p-5">
          About Luis Ruiz
        </h1>
        <p className="mt-3 text-2xl">Full-Stack Web Developer</p>

        <div className="mt-6">
          <Image
            src="/images/luisIT.jpg"
            alt="Luis Ruiz"
            width={144}
            height={144}
            className="rounded-full"
          />
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-4">
          
          <ProfileCard
            title="Web Developer"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in neque et nisl convallis finibus non ac libero. Mauris ultrices eros sit amet augue vestibulum, et molestie enim consequat. Fusce in magna quis lorem suscipit ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
          />
          <ProfileCard
            title="Web Developer"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in neque et nisl convallis finibus non ac libero. Mauris ultrices eros sit amet augue vestibulum, et molestie enim consequat. Fusce in magna quis lorem suscipit ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
          />
          <ProfileCard
            title="Web Developer"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in neque et nisl convallis finibus non ac libero. Mauris ultrices eros sit amet augue vestibulum, et molestie enim consequat. Fusce in magna quis lorem suscipit ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
          />
          <ProfileCard
            title="Web Developer"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in neque et nisl convallis finibus non ac libero. Mauris ultrices eros sit amet augue vestibulum, et molestie enim consequat. Fusce in magna quis lorem suscipit ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
          />
        </div>
      </main>
    </div>
  );
}
