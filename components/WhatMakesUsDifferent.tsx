import React from "react";

// Paste this file into Cursor as, e.g., components/WhatMakesUsDifferent.tsx
// Requires Tailwind CSS.
// Drop <WhatMakesUsDifferent /> into your landing page.

export default function WhatMakesUsDifferent() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDE5DA] via-[#FDE5DA]/70 to-white py-20">
      {/* Background sprinkles */}
      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute -top-10 left-10 h-24 w-24 opacity-20" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg className="absolute bottom-10 right-6 h-16 w-16 opacity-20" viewBox="0 0 100 100" fill="currentColor">
          <rect width="100" height="100" rx="20" />
        </svg>
      </div>

      <div className="container mx-auto max-w-6xl px-6">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-block rounded-full bg-white/70 px-4 py-1 text-sm font-semibold text-[#333] shadow-sm ring-1 ring-black/5 font-[Fredoka]">
            What Makes Us Different
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#333] sm:text-4xl font-[Fredoka]">
            Built for teachers, not tech demos.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#333]/80 font-[Nunito]">
            Most AI tools generate text from patterns — quick, but not always accurate, safe, or aligned with what classrooms need. Taughtful is different. <span className="font-semibold">We have incorporated RAG — Retrieval‑Augmented Generation.</span>
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-[#333]/80 font-[Nunito]">
            Before creating a lesson scaffold, our AI retrieves from <span className="font-semibold">vetted curriculum and pedagogy resources</span> instead of random internet text. The result: outputs you can trust — aligned, responsible, and ready to use in Australian classrooms.
          </p>
        </div>

        {/* Pillars */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Pillar
            color="bg-[#FD6585]"
            title="Trustworthy by Design"
            desc="RAG grounds every lesson in vetted sources — not guesswork." 
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            }
          />
          <Pillar
            color="bg-[#888625]"
            title="Culturally Respectful"
            desc="Aboriginal pedagogies are built in from the ground up, not added later." 
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a8 8 0 10-14.8 0" />
              </svg>
            }
          />
          <Pillar
            color="bg-[#FF9A2E]"
            title="Trauma‑Informed by Default"
            desc="Scaffolds that are safe, inclusive, and regulating for every learner." 
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21s-6-4.35-6-9a6 6 0 1112 0c0 4.65-6 9-6 9z" />
              </svg>
            }
          />
          <Pillar
            color="bg-[#333333]"
            title="Curriculum‑Precise"
            desc="Every output aligns to the Australian Curriculum v9 and state requirements." 
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16v16H4z" />
                <path d="M7 8h10M7 12h6M7 16h4" />
              </svg>
            }
          />
        </div>

        {/* RAG Explainer Card */}
        <div className="mt-12">
          <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5 sm:p-8">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-3xl">
                <h3 className="text-xl font-bold text-[#333] font-[Fredoka]">What does RAG mean?</h3>
                <p className="mt-2 text-[#333]/80 font-[Nunito]">
                  <span className="font-semibold">RAG = Retrieval‑Augmented Generation.</span> Think of it as a <span className="font-semibold">librarian with guardrails</span>:
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-[#333]/80 font-[Nunito]">
                  <li><span className="font-medium">Finds the right book first</span> (retrieves vetted sources)</li>
                  <li><span className="font-medium">Then helps the AI write from it</span> (generation that's accurate, safe, and culturally respectful)</li>
                </ul>
              </div>
              <div className="w-full max-w-sm flex-shrink-0">
                {/* Simple visual compare card */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-black/10 p-4 text-center">
                    <p className="text-sm font-semibold text-[#333] font-[Fredoka]">Without RAG</p>
                    <p className="mt-2 text-xs text-[#333]/70 font-[Nunito]">AI guesses from patterns</p>
                  </div>
                  <div className="rounded-xl border border-black/10 bg-[#FDE5DA] p-4 text-center">
                    <p className="text-sm font-semibold text-[#333] font-[Fredoka]">With RAG</p>
                    <p className="mt-2 text-xs text-[#333]/70 font-[Nunito]">Grounded in vetted sources</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Row */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#beta" className="rounded-full bg-[#FD6585] px-5 py-2 text-sm font-semibold text-white shadow hover:opacity-95 font-[Fredoka]">
                Join Free Beta
              </a>
              <span className="text-xs text-[#333]/60 font-[Nunito]">AI you can trust because it's built for Australian classrooms.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillar({
  title,
  desc,
  color,
  icon,
}: {
  title: string;
  desc: string;
  color: string; // Tailwind bg color class
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full ${color} text-white shadow`}>{icon}</div>
      <h3 className="text-lg font-bold text-[#333] font-[Fredoka]">{title}</h3>
      <p className="mt-2 text-sm text-[#333]/80 font-[Nunito]">{desc}</p>
    </div>
  );
}
