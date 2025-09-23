// JSON schemas for structured lesson plan output

export const lessonPlanSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    overview: { type: "string" },
    learningGoals: {
      type: "array",
      items: { type: "string" }
    },
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
    timingBreakdown: {
      type: "array",
      items: {
        type: "object",
        properties: {
          minutes: { type: "number" },
          activity: { type: "string" },
          teacherMoves: { type: "string" },
          studentTasks: { type: "string" }
        },
        required: ["minutes", "activity"]
      }
    },
    resources: { type: "array", items: { type: "string" } },
    indigenousPerspectives: { type: "string" },
    traumaInformedStrategies: { type: "string" },
    differentiation: {
      type: "object",
      properties: {
        access: { type: "string" },     // supports/scaffolds for access
        extension: { type: "string" }   // challenge/extension
      },
      required: ["access", "extension"]
    },
    assessment: {
      type: "object",
      properties: {
        style: { type: "string" },      // formative/summative/etc
        method: { type: "string" },     // e.g., exit tickets, rubric criteria
        successCriteria: { type: "array", items: { type: "string" } }
      },
      required: ["style", "method"]
    },
    notesForTeacher: { type: "string" },
    printableComplianceSummary: { type: "string" }
  },
  required: [
    "title", "overview", "learningGoals", "linkedCurriculum",
    "timingBreakdown", "resources", "differentiation",
    "assessment", "printableComplianceSummary"
  ]
} as const;
