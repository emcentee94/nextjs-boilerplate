"use client"

import { useEffect, useState } from "react"

export default function TaughtfulSurvey() {
  const [answers, setAnswers] = useState<{ [key: string]: string[] }>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const getSessionId = () => {
    try {
      const raw = localStorage.getItem("taughtful_demo")
      if (!raw) return null
      const parsed = JSON.parse(raw)
      return parsed.sessionId || parsed.id || null
    } catch { return null }
  }

  const toggleAnswer = (question: string, option: string) => {
    setAnswers((prev) => {
      const current = prev[question] || []
      return current.includes(option)
        ? { ...prev, [question]: current.filter((a) => a !== option) }
        : { ...prev, [question]: [...current, option] }
    })
  }

  const questions = [
    { id: 'vibe', text: 'First vibe check — Taughtful feels like…', options: ['🚫 Pointless','🤔 Interesting','👍 Promising','🚀 Game-changer'] },
    { id: 'recommend', text: 'Would you tell another teacher about it?', options: ['🙅‍♀️ No way','🤷 Maybe','☕ Staffroom chat worthy','📢 Absolutely'] },
    { id: 'excites', text: 'Which parts excite you most right now?', options: ['📚 Lesson generator','🗂 Curriculum alignment','💡 Trauma-informed approach','🌱 Indigenous perspectives','🛠 Resources hub'] },
    { id: 'gaps', text: 'What feels like the biggest gap?', options: ['🌀 Needs more depth','🖥 UX feels clunky','🧐 Unsure if I can trust alignment','🤷 Not sure how I’d use it','⚡ Other tools already do this better'] },
    { id: 'features', text: 'If Taughtful added something next, what should it be?', options: ['📊 PowerPoints','📝 Quizzes','📄 Worksheets','📈 Assessment trackers','🎛 Classroom management tools'] },
  ] as const

  const submitFeedback = async () => {
    setSubmitting(true)
    try {
      let email: string | null = null
      let userId: string | null = null
      try {
        const raw = localStorage.getItem("taughtful_demo")
        if (raw) {
          const parsed = JSON.parse(raw)
          email = parsed.email || null
          userId = parsed.user_id || parsed.userId || null
        }
      } catch {}

      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: getSessionId(),
          userId,
          email,
          answers,
          uiVersion: 'survey-v1',
          appVersion: process.env.NEXT_PUBLIC_APP_VERSION || null,
          path: typeof window !== 'undefined' ? window.location.pathname : null,
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        })
      })
      const data = await res.json()
      if (res.ok && data.ok) setSubmitted(true)
    } catch (e) {
      console.error('Feedback error:', e)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center rounded-2xl bg-green-50 border border-green-200">
        <p className="text-lg font-semibold">Thanks — that helps shape what we build next.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-center">Taughtful Quick Check-In</h2>
      {questions.map((q) => (
        <div key={q.id} className="space-y-3">
          <p className="font-medium">{q.text}</p>
          <div className="grid grid-cols-2 gap-3">
            {q.options.map((option) => (
              <button
                key={option}
                onClick={() => toggleAnswer(q.id, option)}
                className={`p-3 rounded-xl border text-left transition ${
                  answers[q.id]?.includes(option)
                    ? 'bg-pink-100 border-pink-400'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="text-center">
        <button
          onClick={submitFeedback}
          disabled={submitting}
          className="mt-6 px-6 py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 disabled:opacity-60"
        >
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </div>
    </div>
  )
}


