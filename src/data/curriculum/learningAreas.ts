// src/data/curriculum/learningAreas.ts

export type Subject = {
  name: string
  slug: string // kebab-case for routing/URLs
  notes?: string // optional clarifications
}

export type LearningArea = {
  name: string
  slug: string
  overview: string
  // If a learning area is a single subject, put it in `subjects` as length 1.
  subjects: Subject[]
}

export const LEARNING_AREAS: LearningArea[] = [
  {
    name: 'English',
    slug: 'english',
    overview:
      'The F–10 Australian Curriculum identifies and organises essential knowledge, understandings and skills in 8 learning areas.',
    subjects: [{ name: 'English', slug: 'english' }],
  },
  {
    name: 'Mathematics',
    slug: 'mathematics',
    overview:
      'The F–10 Australian Curriculum identifies and organises essential knowledge, understandings and skills in 8 learning areas.',
    subjects: [{ name: 'Mathematics', slug: 'mathematics' }],
  },
  {
    name: 'Science',
    slug: 'science',
    overview:
      'The F–10 Australian Curriculum identifies and organises essential knowledge, understandings and skills in 8 learning areas.',
    subjects: [{ name: 'Science', slug: 'science' }],
  },
  {
    name: 'Health and Physical Education',
    slug: 'health-and-physical-education',
    overview:
      'The F–10 Australian Curriculum identifies and organises essential knowledge, understandings and skills in 8 learning areas.',
    subjects: [
      {
        name: 'Health and Physical Education',
        slug: 'health-and-physical-education',
      },
    ],
  },
  {
    name: 'Humanities and Social Sciences (HASS)',
    slug: 'humanities-and-social-sciences-hass',
    overview:
      'The F–10 Australian Curriculum identifies and organises essential knowledge, understandings and skills in 8 learning areas.',
    subjects: [
      { name: 'Civics and Citizenship', slug: 'civics-and-citizenship' },
      { name: 'Economics and Business', slug: 'economics-and-business' },
      { name: 'Geography', slug: 'geography' },
      { name: 'History', slug: 'history' },
    ],
  },
  {
    name: 'The Arts',
    slug: 'the-arts',
    overview:
      'The F–10 Australian Curriculum identifies and organises essential knowledge, understandings and skills in 8 learning areas.',
    subjects: [
      { name: 'Dance', slug: 'dance' },
      { name: 'Drama', slug: 'drama' },
      { name: 'Media Arts', slug: 'media-arts' },
      { name: 'Music', slug: 'music' },
      { name: 'Visual Arts', slug: 'visual-arts' },
    ],
  },
  {
    name: 'Technologies',
    slug: 'technologies',
    overview:
      'The F–10 Australian Curriculum identifies and organises essential knowledge, understandings and skills in 8 learning areas.',
    subjects: [
      { name: 'Design and Technologies', slug: 'design-and-technologies' },
      { name: 'Digital Technologies', slug: 'digital-technologies' },
    ],
  },
  {
    name: 'Languages',
    slug: 'languages',
    overview:
      'The F–10 Australian Curriculum identifies and organises essential knowledge, understandings and skills in 8 learning areas.',
    subjects: [
      { name: 'Arabic', slug: 'arabic' },
      { name: 'Auslan', slug: 'auslan' },
      { name: 'Chinese', slug: 'chinese' },
      { name: 'French', slug: 'french' },
      { name: 'German', slug: 'german' },
      { name: 'Hindi', slug: 'hindi' },
      { name: 'Indonesian', slug: 'indonesian' },
      { name: 'Italian', slug: 'italian' },
      { name: 'Japanese', slug: 'japanese' },
      { name: 'Korean', slug: 'korean' },
      { name: 'Modern Greek', slug: 'modern-greek' },
      { name: 'Spanish', slug: 'spanish' },
      { name: 'Turkish', slug: 'turkish' },
      { name: 'Vietnamese', slug: 'vietnamese' },
      {
        name: 'Framework for Aboriginal and Torres Strait Islander Languages',
        slug: 'framework-atsi-languages',
        notes: 'Framework',
      },
      {
        name: 'Framework for Classical Languages',
        slug: 'framework-classical-languages',
        notes: 'Framework; includes Classical Greek and Latin',
      },
      { name: 'Classical Greek', slug: 'classical-greek' },
      { name: 'Latin', slug: 'latin' },
    ],
  },
]

// ---------- Utilities ----------

export function getLearningAreaBySlug(slug: string): LearningArea | undefined {
  return LEARNING_AREAS.find((la) => la.slug === slug)
}

export function getSubjectBySlug(
  slug: string
): { area: LearningArea; subject: Subject } | undefined {
  for (const area of LEARNING_AREAS) {
    const subject = area.subjects.find((s) => s.slug === slug)
    if (subject) return { area, subject }
  }
  return undefined
}

export function listAllSubjects(): Subject[] {
  return LEARNING_AREAS.flatMap((la) => la.subjects)
}
