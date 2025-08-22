
// app/page.js
import HeroSection from "./components/main/heroSection";
import Arrowdown from "./components/ui/arrowdown";
import ScrollToTopArrow from "./components/ui/ScrollToTopArrow";
import TabNavigation from "./components/ui/TabNavigation";
import AboutTab from "./components/tabs/AboutTab";
import ProjectsTab from "./components/tabs/ProjectsTab";
import ExperienceTab from "./components/tabs/ExperienceTab";
import AITab from "./components/tabs/AITab";
import ChatbotTab from "./components/tabs/ChatbotTab";
import SoundboardTab from "./components/tabs/SoundboardTab";
import TextToSpeechTab from "./components/tabs/TextToSpeechTab";
import ScriptProjectsTab from "./components/tabs/ScriptProjectsTab";
import AuthButton from "./components/main/AuthButton";

function TabContent({ activeTab }) {
  switch (activeTab) {
    case "about":
      return <AboutTab />;
    case "projects":
      return <ProjectsTab />;
    case "experience":
      return <ExperienceTab />;
    case "Artificial Intelligence":
      return <AITab />;
    case "Public Chatbot":
      return <ChatbotTab />;
    case "soundboard":
      return <SoundboardTab />;
    case "text_to_speech":
      return <TextToSpeechTab />;
    case "script-projects":
      return <ScriptProjectsTab />;
    default:
      return <AboutTab />;
  }
}

export default function Portfolio({ searchParams }) {
  const activeTab = searchParams?.tab || 'about';

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <Arrowdown />
      <TabNavigation initialTab={activeTab} />
      <div className="mt-8">
        <TabContent activeTab={activeTab} />
      </div>
      
      
      
      <ScrollToTopArrow />
    </main>
  );
}
