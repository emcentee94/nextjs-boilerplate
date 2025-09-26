import dynamic from "next/dynamic"

const LessonGeneratorPreview = dynamic(() => import("@/components/lesson-generator-preview"), { ssr: false })

export default function TeacherDashboard() {
  return <LessonGeneratorPreview />
}
