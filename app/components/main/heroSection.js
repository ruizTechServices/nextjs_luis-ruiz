// C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\heroSection.js
"use client";
import AnimatedText from "../ui/animatedText";
import Image from "next/image";

const HeroSection = () => {
  const titles = [
    "Developer",
    "Designer",
    "Creator",
    "Programmer",
    "Thinker",
    "Builder",
    "Technician",
    "Strategist",
    "Consultant",
  ];

  return (
    <>
      <div className="w-fit border-2 h-[100px] absolute top-10 left-10 z-10 bg-white rounded-full">
        <Image src="/images/luis_ruizLogo.png" width={100} height={100} />
      </div>
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-bl from-green-200 via-green-400 to-green-500">
        <h1 className="text-7xl md:text-[80px] font-bold text-black mb-5">
          I am a &nbsp;
          <AnimatedText
            texts={titles}
            speed={1500}
            className="text-indigo-600"
          />
        </h1>
      </div>
    </>
  );
};

export default HeroSection;
