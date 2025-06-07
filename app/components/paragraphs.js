'use client';
import Image from 'next/image';

export default function Paragraphs() {
  const now = new Date();
  const age = now.getFullYear() - 1988;
  const yrsRuizTech = now.getFullYear() - 2024; // Sept 2024 → today
  const yrsTechExp = 10; // tech + concierge hardware tinkering

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background blobs (unchanged) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-12 sm:space-y-16 lg:space-y-20">

        {/* ── HERO ───────────────────────────────────────────── */}
        <section className="text-center flex flex-col items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/80 backdrop-blur-sm">
              <Image
                src="/images/meinasuit.png"
                alt="Portrait of Gio"
                fill
                sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
                Gio (Luis Giovanni Ruiz)
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
              Bronx-born, <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">bilingual</span> solo-builder shipping AI-driven web products from laptop to production—no excuses, just commits.
            </p>

            <p className="text-xs sm:text-sm lg:text-base text-gray-500 italic max-w-2xl mx-auto px-4">
              “Learn → Build → Ship → Iterate.”  That’s the loop.
            </p>
          </div>
        </section>

        {/* ── QUICK STATS ────────────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[
            { label: 'Years in Tech', value: `${yrsTechExp}+`, gradient: 'from-blue-500 to-cyan-500' },
            { label: 'Years @ Ruiz Tech', value: `${yrsRuizTech}+`, gradient: 'from-green-500 to-emerald-500' },
            { label: 'Age', value: age, gradient: 'from-purple-500 to-violet-500' },
          ].map(({ label, value, gradient }) => (
            <div
              key={label}
              className="group relative bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className={`text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
                  {value}
                </div>
                <div className="text-sm sm:text-base lg:text-lg text-gray-700 font-semibold">{label}</div>
              </div>
            </div>
          ))}
        </section>

        {/* ── CARD GRID ─────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Path So Far */}
          <Card
            iconBg="blue"
            title="Path So Far"
            paragraphs={[
              'Jumped into tech July 2023 at Compulogic (PA) fixing boards and chasing elusive shorts.',
              'Moved to NYC Aug 2024—concierge by day, code by night—sharpened service instincts that shape everything I ship.',
            ]}
            gradient="from-blue-500/10 to-cyan-500/10"
            iconGradient="from-blue-500 to-cyan-500"
          />

          {/* Building Now */}
          <Card
            iconBg="green"
            title="Building Now"
            paragraphs={[
              '24Hour-AI — pay-as-you-go LLM platform (main product under Ruiz Tech Services, LLC since Sept 2024).',
              'Pushing steady commits to GitHub and refining live sites on luis-ruiz.com.',
              'Solo sprinting on feature requests, docs, and customer onboarding.',
            ]}
            gradient="from-green-500/10 to-emerald-500/10"
            iconGradient="from-green-500 to-emerald-500"
          />

          {/* Toolbox */}
          <Card
            iconBg="purple"
            title="Toolbox"
            paragraphs={[
              'Front-end: Next.js (App Router), React, Tailwind, ShadCN.',
              'Back-end & AI: Python, Node, Flask, Supabase, Postgres/pgvector, Pinecone, OpenAI & HuggingFace APIs.',
              'Infra & Ops: Docker, Nginx, Ngrok, PM2, local LLaMA via Ollama.',
            ]}
            gradient="from-purple-500/10 to-violet-500/10"
            iconGradient="from-purple-500 to-violet-500"
          />

          {/* Leveling Up */}
          <Card
            iconBg="yellow"
            title="Leveling Up"
            paragraphs={[
              'Building a local, offline chatbot—privacy-first and blazing fast.',
              'Deep dives: TensorFlow, LLaMA fine-tuning, Neovim workflows.',
              'Certs & skills from my LinkedIn—Cisco IT Essentials, bilingual comms, relentless troubleshooting—keep stacking.',
            ]}
            gradient="from-yellow-500/10 to-orange-500/10"
            iconGradient="from-yellow-500 to-orange-500"
          />
        </section>



        {/* ── FEATURE SECTIONS ─────────────────────────────── */}
        <div className="space-y-6 sm:space-y-8">
          {/* Hustles & Street Smarts */}
          <section className="relative group bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                  <ArrowIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                Hustles & Street Smarts
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                Ruiz Home Services handyman gigs, Postmates bike runs, Amazon van shifts—every side-quest honed my
                <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mx-1">service DNA</span>
                and bootstrapped Ruiz Tech Services from The Bronx.
              </p>
            </div>
          </section>

          {/* Future & CTA */}
          <section className="relative group bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex justify-center items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                  <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                Looking for My Next Remote Adventure
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-6 sm:mb-8">
                Drop me into your codebase or green-field idea—I’ll ship MVPs at Gio speed. Contract, full-time, or collab—let’s talk.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 lg:gap-6">
                <CTA href="https://github.com/ruizTechServices" color="blue">
                  Peek My GitHub
                </CTA>
                <CTA href="https://luis-ruiz.com" color="gray">
                  Portfolio Site
                </CTA>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ────────────── HELPER COMPONENTS ─────────────── */
function Card({ iconBg, title, paragraphs, gradient, iconGradient }) {
  return (
    <div className="group relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className="relative">
        <div className="flex items-center mb-4 sm:mb-6">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r ${iconGradient} rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{title}</h3>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {paragraphs.map((p, index) => (
            <p key={index} className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function CTA({ href, color, children }) {
  const baseClasses = "relative group px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden";
  
  if (color === 'blue') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700`}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </a>
    );
  }
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </a>
  );
}

/* ────────────── ICONS ─────────────── */
const ArrowIcon = (props) => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CheckIcon = (props) => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
  </svg>
);
