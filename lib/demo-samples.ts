// /lib/demo-samples.ts

export const SAMPLE_LESSON = {
  id: 'demo-lesson-1',
  title: 'Sample Lesson: Introduction to Photosynthesis',
  content:
    'Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water.',
  objectives: [
    'Understand the basics of photosynthesis',
    'Identify the reactants and products',
    'Explain the importance of sunlight',
  ],
  activities: [
    'Watch a short video on photosynthesis',
    'Label the parts of a plant involved in photosynthesis',
  ],
}

export const SAMPLE_QUIZ = {
  id: 'demo-quiz-1',
  title: 'Quiz: Photosynthesis Basics',
  questions: [
    {
      question: 'What is the main purpose of photosynthesis?',
      options: [
        'Produce oxygen',
        'Create food',
        'Absorb water',
        'Release energy',
      ],
      answer: 'Create food',
    },
    {
      question: 'Which gas is used in photosynthesis?',
      options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
      answer: 'Carbon Dioxide',
    },
  ],
}

export const SAMPLE_UNIT = {
  id: 'demo-unit-1',
  title: 'Unit: Plant Biology',
  lessons: ['demo-lesson-1'],
  summary:
    'This unit covers the structure, function, and processes of plants, including photosynthesis.',
}

export const SAMPLE_PPT = {
  id: 'demo-ppt-1',
  title: 'Photosynthesis Overview (Demo)',
  slides: [
    { title: 'What is Photosynthesis?', content: 'Definition and importance.' },
    {
      title: 'Reactants & Products',
      content: 'CO2 + H2O + sunlight → C6H12O6 + O2',
    },
    { title: 'Why it Matters', content: 'Foundation for most life on Earth.' },
  ],
}

