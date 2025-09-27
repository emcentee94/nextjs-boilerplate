import {
  SAMPLE_LESSON as sampleLesson,
  SAMPLE_QUIZ as sampleQuiz,
  SAMPLE_UNIT as sampleUnit,
  SAMPLE_PPT as samplePpt,
} from '@/lib/demo-samples'

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

export async function demoGenerateLesson() {
  await delay(900)
  return sampleLesson
}

export async function demoGenerateQuiz() {
  await delay(900)
  return sampleQuiz
}

export async function demoGenerateUnit() {
  await delay(900)
  return sampleUnit
}

export async function demoGeneratePpt() {
  await delay(900)
  return samplePpt
}
