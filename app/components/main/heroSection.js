// C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\heroSection.js
"use client";
import AnimatedText from "../ui/animatedText";

const HeroSection = () => {
  const titles = ["Developer", "Designer", "Creator", "Programmer"];

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-5">
        I am a &nbsp;
        <AnimatedText texts={titles} speed={3000} className="text-indigo-600" />
      </h1>
    </div>
  );
};

export default HeroSection;
