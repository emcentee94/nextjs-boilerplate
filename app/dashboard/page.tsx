"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  BookOpenCheck,
  Layers,
  ListChecks,
  FileText,
  Presentation,
  Sparkles,
  Smile,
  Timer,
  BarChart3,
  HelpCircle,
  ChevronRight,
  CheckCircle2,
  Award,
  LibraryBig,
  ShieldQuestion,
  HeartHandshake,
  UsersRound
} from "lucide-react"
// Removed local Header to avoid duplicate with global layout header

const statItems = [
  { icon: <Timer className="w-4 h-4" />, label: "Time Saved", value: "3.8 hrs" },
  { icon: <BarChart3 className="w-4 h-4" />, label: "Lessons This Week", value: "7" },
  { icon: <Sparkles className="w-4 h-4" />, label: "Engagement Bump", value: "+14%" },
]

const toolCards = [
  { icon: <BookOpenCheck className="w-5 h-5" />, title: "Lesson Plan", desc: "Aligned scaffold in minutes", href: "/generator/profile" },
  { icon: <Layers className="w-5 h-5" />, title: "Unit Plan", desc: "Scope & sequence builder (soon)", href: "#" },
  { icon: <ListChecks className="w-5 h-5" />, title: "Quiz", desc: "Auto‑items with distractors (soon)", href: "#" },
  { icon: <FileText className="w-5 h-5" />, title: "Worksheet", desc: "Differentiated tasks (soon)", href: "#" },
  { icon: <Presentation className="w-5 h-5" />, title: "PPT Slides", desc: "Clean decks, fast (soon)", href: "#" },
]

const pdTabs = [
  {
    key: "cultural",
    label: "Cultural Safety",
    color: "bg-[#888625]",
    icon: <LibraryBig className="w-4 h-4" />,
    bullets: [
      "Localise examples before generalising",
      "Protocols for Country Acknowledgment in lessons",
      "Practical do/don'ts for classroom dialogue",
    ],
  },
  {
    key: "trauma",
    label: "Trauma‑Informed",
    color: "bg-[#FD6585]",
    icon: <ShieldQuestion className="w-4 h-4" />,
    bullets: [
      "Predictable routines & transparent goals",
      "Low‑stimulus options in every activity",
      "Choice scaffolds: task, time, tool, team",
    ],
  },
  {
    key: "wellbeing",
    label: "Classroom Wellbeing",
    color: "bg-[#FF9A2E]",
    icon: <HeartHandshake className="w-4 h-4" />,
    bullets: [
      "5‑minute regulation warmups",
      "Positive behaviour micro‑scripts",
      "Repair cycles that aren't performative",
    ],
  },
  {
    key: "inclusion",
    label: "Inclusive Pedagogy",
    color: "bg-[#333333]",
    icon: <UsersRound className="w-4 h-4" />,
    bullets: [
      "UDL checkpoints baked into tasks",
      "Language‑light instructions & visuals",
      "Assessment flexibility without chaos",
    ],
  },
]

function StatCard({ icon, label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-50">
        {icon}
      </div>
      <div className="leading-tight">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-900">{value}</p>
      </div>
    </motion.div>
  )
}

function ToolCard({ icon, title, desc, href }) {
  return (
    <a href={href} className="group">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="h-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="mb-3 flex items-center gap-2">
          <div className="rounded-xl bg-gray-50 p-2">{icon}</div>
          <ChevronRight className="ml-auto h-4 w-4 text-gray-400 opacity-0 transition group-hover:opacity-100" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-xs text-gray-500">{desc}</p>
      </motion.div>
    </a>
  )
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
      <Award className="h-3.5 w-3.5" /> {children}
    </span>
  )
}

