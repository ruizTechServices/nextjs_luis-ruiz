import React, { useState } from 'react';
import clsx from 'clsx';
import Modal from '../../ui/modal';

const Resume = () => {
  const [email, setEmail] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      console.log(email);
      setIsRevealed(true);
      setIsModalOpen(false);
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Luis Giovanni Ruiz (Gio)</h1>
          <p className={clsx({ obfuscated: !isRevealed, visible: isRevealed })}>New York, NY</p>
          <p className={clsx({ obfuscated: !isRevealed, visible: isRevealed })}>
            Email: <a href="mailto:luisgiovanniruiz44@gmail.com">luisgiovanniruiz44@gmail.com</a>
          </p>
          <p className={clsx({ obfuscated: !isRevealed, visible: isRevealed })}>
            Phone: <a href="tel:+13479013772">+1 (347) 901-3772</a>
          </p>
          <p className={clsx({ obfuscated: !isRevealed, visible: isRevealed })}>
            LinkedIn: <a href="https://www.linkedin.com/in/yourprofile">linkedin.com/in/yourprofile</a>
          </p>
          <p className={clsx({ obfuscated: !isRevealed, visible: isRevealed })}>
            Website: <a href="https://ruiztechservices.com">ruiztechservices.com</a>
          </p>
          <p className={clsx({ obfuscated: !isRevealed, visible: isRevealed })}>
            Website: <a href="https://luisruiz.net">luisruiz.net</a>
          </p>
        </header>

        <section className={clsx("mb-8", { obfuscated: !isRevealed, visible: isRevealed })}>
          <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2">Professional Summary</h2>
          <p className="mt-2">
            Highly skilled concierge with a strong background in computer technology and management.
            Extensive experience in customer service, programming, and project management. Passionate
            about self-improvement and adept at utilizing modern technologies to enhance business
            operations. Proven track record of successfully managing teams and driving customer satisfaction.
          </p>
        </section>

        <section className={clsx("mb-8", { obfuscated: !isRevealed, visible: isRevealed })}>
          <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2">Skills & Abilities</h2>
          <ul className="list-disc list-inside mt-2">
            <li>Attention to detail</li>
            <li>Maintains rapport with customers</li>
            <li>Active listening skills</li>
            <li>Conflict Resolution expert</li>
            <li>Builds customer loyalty</li>
            <li>Bilingual (Spanish/English)</li>
            <li>Excel, Word, Powerpoint</li>
            <li>HTML/CSS/JavaScript</li>
            <li>Full-Stack Web Developer</li>
          </ul>
        </section>

        <section className={clsx("mb-8", { obfuscated: !isRevealed, visible: isRevealed })}>
          <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2">Experience</h2>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Royale Concierge</h3>
            <p className="italic">Concierge | Bronx, NY | June 2024 – Present</p>
            <ul className="list-disc list-inside mt-2">
              <li>Provide exceptional concierge services across various NYC locations.</li>
              <li>Manage client requests efficiently, ensuring high levels of customer satisfaction.</li>
              <li>Develop and maintain strong relationships with clients and service providers.</li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">GCS</h3>
            <p className="italic">Remote Customer Service Associate for Access-A-Ride Vehicles’ passengers | Remote | Nov 2022 – Present</p>
            <ul className="list-disc list-inside mt-2">
              <li>Resolve client issues and inquiries by phone.</li>
              <li>Assist clients with vehicle scheduling, tracking their trip vehicle, and other inquiries.</li>
              <li>Provide top-notch customer service support in a remote setting.</li>
              <li>Efficiently and effectively use communication logs for seamless and discreet interactions.</li>
              <li>Communicate cohesively and efficiently with Supervisors and Team members through trip logs, emails, and phone.</li>
              <li>Ensure excellent rapport with passengers and keep them calm during unfortunate events.</li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Ruiz Home Services</h3>
            <p className="italic">Founder and Owner | Bronx, NY | Feb 2021 – Present</p>
            <ul className="list-disc list-inside mt-2">
              <li>Maintain a team of three.</li>
              <li>Organize and establish dates with clients.</li>
              <li>Obtain payments from clients.</li>
              <li>Organize billing and paystubs.</li>
              <li>Provide free consultations to obtain proper requirements.</li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">McDonald’s</h3>
            <p className="italic">Manager | New York, NY | Jul 2018 – Sep 2021</p>
            <ul className="list-disc list-inside mt-2">
              <li>Managed a team of more than 30 employees.</li>
              <li>Managed shifts with a team of 5 or fewer.</li>
              <li>Managed overnight shifts.</li>
              <li>Created loyalty with guests.</li>
              <li>Graduated from ‘Intro to Management’ course.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2">Projects</h2>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">LetMeExplain</h3>
            <p className="italic">Developer | Dates TBD</p>
            <ul className="list-disc list-inside mt-2">
              <li>Developed an app that transforms rude feedback into constructive criticism.</li>
              <li>Utilized modern programming languages and frameworks to ensure a seamless user experience.</li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">PlayingWithGPT</h3>
            <p className="italic">Project Lead | GitHub | Dates TBD</p>
            <ul className="list-disc list-inside mt-2">
              <li>Led the development of a project using Python, JavaScript, HTML, CSS, and GPT-4 API.</li>
              <li>Focused on security standards and measures to create a robust and user-friendly application.</li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Osvaldybarber.com</h3>
            <p className="italic">Developer | Dates TBD</p>
            <ul className="list-disc list-inside mt-2">
              <li>Designed and developed a comprehensive website for a barber, integrating Supabase for authentication and Stripe for payments.</li>
              <li>Created user and admin dashboards to manage appointments and customer interactions.</li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Twitter Bot</h3>
            <p className="italic">Developer | Dates TBD</p>
            <ul className="list-disc list-inside mt-2">
              <li>Built a Twitter bot using Next.js, JavaScript, Tailwind CSS, Node.js, Supabase, Google Cloud, and Azure products.</li>
              <li>Implemented real-time interactions and automated posts to enhance social media engagement.</li>
            </ul>
          </div>
        </section>

        <section className={clsx("mb-8", { obfuscated: !isRevealed, visible: isRevealed })}>
          <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2">Education</h2>
          <p className="mt-2">University of Phoenix; Phoenix, AZ | Feb 2018 – Apr 2021</p>
          <p className="mt-2">Bachelor of Computer Science | 3.5 GPA</p>
          <p className="mt-2">Earned CFSU certification</p>
        </section>

        <section className={clsx("mb-8", { obfuscated: !isRevealed, visible: isRevealed })}>
          <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2">Leadership</h2>
          <ul className="list-disc list-inside mt-2">
            <li>Owns and operates Ruiz Home Services, employing a team of five with the potential for growth and expansion.</li>
            <li>Experience as a manager and team leader in multiple occasions.</li>
            <li>Runs RuizTechServices independently.</li>
          </ul>
        </section>

        <section className={clsx("mb-8", { obfuscated: !isRevealed, visible: isRevealed })}>
          <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2">Languages</h2>
          <ul className="list-disc list-inside mt-2">
            <li>English</li>
            <li>Spanish</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2">References</h2>
          <p className="mt-2">Available upon request.</p>
        </section>

        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 p-2 rounded mb-2"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Submit
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Resume;
