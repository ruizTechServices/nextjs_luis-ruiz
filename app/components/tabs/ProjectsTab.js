// components/tabs/ProjectsTab.js (Server Component)
import ProjectViewer from '../main/iframe';

export default function ProjectsTab() {
  return (
    <section className="p-10">
      <h2 className="text-4xl font-bold text-center text-black mb-8">
        My Work
      </h2>
      <p className="text-center text-lg text-gray-600 mb-10">
        These are projects that I have completed, or am currently working
        on.
      </p>
      <ProjectViewer />
    </section>
  );
}