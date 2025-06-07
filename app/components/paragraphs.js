'use client';
import Image from 'next/image';

export default function Paragraphs() {
  const now = new Date();
  const age = now.getFullYear() - 1988;
  const yrsRuizTech = now.getFullYear() - 2024; // Sept 2024 → today
  const yrsTechExp = 10; // tech + concierge hardware tinkering

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="text-center flex flex-col items-center pt-8">
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-xl ring-4 ring-white/70">
          <Image
            src="/images/meinasuit.png"
            alt="Luis Giovanni Ruiz portrait"
            fill
            sizes="144px"
            className="object-cover"
            priority
          />
        </div>

        <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-800">
          Luis Giovanni Ruiz
        </h1>

        <p className="mt-3 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Building intuitive <span className="font-semibold text-blue-600">AI-powered</span> tools, one solo sprint at a time.
        </p>

        <p className="mt-2 text-sm text-gray-500 italic">
          “The way of success is the continuous pursuit of knowledge.” – Napoleon Hill
        </p>
      </section>

      {/* ── QUICK STATS ─────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Years in Tech', value: `${yrsTechExp}+`, color: 'blue' },
          { label: 'Years @ Ruiz Tech', value: `${yrsRuizTech}+`, color: 'green' },
          { label: 'Age', value: age, color: 'purple' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center shadow-lg"
          >
            <div className={`text-3xl font-bold text-${color}-600 mb-1`}>{value}</div>
            <div className="text-gray-700 font-medium">{label}</div>
          </div>
        ))}
      </section>

      {/* ── CARD GRID ───────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Journey */}
        <Card
          iconBg="blue"
          title="Professional Journey"
          paragraphs={[
            'Originally a concierge who coded after-hours, I fused customer-obsessed service with full-stack engineering.',
            'Early hardware roots at Compulogic sharpened my PCB repair & diagnostic chops—skills I now apply to fearless debugging.',
          ]}
        />

        {/* Current Focus */}
        <Card
          iconBg="green"
          title="Current Focus"
          paragraphs={[
            'Launching solo SaaS products through Ruiz Tech Services: 24Hour-AI (pay-per-use LLM platform) and SupaMail (SMTP-as-a-Service for Supabase devs).',
            'Still part-time at Royale Company—face-to-face problem-solving keeps my empathy sharp.',
          ]}
        />

        {/* Stack */}
        <Card
          iconBg="purple"
          title="Technical Stack"
          paragraphs={[
            'JavaScript (ES6+), Python, React/Next.js (App Dir), Tailwind CSS, Supabase, PostgreSQL/pgvector, Pinecone, Clerk Auth, Square & Stripe APIs.',
            'Comfort with DevOps glue—Docker, Nginx, Ngrok, PM2—and local LLMs via Ollama.',
          ]}
        />

        {/* Growth */}
        <Card
          iconBg="yellow"
          title="Learning & Growth"
          paragraphs={[
            '60 credits toward A.S. Computer Science (BMCC) + coursework at University of Phoenix.',
            'Cisco IT Essentials certified; diving deep into Transformers, TensorFlow, and Neovim workflows.',
          ]}
        />
      </section>

      {/* ── ENTREPRENEURSHIP ────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 border border-white/30 rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <ArrowIcon className="text-indigo-600 mr-3" /> Diverse Experience
        </h2>
        <p className="text-gray-700 leading-relaxed">
          From <span className="font-semibold text-indigo-600">Ruiz Home Services</span> handyman gigs to
          gig-economy logistics (Postmates, Uber Eats, Amazon), I’ve worn every operational hat—giving
          me a 360° view of customer journeys and lean business execution.
        </p>
      </section>

      {/* ── FUTURE & CTA ────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 border border-white/30 rounded-2xl p-8 shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 flex justify-center items-center">
          <CheckIcon className="text-green-600 mr-3" /> Ready for the Next Challenge
        </h2>
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
          I’m keen to bring solo-builder velocity and AI expertise to forward-thinking teams—
          whether that’s <span className="font-semibold text-blue-600">Google</span>,
          <span className="font-semibold text-green-600">OpenAI</span>, or a daring startup.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <CTA href="https://www.linkedin.com/in/ruiz44/" color="blue">
            Connect on LinkedIn
          </CTA>
          <CTA href="https://ruiztechservices.com" color="gray">
            Visit My Website
          </CTA>
        </div>
      </section>
    </div>
  );
}

/* ---------- Small helper components ---------- */
function Card({
  iconBg,
  title,
  paragraphs,
}: {
  iconBg: 'blue' | 'green' | 'purple' | 'yellow';
  title: string;
  paragraphs: string[];
}) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl p-8 shadow-lg">
      <div className="flex items-center mb-5">
        <div className={`w-12 h-12 bg-${iconBg}-100 rounded-full flex items-center justify-center mr-4`}>
          {/* generic icon, replace as desired */}
          <svg className={`w-6 h-6 text-${iconBg}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      {paragraphs.map((p) => (
        <p key={p.slice(0, 15)} className="text-gray-700 leading-relaxed mb-4">
          {p}
        </p>
      ))}
    </div>
  );
}

function CTA({ href, color, children }: { href: string; color: 'blue' | 'gray'; children: React.ReactNode }) {
  const base = color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} text-white px-6 py-3 rounded-lg font-semibold transition-colors`}
    >
      {children}
    </a>
  );
}

/* ---------- Hero icons ---------- */
const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
  </svg>
);