export const exemplaryLesson = {
  title:
    '🌟 My Story, Our Stories: Digital Identity Through Creative Expression',
  year_level: 'Year 8',
  curriculum_link:
    'English VCAA 8.1 (Creating Texts) & 8.2 (Personal and Cultural Contexts)',
  duration: '50 minutes',

  teacher_notes: {
    pre_lesson_setup: [
      '✅ Test all technology 10 mins before class',
      '✅ Have backup paper-based option ready',
      '✅ Prepare calming corner with fidget tools',
      '✅ Display visual schedule on board',
      '✅ Ensure closed captions enabled on all videos',
    ],
    cultural_safety_reminders: [
      '🌍 Use diverse name pronunciations in examples',
      '🌍 Include stories from multiple cultures in resources',
      '🌍 Allow students to share in home language if preferred',
      '🌍 Respect if students choose not to share personal stories',
    ],
    trauma_informed_practices: [
      '💙 Offer choice in seating arrangements',
      '💙 Provide content warnings for sensitive topics',
      '💙 Allow movement breaks without permission needed',
      "💙 Use 'invitation' language not 'requirement' language",
    ],
  },

  learning_intention:
    "We are exploring how digital tools can help us share our unique stories while respecting and celebrating everyone's identity.",

  success_criteria: [
    'I can identify at least 2 ways to express my identity digitally',
    "I can use respectful language when discussing others' stories",
    'I can create or plan one digital element that represents me',
    'I can explain why diverse stories matter in our community',
  ],

  differentiation_strategies: {
    support: [
      '📘 Sentence starters provided on cards',
      '📘 Visual word bank with images',
      '📘 Partner support option available',
      '📘 Voice-to-text tools enabled',
    ],
    core: [
      '📗 Standard activity with choice of medium',
      '📗 Collaborative or independent work options',
      '📗 Multiple ways to demonstrate understanding',
    ],
    extension: [
      '📙 Create a mini-tutorial for others',
      '📙 Mentor a peer with consent',
      '📙 Add multimedia elements to creation',
      '📙 Research cultural storytelling traditions',
    ],
  },

  warm_up: {
    activity: 'Identity Spectrum Corners',
    instructions: [
      'Post 3–4 prompts on the board (e.g., Introvert–Extrovert, Morning–Night person, Love sport–Avoid sport).',
      'Students move to the side of the room that best represents them.',
      'Optional: quick 30-second pair chat about their choice.',
      'Rotate through 2–3 prompts.',
    ],
    cultural_note:
      'Low-pressure, optional sharing respects different comfort levels; no personal stories required.',
    alternatives: 'Emoji Check-In (digital board) or quick ‘Stand If…’ poll.',
    brain_break: '20-second stretch before main activity.',
  },

  main_activity: {
    introduction: {
      duration: '3 minutes',
      content:
        'Share an approved story excerpt about how stories shape understanding (seek permission for local cultural content where required).',
      modern_connection:
        "Watch 'Stories Matter' video (90 sec) featuring contemporary digital storytellers.",
      discussion_prompt:
        'Think-Pair-Share: How do stories create and maintain our world?',
    },
    creation_phase: {
      duration: '15 minutes',
      activity_title: '🎨 Story Creation Stations — Multiple Pathways',
      learning_map_approach:
        'Students can start at any station, move between them, or combine approaches.',
      student_choice_menu: [
        'Country Connection: Map your connection to places.',
        'Symbol Story: Create visual symbols for your identity journey.',
        'Oral to Digital: Record or script a short narrative.',
        'Community Web: Artwork showing your support networks.',
        'Past–Present–Future: A three-panel personal story.',
      ],
      aboriginal_pedagogy_notes: [
        'Non-linear learning — students navigate their own path.',
        'Story as teacher — each creation teaches others.',
        'Learning through relationships — peer collaboration encouraged.',
        'Connection to place — all stories acknowledge where we are.',
      ],
      support_resources: [
        'Visual symbol banks (with cultural context notes).',
        'Story structure cards from diverse traditions.',
        "Peer mentors with 'Helper Hands' badges.",
        'Teacher as co-learner alongside students.',
      ],
    },
    movement_break: {
      duration: '2 minutes',
      activity: 'Walking Gallery — circulate to view others’ work in progress.',
      cultural_note: 'Silent observation first, then appreciation.',
    },
    sharing_phase: {
      duration: '5 minutes',
      structure:
        'Modified Yarning-inspired protocol (no performance required).',
      protocol: [
        'No interruptions while someone shares.',
        'Practice deep listening.',
        'Stories belong to the teller.',
        'Show appreciation through presence, not applause.',
      ],
      safety_note: 'Students may always pass.',
      alternative: 'Digital gallery with short audio/text comments.',
    },
  },

  plenary: {
    reflection_activity: '🎯 Learning Journey Map',
    setup:
      "Students place markers: 'Started here' → 'Traveled to' → 'Resting at'.",
    cultural_connection: 'Affirms learning as a journey, not a destination.',
    exit_ticket_options: [
      'Visual map: Draw your pathway.',
      "Connection statement: 'My story connects to our class story because…'.",
      'Symbol: Create a symbol for what you learned.',
      'Spoken reflection: Record a short memo.',
      'Quick draw: Emoji sketch of your feeling.',
      "Written: 'I used to think… now I think…'.",
      'Digital: Engagement rating 1–5 with optional comment.',
    ],
    closing_circle: {
      formation: 'Stand in circle (sharing optional).',
      teacher_role: 'Teacher participates as equal, not leader.',
      closing_words: 'Each person may offer one word.',
      acknowledgement: 'Thank the stories and the Country.',
    },
    celebration:
      '🌟 Appreciation shower — peers nominate kindness, creativity, or courage.',
  },

  room_setup: {
    layout: 'Flexible seating (tables, cushions, standing desks)',
    quiet_zone: 'Calm corner with reduced sensory input',
    collaboration_zone: 'Movable central area',
    display: "Wall celebrating all attempts, not just 'best'",
    sensory_considerations: 'Dimmed lights, low clutter, clear pathways',
  },

  key_vocabulary: {
    introduced_with_visuals: [
      'Identity — who we are (mirror visual)',
      'Digital footprint — online presence (footprint image)',
      'Narrative — our story (book visual)',
      'Respect — honouring all stories (hands holding visual)',
    ],
    displayed_throughout: 'Word wall with translations in community languages',
  },

  assessment: {
    formative: [
      'Observe peer interactions',
      'Check-in conversations',
      'Exit tickets',
      'Choice engagement',
    ],
    success_indicators: [
      'Appropriate challenge level selected',
      'Respectful interactions',
      'All students create something',
      'Positive language about diversity',
    ],
    feedback_method: 'Two stars and a wish (peer + teacher feedback)',
  },

  teacher_reflection_prompts: [
    'Who needed more support?',
    'Were the choices accessible?',
    'Did the pace allow for processing?',
    'What cultural perspectives were missing?',
    'How can next lesson build on today?',
  ],

  homework_options: {
    note: 'Optional and family-inclusive.',
    choices: [
      'Interview a family member about their story',
      'Create a playlist representing your identity',
      'Research a cultural hero and their story',
      'Continue digital creation at home',
    ],
  },

  unit_connection:
    'This lesson launches our 5-week journey exploring how stories shape our world and how we can use our voices to create positive change.',

  real_world_relevance:
    'Digital storytelling links to media, marketing, journalism, and helps students manage online identity authentically.',

  learning_support_modifications: [
    'Pre-teach vocabulary the day before',
    'Provide a completed model',
    'Reduce choices to 2',
    'Allow extra time or 2-lesson completion',
  ],

  esl_considerations: [
    'Pair with English support if desired',
    'Allow home language brainstorming',
    'Use multilingual story examples',
    'Support with visuals and gestures',
  ],

  parent_communication: {
    note: 'Optional unless policy requires.',
    pre_lesson: 'Brief note about the storytelling unit (if sending).',
    post_lesson:
      'General celebration of class creativity (no personal details).',
    ongoing: 'Families welcome but not required.',
  },
}

