'use client';
import Image from 'next/image';

export default function Paragraphs() {
  const now = new Date();
  const yrsRuizTech = now.getFullYear() - 2024; // Sept 2024 → today
  const yrsTechExp = 10; // tech + concierge tinkering

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 relative overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-purple-50 pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* HERO */}
        <section className="text-center space-y-6">
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-25 blur-lg group-hover:opacity-40 transition"></div>
            <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-xl ring-4 ring-white/70">
              <Image
                src="/images/meinasuit.png"
                alt="Portrait of Gio"
                fill
                sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                className="object-cover transition-transform group-hover:scale-105"
                priority
              />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-900">
            Gio (Luis Giovanni Ruiz)
          </h1>
          <p className="text-lg text-gray-800 leading-relaxed max-w-2xl mx-auto">
            I'm a Bronx-born, bilingual full-stack AI engineer and founder of RuizTechServices LLC (est. 2024). My flagship product <em>24Hour-AI</em> is a high-performance LLM platform achieving sub-200ms latency, 99.9% uptime, and 30% cost optimization while supporting 100+ concurrent users. I specialize in scalable AI infrastructure and enterprise-grade solutions that deliver measurable business value.
          </p>
          <p className="italic text-sm text-gray-500">“Learn → Build → Ship → Iterate.”</p>
        </section>

      </div>
    </div>
  );
}
