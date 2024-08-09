import { FaPaintBrush, FaCode, FaServer, FaCogs } from 'react-icons/fa';

const roles = [
  {
    title: "Web Designer",
    icon: FaPaintBrush,
    description: "Crafting visually stunning and intuitive user interfaces that captivate and engage.",
  },
  {
    title: "Web Developer",
    icon: FaCode,
    description: "Building robust, scalable web applications with cutting-edge technologies.",
  },
  {
    title: "DevOps Engineer",
    icon: FaServer,
    description: "Streamlining development processes and ensuring smooth, efficient deployments.",
  },
  {
    title: "Software Engineer",
    icon: FaCogs,
    description: "Architecting and implementing complex software solutions to solve real-world challenges.",
  },
];

export default function RolesSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-extrabold text-black mb-6">
        Wearing Many Hats in Tech
      </h2>
      <p className="text-lg text-black mb-8">
        With a diverse skill set and a passion for innovation, I bring a unique blend of creativity and technical expertise to every project.
      </p>
      <div className="grid grid-cols-1 gap-6">
        {roles.map((role, index) => (
          <div key={index} className="border-2 border-black bg-white bg-opacity-10 p-4 rounded-lg backdrop-filter backdrop-blur-lg transition-all duration-300 hover:bg-opacity-20 hover:transform hover:scale-105">
            <div className="flex items-center mb-2">
              <role.icon className="text-3xl text-yellow-300 mr-3" />
              <h3 className="text-xl font-bold text-black">{role.title}</h3>
            </div>
            <p className="text-sm text-black">{role.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}