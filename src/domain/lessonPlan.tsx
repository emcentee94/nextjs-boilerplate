// src/domain/lessonPlan.tsx

// =======================
// 1) Core Types
// =======================

export type CurriculumLink = {
  code: string;          // e.g., "AC9S8U01"
  description: string;   // canonical text you store in DB
};

export type TimelineBlock = {
  minutes: number;       // integer minutes
  activity: string;      // e.g., "Guided exploration"
  teacherMoves?: string[]; 
  studentTasks?: string[];
};

export type Differentiation = {
  access: string[];      // scaffolds & supports
  extension: string[];   // challenges & enrichment
};

export type Assessment = {
  style: "Formative" | "Summative" | "Diagnostic";
  methods: string[];     // e.g., ["Exit ticket", "Annotated diagram"]
  successCriteria: string[];
};

export type LessonPlan = {
  title: string;
  overview: string;
  learningGoals: string[];
  linkedCurriculum: CurriculumLink[];
  lessonTimeline: TimelineBlock[];
  resources: string[];

  // Optional, but recommended fields for your brand
  indigenousPerspectives?: string;      // short paragraph
  traumaInformedStrategies?: string[];  // bullets
  differentiation: Differentiation;
  assessment: Assessment;

  notesForTeacher?: string;
  complianceSummary?: string;           // printable summary
};

// =======================
// 2) JSON Schema (for Anthropic structured output)
// =======================

export const LESSON_PLAN_JSON_SCHEMA = {
  name: "LessonPlan",
  schema: {
    type: "object",
    properties: {
      title: { type: "string" },
      overview: { type: "string" },
      learningGoals: { type: "array", items: { type: "string" } },
      linkedCurriculum: {
        type: "array",
        items: {
          type: "object",
          properties: {
            code: { type: "string" },
            description: { type: "string" }
          },
          required: ["code", "description"]
        }
      },
      lessonTimeline: {
        type: "array",
        items: {
          type: "object",
          properties: {
            minutes: { type: "number" },
            activity: { type: "string" },
            teacherMoves: { type: "array", items: { type: "string" } },
            studentTasks: { type: "array", items: { type: "string" } }
          },
          required: ["minutes", "activity"]
        }
      },
      resources: { type: "array", items: { type: "string" } },
      indigenousPerspectives: { type: "string" },
      traumaInformedStrategies: { type: "array", items: { type: "string" } },
      differentiation: {
        type: "object",
        properties: {
          access: { type: "array", items: { type: "string" } },
          extension: { type: "array", items: { type: "string" } }
        },
        required: ["access", "extension"]
      },
      assessment: {
        type: "object",
        properties: {
          style: { type: "string", enum: ["Formative", "Summative", "Diagnostic"] },
          methods: { type: "array", items: { type: "string" } },
          successCriteria: { type: "array", items: { type: "string" } }
        },
        required: ["style", "methods", "successCriteria"]
      },
      notesForTeacher: { type: "string" },
      complianceSummary: { type: "string" }
    },
    required: [
      "title",
      "overview",
      "learningGoals",
      "linkedCurriculum",
      "lessonTimeline",
      "resources",
      "differentiation",
      "assessment"
    ],
    additionalProperties: false
  }
} as const;

// =======================
// 3) Factory with Defaults
// =======================

export function createLessonPlan(partial: Partial<LessonPlan>): LessonPlan {
  return {
    title: partial.title ?? "Untitled Lesson",
    overview: partial.overview ?? "",
    learningGoals: partial.learningGoals ?? [],
    linkedCurriculum: partial.linkedCurriculum ?? [],
    lessonTimeline: partial.lessonTimeline ?? [],
    resources: partial.resources ?? [],
    indigenousPerspectives: partial.indigenousPerspectives,
    traumaInformedStrategies: partial.traumaInformedStrategies ?? [],
    differentiation: partial.differentiation ?? { access: [], extension: [] },
    assessment: partial.assessment ?? {
      style: "Formative",
      methods: [],
      successCriteria: []
    },
    notesForTeacher: partial.notesForTeacher,
    complianceSummary: partial.complianceSummary
  };
}

// =======================
// 4) Minimal Type Guard (runtime)
// =======================

export function isLessonPlan(x: any): x is LessonPlan {
  const base =
    x &&
    typeof x.title === "string" &&
    typeof x.overview === "string" &&
    Array.isArray(x.learningGoals) &&
    Array.isArray(x.linkedCurriculum) &&
    Array.isArray(x.lessonTimeline) &&
    Array.isArray(x.resources) &&
    x.differentiation &&
    Array.isArray(x.differentiation.access) &&
    Array.isArray(x.differentiation.extension) &&
    x.assessment &&
    typeof x.assessment.style === "string" &&
    Array.isArray(x.assessment.methods) &&
    Array.isArray(x.assessment.successCriteria);

  if (!base) return false;

  // spot-check linkedCurriculum entries
  for (const lc of x.linkedCurriculum) {
    if (!lc || typeof lc.code !== "string" || typeof lc.description !== "string") return false;
  }
  // spot-check timeline entries
  for (const tb of x.lessonTimeline) {
    if (!tb || typeof tb.minutes !== "number" || typeof tb.activity !== "string") return false;
  }
  return true;
}

