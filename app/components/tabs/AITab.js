// components/tabs/AITab.js (Server Component)
import Projectai from '../main/iframe_ai';
import GptStore from '../main/gpt_store';

export default function AITab() {
  return (
    <section className="p-10">
      <h2 className="text-4xl font-bold text-center text-black mb-8">
        Artificial Intelligence
      </h2>
      <p className="text-center text-lg text-gray-600 mb-10">
        These are AI projects that I have completed, or am currently
        working on.
      </p>
      <Projectai />
      <GptStore />
    </section>
  );
}