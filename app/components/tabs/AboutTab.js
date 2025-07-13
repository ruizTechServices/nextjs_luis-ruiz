// components/tabs/AboutTab.js (Server Component)
import Paragraphs from '../paragraphs';
import Skills from '../main/skills';

export default function AboutTab() {
  return (
    <>
      <section className="bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 p-10">
        <div className="max-w-4xl mx-auto">
          <Paragraphs />
        </div>
      </section>
      <Skills />
    </>
  );
}