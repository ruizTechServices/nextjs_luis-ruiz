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
    "Coder",
    "Manager",
    "Producer",
    "Specialist",
    "Mentor",
    "Director",
    "Leader",
    "Writer",
    "Facilitator",
    "Coordinator",
    "Supervisor",
    "Researcher",
    "Planner",
    "craftsman",
    "hacker",
    "problem-solver",
    "tester",
    "optimizer",
    "technologist",
    "scientist",
    "visionary",
    "prototyper",
    "scripter",
    "troubleshooter",
    "systematizer",
    "trainer",
    "collaborator",
    "team-player",
    "tinkerer",
    "puzzle-solver",
    "communicator",
    "documenter",
    "investigator",
    "refiner",
    "compiler",
    "refactorer",
    "modeler",
    "translator",
    "scheduler",
    "constructor",
    "code-reviewer",
    "system-administrator",
    "network-engineer",
    "security-expert",
    "deployment-manager",
    "cloud-architect",
    "data-engineer",
    "database-administrator",
    "software-engineer",
    "hardware-engineer",
    "full-stack-developer",
    "frontend-developer",
    "backend-developer",
    "systems-architect",
  ];

  return (
    <>
      <div className="w-fit border-2 h-[100px] absolute top-10 left-10 z-10 bg-white rounded-full">
        <Image src="/images/luis_ruizLogo.png" width={100} height={100} alt="Luis Ruiz Logo" />
      </div>
      <div className="flex flex-col justify-center items-center h-[700px] bg-gradient-to-bl from-green-200 via-green-400 to-green-500">
        <h1 className="text-7xl md:text-[80px] font-bold text-black">
          I&apos;m a
        </h1>
        <div className="">
          <AnimatedText
            texts={titles}
            speed={1500}
            className="text-indigo-600"
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection; 