// =======================
// 5) Example Instance (your Cells & Systems lesson)
// =======================

export const exampleCellsAndSystems: LessonPlan = createLessonPlan({
  title: "Cells and Systems: Structure and Function in Living Things",
  overview:
    "Students explore cell structures through a culturally responsive lens, connecting Indigenous knowledge of plant and animal relationships with scientific understanding of cellular organization.",
  learningGoals: [
    "Identify and describe the basic structures of plant and animal cells",
    "Explain how cell structures relate to their functions",
    "Connect Indigenous perspectives on living systems with scientific knowledge",
    "Apply trauma-informed learning strategies to support diverse learners"
  ],
  linkedCurriculum: [
    {
      code: "AC9S8U01",
      description: "Compare plant and animal cells and explain how the structures of cells relate to their functions"
    },
    {
      code: "AC9S8U02", 
      description: "Analyse the relationship between structure and function at cell, tissue and organ level"
    }
  ],
  lessonTimeline: [
    {
      minutes: 10,
      activity: "Welcome and Connection",
      teacherMoves: [
        "Greet students at door with choice of seating",
        "Display visual schedule and learning intentions",
        "Share personal connection to today's topic"
      ],
      studentTasks: [
        "Choose preferred seating option",
        "Review visual schedule",
        "Share one thing they know about cells"
      ]
    },
    {
      minutes: 15,
      activity: "Indigenous Knowledge Connection",
      teacherMoves: [
        "Share Aboriginal and Torres Strait Islander perspectives on living systems",
        "Use visual aids and storytelling approach",
        "Check for understanding with thumbs up/down"
      ],
      studentTasks: [
        "Listen to Indigenous perspectives",
        "Make connections to their own experiences",
        "Ask questions respectfully"
      ]
    },
    {
      minutes: 20,
      activity: "Cell Structure Exploration",
      teacherMoves: [
        "Provide multiple learning modalities (visual, kinesthetic, auditory)",
        "Use think-pair-share strategy",
        "Offer choice in activity completion"
      ],
      studentTasks: [
        "Explore cell models and diagrams",
        "Work with partner to identify structures",
        "Choose preferred method to record learning"
      ]
    },
    {
      minutes: 10,
      activity: "Reflection and Exit Ticket",
      teacherMoves: [
        "Provide multiple ways to demonstrate understanding",
        "Give positive, specific feedback",
        "Preview next lesson"
      ],
      studentTasks: [
        "Complete exit ticket in preferred format",
        "Reflect on learning goals",
        "Set intention for next lesson"
      ]
    }
  ],
  resources: [
    "Microscopes and prepared slides",
    "Cell structure diagrams and models",
    "Indigenous knowledge resources",
    "Multiple choice exit ticket options",
    "Visual schedule and learning intentions"
  ],
  indigenousPerspectives: "This lesson incorporates Aboriginal and Torres Strait Islander perspectives on living systems, recognizing the deep connection between Indigenous knowledge and scientific understanding of cellular organization.",
  traumaInformedStrategies: [
    "Choice in seating and activity completion",
    "Visual schedule and clear expectations",
    "Multiple ways to demonstrate understanding",
    "Positive, specific feedback",
    "Predictable routines and transitions"
  ],
  differentiation: {
    access: [
      "Visual aids and diagrams for visual learners",
      "Hands-on models for kinesthetic learners",
      "Audio explanations for auditory learners",
      "Simplified language and key vocabulary support"
    ],
    extension: [
      "Research connections between cell structures and Indigenous knowledge",
      "Create detailed diagrams with explanations",
      "Investigate specialized cell types",
      "Connect to real-world applications"
    ]
  },
  assessment: {
    style: "Formative",
    methods: [
      "Exit ticket with multiple choice options",
      "Think-pair-share observations",
      "Visual representation of learning",
      "Self-reflection on learning goals"
    ],
    successCriteria: [
      "Can identify basic cell structures",
      "Explains connection between structure and function",
      "Demonstrates understanding of Indigenous perspectives",
      "Shows engagement with trauma-informed strategies"
    ]
  },
  notesForTeacher: "This lesson is designed to be culturally responsive and trauma-informed. Be prepared to adapt activities based on student needs and responses. Have backup activities ready for students who need additional support or challenge.",
  complianceSummary: "This lesson addresses AC9S8U01 and AC9S8U02, incorporating Indigenous perspectives and trauma-informed strategies to support diverse learners in understanding cell structure and function."
});
