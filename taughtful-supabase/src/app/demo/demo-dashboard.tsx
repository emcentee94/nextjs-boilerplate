'use client'

import { useState } from 'react'

export default function DemoDashboard() {
  const [selectedCurriculum, setSelectedCurriculum] = useState('ACARA v9')
  const [selectedSubject, setSelectedSubject] = useState('English')
  const [selectedYearLevel, setSelectedYearLevel] = useState('Year 1')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Sample lesson plans for demo
  const sampleLessons = [
    {
      id: '1',
      title: 'Introduction to Storytelling',
      learning_area: 'English',
      subject: 'English',
      year_level: 'Year 1',
      duration_minutes: 60,
      status: 'complete',
      created_at: '2024-01-15T10:00:00Z',
      curriculum_framework: 'ACARA v9'
    },
    {
      id: '2',
      title: 'Counting to 100',
      learning_area: 'Mathematics',
      subject: 'Mathematics',
      year_level: 'Year 1',
      duration_minutes: 45,
      status: 'draft',
      created_at: '2024-01-14T14:30:00Z',
      curriculum_framework: 'ACARA v9'
    },
    {
      id: '3',
      title: 'Living Things and Their Needs',
      learning_area: 'Science',
      subject: 'Science',
      year_level: 'Year 2',
      duration_minutes: 50,
      status: 'complete',
      created_at: '2024-01-13T09:15:00Z',
      curriculum_framework: 'ACARA v9'
    }
  ]

  const curriculumOptions = {
    'ACARA v9': {
      name: 'Australian Curriculum v9',
      description: 'National curriculum framework',
      subjects: ['English', 'Mathematics', 'Science', 'History', 'Geography', 'The Arts', 'Health and Physical Education', 'Technologies', 'Languages']
    },
    'Victorian Curriculum': {
      name: 'Victorian Curriculum F–10',
      description: 'Victoria-specific curriculum',
      subjects: ['English', 'Mathematics', 'Science', 'History', 'Geography', 'The Arts', 'Health and Physical Education', 'Technologies', 'Languages', 'Critical and Creative Thinking', 'Ethical Capability', 'Intercultural Capability', 'Personal and Social Capability']
    },
    'NSW Syllabus': {
      name: 'NSW Syllabus',
      description: 'New South Wales curriculum',
      subjects: ['English', 'Mathematics', 'Science', 'History', 'Geography', 'Creative Arts', 'Personal Development, Health and Physical Education', 'Technology and Applied Studies', 'Languages']
    }
  }

  const yearLevels = ['Foundation', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10']

  const filteredLessons = sampleLessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.learning_area.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.year_level.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Demo Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Demo Mode Active
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>You're viewing a demo of the teacher dashboard. All features are available but changes won't be saved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Selection */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Curriculum Selection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(curriculumOptions).map(([key, option]) => (
            <div
              key={key}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedCurriculum === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedCurriculum(key)}
            >
              <h3 className="font-medium text-gray-900">{option.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                {option.subjects.length} subjects available
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Subject and Year Level Selection */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Lesson Planning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {curriculumOptions[selectedCurriculum as keyof typeof curriculumOptions]?.subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year Level
            </label>
            <select
              value={selectedYearLevel}
              onChange={(e) => setSelectedYearLevel(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {yearLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lesson Plans */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Lesson Plans</h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {showCreateForm ? 'Cancel' : 'Create New Lesson'}
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search lesson plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-gray-50 border rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-3">Create New Lesson Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Lesson title..."
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Duration (minutes)"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-3 flex gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Create Lesson
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Lesson List */}
        <div className="space-y-3">
          {filteredLessons.map(lesson => (
            <div key={lesson.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>{lesson.learning_area}</span>
                    <span>•</span>
                    <span>{lesson.year_level}</span>
                    <span>•</span>
                    <span>{lesson.duration_minutes} min</span>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      lesson.status === 'complete' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {lesson.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                    View
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Actions */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Demo Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Import Curriculum Data
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Generate AI Lesson Plan
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            Export to PDF
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
            Share with Colleagues
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          These buttons demonstrate the full functionality available in the real Taughtful platform.
        </p>
      </div>

      {/* Sign Up CTA */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Ready to get started?
        </h3>
        <p className="text-blue-700 mb-4">
          Sign up for free to save your lesson plans and access all features.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign Up Free
          </a>
          <a
            href="/"
            className="px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  )
}