function PDTabStrip({ active, setActive }) {
  return (
    <div className="mb-3 flex flex-wrap gap-2">
      {pdTabs.map((t) => (
        <button
          key={t.key}
          onClick={() => setActive(t.key)}
          className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white transition focus:outline-none ${
            active === t.key ? `${t.color}` : `${t.color} opacity-70 hover:opacity-90`
          }`}
        >
          {t.icon}
          {t.label}
        </button>
      ))}
    </div>
  )
}

function PDTabPanel({ active }) {
  const tab = pdTabs.find((t) => t.key === active) ?? pdTabs[0]
  return (
    <motion.div
      key={active}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
    >
      <div className="mb-2 flex items-center gap-2">
        <div className={`rounded-xl px-2 py-1 text-xs font-semibold text-white ${tab.color}`}>{tab.label}</div>
      </div>
      <ul className="ml-4 list-disc text-sm text-gray-700">
        {tab.bullets.map((b, i) => (
          <li key={i} className="leading-7">{b}</li>
        ))}
      </ul>
      <div className="mt-3 text-xs text-gray-500">
        Micro‑learning cards · Save to favourites · Add to lesson with one click
      </div>
    </motion.div>
  )
}

function WellbeingMeter() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-900">
        <Smile className="h-4 w-4" /> Wellbeing Check‑in
      </div>
      <div className="text-xs text-gray-500">How are you arriving today?</div>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs">😫</span>
        <input type="range" min={0} max={10} defaultValue={6} className="w-full accent-[#FD6585]" />
        <span className="text-xs">😎</span>
      </div>
      <div className="mt-3 rounded-xl bg-gray-50 p-3 text-xs text-gray-600">
        Tip: 3 breaths, 30 seconds. Predictability > perfection.
      </div>
    </div>
  )
}

function TeachingStyle() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-900">
        <Sparkles className="h-4 w-4" /> Teaching Style
      </div>
      <select className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
        <option>The Guide (facilitate & question)</option>
        <option>The Explorer (project‑based)</option>
        <option>The Coach (explicit & stepwise)</option>
        <option>The Curator (resources first)</option>
      </select>
      <div className="mt-3 text-xs text-gray-500">Used to tailor tone, pacing, and activity choices.</div>
    </div>
  )
}

function DailyPrompt() {
  const prompts = [
    "Tiny win from this week? Write it down.",
    "Pick one thing to do worse today — but finish it.",
    "Swap a paragraph for a picture in one task.",
    "Ask: where could student choice be 10% higher?",
  ]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % prompts.length), 5500)
    return () => clearInterval(t)
  }, [])
  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
    >
      <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-900">
        <HelpCircle className="h-4 w-4" /> Daily Prompt
      </div>
      <div className="text-sm text-gray-700">{prompts[idx]}</div>
    </motion.div>
  )
}

function Achievements() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
        <CheckCircle2 className="h-4 w-4" /> Your Badges
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge>Curriculum Master</Badge>
        <Badge>Resilient Educator</Badge>
        <Badge>Inclusive Planner</Badge>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [name, setName] = useState<string>("")
  const [activePD, setActivePD] = useState(pdTabs[0].key)

  useEffect(() => {
    try {
      const candidates = [
        "demo_name",
        "demoUserName", 
        "taughtful_demo_name",
        "demo_user",
      ]
      
      for (const key of candidates) {
        const v = localStorage.getItem(key)
        if (!v) continue
        
        if (key === "demo_user") {
          const obj = JSON.parse(v)
          if (obj?.name) {
            setName(obj.name as string)
            break
          }
        } else {
          setName(v)
          break
        }
      }
    } catch {}
  }, [])

  return (
    <div className="min-h-screen bg-[#FDE5DA]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 font-fredoka">
              G'DAY, {name || "Teacher"} 👋
            </h1>
            <p className="mt-1 text-sm text-gray-600">Welcome back to your hub. Built for teachers, not tech demos.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:w-auto">
            {statItems.map((s, i) => (
              <StatCard key={i} {...s} />
            ))}
          </div>
        </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Center Column: Tools */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#FDE5DA] via-white to-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-base font-semibold text-gray-900">Lesson Tools</div>
              <a href="/resources" className="text-xs font-semibold text-[#888625] hover:underline">Resource Library</a>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {toolCards.map((t) => (
                <ToolCard key={t.title} {...t} />
              ))}
            </div>
          </div>

          {/* PD Tabs */}
          <div className="mt-5">
            <PDTabStrip active={activePD} setActive={setActivePD} />
            <PDTabPanel active={activePD} />
          </div>
        </div>

        {/* Right Column: Profile & Wellbeing */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="mb-2 text-sm font-semibold text-gray-900">Your Profile</div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#FD6585]" />
              <div className="leading-tight">
                <div className="text-sm font-medium text-gray-900">{name || "Demo Teacher"}</div>
                <div className="text-xs text-gray-500">Years 7–10 · English · VIC</div>
              </div>
            </div>
          </div>

          <TeachingStyle />
          <WellbeingMeter />
          <DailyPrompt />
          <Achievements />
        </div>
      </div>

        {/* Footer Fun Fact */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-4 text-xs text-gray-600 shadow-sm">
          Did you know? Swapping one written response for a visual organiser can lift participation by reluctant writers.
        </div>
      </div>
    </div>
  )
}