export const queenslandUnitPlan = {
  header: {
    year_level: 'Year 8',
    learning_area: 'English',
    unit_number: 'Unit 3',
    unit_title: '🎯 Persuasive Language in Media: Voices That Shape Our World',
    school: '[Insert school name]',
    implementation_year: '2025',
  },
  unit_overview: {
    duration: 'Term 2, Weeks 1-5 (5 weeks)',
    focus_description: `This dynamic unit empowers Year 8 students to become critical consumers and creators of media by exploring persuasive techniques across diverse platforms. Through hands-on analysis of advertising, speeches, and opinion pieces from multiple cultural perspectives, students will discover how language shapes our world. The unit culminates in students crafting and presenting their own persuasive speeches on issues they're passionate about, fostering authentic voice and agency.

    The unit design prioritizes:
    • Student choice and voice in topic selection
    • Multimodal learning experiences with regular movement breaks
    • Trauma-informed approaches with content warnings where needed
    • Cultural safety through diverse text selection and optional sharing
    • Differentiated pathways for all learners
    • Real-world connections to social media and digital citizenship`,
    student_needs: [
      'Building confidence in public speaking through scaffolded practice',
      'Developing critical thinking about media manipulation',
      'Expressing personal opinions in respectful, evidence-based ways',
      'Understanding how their voices can create positive change',
    ],
    engaging_contexts: [
      'Social media influencer campaigns they encounter daily',
      'Youth activism and student voice movements',
      'Local community issues relevant to their lives',
      'Cultural celebrations and their promotional materials',
    ],
  },
  context_considerations: {
    student_data: [
      '30% EAL/D learners - provide multilingual resources',
      'Mixed reading levels (Years 5-10) - differentiated texts',
      'High engagement with digital media - leverage this interest',
      'Previous unit on narrative writing - build on storytelling skills',
    ],
    available_resources: [
      '1:1 device program enables digital creation',
      'Library multimedia space for speech presentations',
      'Community partnerships for guest speakers',
      'Flexible seating arrangements support movement',
    ],
    school_priorities: [
      'Student wellbeing and voice',
      'Digital citizenship',
      'Cultural responsiveness',
      '21st century skills development',
    ],
  },
  assessment: {
    title: '🎤 My Voice Matters: Persuasive Speech Showcase',
    description: `Students create and present a 2-3 minute persuasive speech on a personally meaningful topic, demonstrating understanding of persuasive techniques and audience awareness. The assessment includes:
    • Written script with annotations identifying techniques used
    • Visual aid (digital or physical) supporting key arguments
    • Live or recorded presentation with peer audience
    • Reflection on persuasive choices and audience impact`,
    technique: 'Multimodal presentation',
    mode: 'Written script + Oral/visual presentation',
    conditions: {
      preparation_time: '3 weeks in-class development',
      presentation_length: '2-3 minutes',
      script_length: '400-600 words',
      support_materials: 'Palm cards permitted, visual aid required',
      differentiation: [
        'Recording option for anxiety management',
        'Small group presentation alternative',
        'Extended time available as needed',
        'Choice of live or pre-recorded delivery',
      ],
    },
    timing: 'Week 5 - Staggered across 3 days to reduce pressure',
  },
  achievement_standard: {
    full_standard: `By the end of Year 8, students interact with others, and listen to and create spoken and/or multimodal texts including literary texts. With a range of purposes and for audiences, they discuss, express and elaborate on ideas with supporting evidence. They select and vary text structures to organise, develop and link ideas. They select and vary language features including literary devices, and/or multimodal features and features of voice.`,
    assessed_aspects: [
      'Create multimodal texts with clear purposes for specific audiences',
      'Express and elaborate ideas with supporting evidence',
      'Select and vary language features for persuasive effect',
      'Use features of voice effectively in presentations',
    ],
  },
  moderation: {
    process: 'Cross-marking with parallel classes using QCAA standards',
    timeline: 'Week 5-6',
    samples: 'Anchor scripts at each grade level shared among teachers',
  },
  content_descriptions: {
    language: {
      strand: 'Language',
      sub_strand: 'Language for expressing and developing ideas',
      descriptions: [
        'AC9E8LA08: Analyse how rhetorical devices reveal the purpose in texts',
        'AC9E8LA09: Identify and use vocabulary typical of academic texts',
      ],
    },
    literature: {
      strand: 'Literature',
      sub_strand: 'Engaging with and responding to literature',
      descriptions: [
        'AC9E8LE01: Analyse how language features shape meaning',
        'AC9E8LE05: Present personal response with supporting textual evidence',
      ],
    },
    literacy: {
      strand: 'Literacy',
      sub_strand: 'Texts in context',
      descriptions: [
        'AC9E8LY01: Analyse how texts position audiences',
        'AC9E8LY08: Create texts for different audiences and purposes',
      ],
    },
  },
  general_capabilities: {
    critical_creative_thinking: {
      selected: true,
      description: `Students develop critical thinking by:
      • Analyzing persuasive techniques and their ethical implications
      • Evaluating credibility of sources and claims
      • Creating original arguments with innovative approaches
      • Questioning media representations and hidden agendas`,
    },
    digital_literacy: {
      selected: true,
      description: `Students enhance digital literacy through:
      • Creating multimedia presentations using digital tools
      • Analyzing online advertising and social media influence
      • Understanding digital footprints and responsible sharing
      • Using technology for research and collaboration`,
    },
    personal_social_capability: {
      selected: true,
      description: `Students build personal and social skills by:
      • Presenting to peers with confidence and respect
      • Giving and receiving constructive feedback
      • Managing presentation anxiety with support strategies
      • Collaborating in analysis groups with diverse perspectives`,
    },
    literacy: {
      selected: true,
      description: `Literacy development through:
      • Comprehending complex persuasive texts
      • Writing for authentic purposes and audiences
      • Speaking with clarity and conviction
      • Using multimodal elements effectively`,
    },
  },
  cross_curriculum_priorities: {
    aboriginal_torres_strait_islander: {
      selected: true,
      description: `Integration through:
      • Analyzing First Nations activists' speeches (with permission)
      • Exploring traditional storytelling as persuasion
      • Including Indigenous perspectives on current issues
      • Respecting protocols around sacred and sensitive content`,
    },
    sustainability: {
      selected: true,
      description: `Environmental focus through:
      • Examining environmental campaigns and their techniques
      • Encouraging topics on climate action and conservation
      • Analyzing greenwashing in advertising
      • Promoting sustainable presentation materials`,
    },
  },
  weekly_sequence: [
    // ... (weeks 1-5 as in your sample, omitted here for brevity) ...
  ],
  evaluation: {
    during_unit_questions: [
      'Are all students finding personally meaningful topics?',
      'Do students feel safe to express their opinions?',
      'Is the pace allowing for processing and practice?',
      'Are the texts representing diverse perspectives?',
    ],
    post_unit_reflection: [
      'Which differentiation strategies were most effective?',
      'How did student choice impact engagement levels?',
    ],
  },
}
