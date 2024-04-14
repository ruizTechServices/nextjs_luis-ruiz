// C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\heroSection.js
"use client";
import AnimatedText from "../ui/animatedText";
import Logo from "../ui/logo";

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
      <Logo className="w-24 h-24 mb-8" />
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-bl from-green-200 via-green-400 to-green-500">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-5">
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
