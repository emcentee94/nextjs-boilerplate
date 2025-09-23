// TypeScript types for lesson plan generation

export type CurriculumItem = {
  code: string;            // e.g., "AC9E7LA05"
  title?: string;          // optional, UI hint
};

export type ClassProfile = {
  size?: number;
  literacyTier?: "mixed" | "lower" | "higher";
  additionalNeeds?: string[]; // brief phrases
};

export type LessonOptions = {
  embedIndigenousPerspectives: boolean;
  traumaInformedScaffolds: boolean;
  differentiation: "low" | "medium" | "high";
  assessmentStyle?: "formative" | "summative" | "rubric-upload" | "acara-standard" | "vcaa";
};

export type LessonRequest = {
  subject: "English" | "Mathematics" | "Science" | string;
  yearLevels: string[];    // e.g., ["Year 7"]
  items: CurriculumItem[]; // selected codes
  durationMins: number;    // e.g., 50
  classProfile?: ClassProfile;
  options: LessonOptions;
};

export type LinkedCurriculum = {
  code: string;
  description: string;
};

export type TimingBreakdown = {
  minutes: number;
  activity: string;
  teacherMoves?: string;
  studentTasks?: string;
};

export type Differentiation = {
  access: string;     // supports/scaffolds for access
  extension: string;  // challenge/extension
};

export type Assessment = {
  style: string;      // formative/summative/etc
  method: string;     // e.g., exit tickets, rubric criteria
  successCriteria?: string[];
};

export type LessonPlan = {
  title: string;
  overview: string;
  learningGoals: string[];
  linkedCurriculum: LinkedCurriculum[];
  timingBreakdown: TimingBreakdown[];
  resources: string[];
  indigenousPerspectives?: string;
  traumaInformedStrategies?: string;
  differentiation: Differentiation;
  assessment: Assessment;
  notesForTeacher?: string;
  printableComplianceSummary: string;
};

export type LessonPlanResponse = {
  lessonPlan: LessonPlan;
};
