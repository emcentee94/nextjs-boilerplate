'use client';

import React, { useState, useEffect } from 'react';
import TaughtfulSurvey from './taughtful-survey';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  LibraryBig,
  Brain,
  HandHeart,
  Feather,
  Globe,
} from 'lucide-react';
import CurriculumSelector from './curriculum-selector';
// import Highlight, { defaultProps } from 'prism-react-renderer';
// import { themes } from 'prism-react-renderer';

// Cursor-ready React component
// Update: Wired Class, Pedagogy & Scaffolds, and Review steps end-to-end.
// Added lightweight dev sanity tests. Removed smart quotes.

const steps = [
  { key: 'basics', label: 'Lesson Basics', icon: BookOpen },
  { key: 'curriculum', label: 'Curriculum Standards', icon: LibraryBig },
  { key: 'class', label: 'Class Profile', icon: Users },
  { key: 'pedagogy', label: 'Pedagogy & Scaffolds', icon: Feather },
  { key: 'generate', label: 'Review & Generate', icon: CheckCircle2 },
];

const subjects = ['English', 'Mathematics', 'Science', 'Humanities', 'Health & PE', 'The Arts', 'Technologies'];

const yearLevels = ['F', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const eightWays = [
  'Story Sharing: Approaching learning through narrative',
  'Learning Maps: Visualising processes explicitly',
  'Non-verbal: Using kinaesthetic and reflective practice',
  'Symbols and Images: Using images and metaphors',
  'Land Links: Place-based learning connected to Country',
  'Non-linear: Lateral thinking and innovation',
  'Deconstruct/Reconstruct: Watch then do, scaffold from whole to parts',
  'Community Links: Apply learning for community benefit',
];

function getWeightedEightWays(subject) {
  let weights = [];
  switch (subject) {
    case 'English':
      weights = [eightWays[0], eightWays[1], eightWays[3], eightWays[6]];
      break;
    case 'Science':
      weights = [eightWays[1], eightWays[4], eightWays[5], eightWays[6]];
      break;
    case 'Mathematics':
      weights = [eightWays[1], eightWays[3], eightWays[5], eightWays[6]];
      break;
    case 'Humanities':
      weights = [eightWays[0], eightWays[3], eightWays[4], eightWays[7]];
      break;
    case 'Health & PE':
      weights = [eightWays[2], eightWays[4], eightWays[6], eightWays[7]];
      break;
    case 'The Arts':
      weights = [eightWays[0], eightWays[2], eightWays[3], eightWays[7]];
      break;
    case 'Technologies':
      weights = [eightWays[1], eightWays[3], eightWays[5], eightWays[6]];
      break;
    default:
      weights = eightWays;
  }
  return weights;
}

export default function TaughtfulDashboard() {
  const [active, setActive] = useState('basics');
  const [displayName, setDisplayName] = useState<string>('Teacher');
  const [subject, setSubject] = useState('English');
  const [year, setYear] = useState('5');
  const [duration, setDuration] = useState(60);
  const [classSize, setClassSize] = useState(25);
  const [literacyTier, setLiteracyTier] = useState('Mixed');
  const [assessment, setAssessment] = useState('Formative');
  const [diff, setDiff] = useState(1); // 0 Light, 1 Balanced, 2 Full
  const [tiOn, setTiOn] = useState(true);
  const [indigLevel, setIndigLevel] = useState(1); // 0 none, 1 contextual, 2 deep
  const [aboriginalPedagogy, setAboriginalPedagogy] = useState(false);
  const [selectedEightWays, setSelectedEightWays] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLessonPlan, setGeneratedLessonPlan] = useState(null);
  const [error, setError] = useState(null);
  
  // Curriculum selection state
  const [curriculumItems, setCurriculumItems] = useState([]);
  const [selectedCurriculumItems, setSelectedCurriculumItems] = useState([]);
  const [isLoadingCurriculum, setIsLoadingCurriculum] = useState(false);
  const [curriculumError, setCurriculumError] = useState(null);

  const canNextBasics = Boolean(subject && year);
  const canNextCurriculum = selectedCurriculumItems.length > 0;
  const canNextClass = classSize > 0 && literacyTier && assessment;

  useEffect(() => {
    // Load demo user (or real auth user if present) for greeting
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('taughtful_user') : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.name) {
          setDisplayName(parsed.name);
        }
      }
    } catch {}
    if (aboriginalPedagogy && subject) {
      setSelectedEightWays(getWeightedEightWays(subject));
    } else {
      setSelectedEightWays([]);
    }
  }, [aboriginalPedagogy, subject]);

  // Fetch curriculum items when subject and year are selected
  useEffect(() => {
    if (subject && year) {
      fetchCurriculumItems();
    }
  }, [subject, year]);

  const fetchCurriculumItems = async () => {
    setIsLoadingCurriculum(true);
    setCurriculumError(null);
    setCurriculumItems([]);
    setSelectedCurriculumItems([]);

    try {
      const response = await fetch(`/api/curriculum/search?learningAreaId=${subject}&yearLevel=${year}&limit=100`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch curriculum items');
      }

      const data = await response.json();
      setCurriculumItems(data.outcomes || []);
    } catch (err) {
      console.error('Curriculum fetch error:', err);
      setCurriculumError(err.message || 'Failed to load curriculum items');
    } finally {
      setIsLoadingCurriculum(false);
    }
  };

  const toggleCurriculumItem = (item) => {
    setSelectedCurriculumItems(prev => {
      const itemId = item.id || item["Code"] || `item-${Date.now()}`
      const isSelected = prev.some(selected => 
        selected.id === itemId || selected.code === item["Code"]
      )
      
      if (isSelected) {
        return prev.filter(selected => 
          selected.id !== itemId && selected.code !== item["Code"]
        )
      } else {
        return [...prev, {
          id: itemId,
          code: item["Code"] || item.code,
          title: item["Content Description"] || item.content_description || item["Achievement Standard"] || item.achievement_standard || item["Description"] || item.description,
          description: item["Elaboration"] || item.elaboration,
          level: item["Level"] || item.level,
          strand: item["Strand"] || item.strand,
          subject: item["Subject"] || item.subject,
          learning_area: item["Learning Area"] || item.learning_area
        }]
      }
    })
  }

  const handleGenerateLessonPlan = async () => {
    if (!subject || !year || selectedCurriculumItems.length === 0) {
      setError('Please complete all required fields and select at least one curriculum standard before generating a lesson plan.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedLessonPlan(null);

    try {
      // Convert selected curriculum items to the format expected by the API
      const curriculumItemsForAPI = selectedCurriculumItems.map(item => ({
        code: item.code || item.id,
        title: item.title || `Curriculum item ${item.code}`
      }));

      const request = {
        subject,
        yearLevels: [year],
        items: curriculumItemsForAPI,
        durationMins: duration,
        classProfile: {
          size: classSize,
          literacyTier: literacyTier.toLowerCase(),
          additionalNeeds: []
        },
        options: {
          embedIndigenousPerspectives: indigLevel > 0,
          traumaInformedScaffolds: tiOn,
          differentiation: ['low', 'medium', 'high'][diff],
          assessmentStyle: assessment.toLowerCase()
        }
      };

      const response = await fetch('/api/lesson-plan/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate lesson plan');
      }

      const data = await response.json();
      setGeneratedLessonPlan(data.lessonPlan);
    } catch (err) {
      console.error('Lesson plan generation error:', err);
      setError(err.message || 'Failed to generate lesson plan. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FDE5DA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-[#333]">G'DAY {displayName?.toUpperCase?.() || 'TEACHER'}</h1>
          <Badge>Beta</Badge>
        </div>

        <div className="mb-8">
          <Stepper active={active} setActive={setActive} />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {active === 'basics' && (
                <motion.div key="basics" className="rounded-3xl bg-white shadow-md p-6">
                  <SectionHeader icon={BookOpen} title="Lesson Basics" subtitle="Pick the essentials." />
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SelectField label="Subject" value={subject} onChange={setSubject} options={subjects} placeholder="Select subject" />
                    <SelectField label="Year Level" value={year} onChange={setYear} options={yearLevels} placeholder="Select year level" />
                    <SliderField label="Duration (mins)" value={duration} onChange={setDuration} min={20} max={120} step={5} icon={Clock} />
                  </div>
                  <NavButtons onNext={() => setActive('curriculum')} nextEnabled={canNextBasics} />
                </motion.div>
              )}

              {active === 'curriculum' && (
                <motion.div key="curriculum" className="rounded-3xl bg-white shadow-md p-6">
                  <SectionHeader icon={LibraryBig} title="Curriculum Standards" subtitle="Select the specific curriculum outcomes you want to focus on." />
                  
                  <div className="mt-6">
                    <CurriculumSelector
                      curriculumItems={curriculumItems}
                      selectedItems={selectedCurriculumItems}
                      onSelectionChange={setSelectedCurriculumItems}
                      isLoading={isLoadingCurriculum}
                      error={curriculumError}
                      onRetry={fetchCurriculumItems}
                      subject={subject}
                      year={year}
                    />
                  </div>
                  
                  <NavButtons 
                    onPrev={() => setActive('basics')} 
                    onNext={() => setActive('class')} 
                    nextEnabled={canNextCurriculum}
                  />
                </motion.div>
              )}

              {active === 'class' && (
                <motion.div key="class" className="rounded-3xl bg-white shadow-md p-6">
                  <SectionHeader icon={Users} title="Class Profile" subtitle="Calibrate scaffolds to your learners." />
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SliderField label="Class Size" value={classSize} onChange={setClassSize} min={5} max={35} step={1} suffix="students" />
                    <SelectField label="Literacy Tier" value={literacyTier} onChange={setLiteracyTier} options={['Emerging','Mixed','Fluent']} placeholder="Select literacy tier" />
                    <SelectField label="Assessment Style" value={assessment} onChange={setAssessment} options={['Formative','Summative','Diagnostic']} placeholder="Select assessment" />
                  </div>
                  <NavButtons onPrev={() => setActive('basics')} onNext={() => setActive('pedagogy')} nextEnabled={canNextClass} />
                </motion.div>
              )}

              {active === 'pedagogy' && (
                <motion.div key="pedagogy" className="rounded-3xl bg-white shadow-md p-6">
                  <SectionHeader icon={Feather} title="Pedagogy & Scaffolds" subtitle="Center trauma-informed practice and embed Indigenous perspectives." />

                  {/* Trauma-informed toggle */}
                  <div className="mt-6 rounded-2xl border p-5 bg-[#fff9fb]">
                    <div className="flex items-center gap-3">
                      <HandHeart className="h-5 w-5 text-[#FD6585]" />
                      <h3 className="font-semibold">Trauma-Informed Scaffolds</h3>
                      <Toggle checked={tiOn} onChange={setTiOn} />
                    </div>
                    <p className="text-xs text-[#666] mt-2">These supports emphasize regulation, routine, and relationships. <button className="underline text-[#333]" onClick={() => setModalContent({title:'Trauma-Informed Scaffolds', body:'Strategies include predictable routines, co-regulation activities, calm entry/exit, and relational check-ins.', link:'/resources#trauma-informed'})}>Learn more</button></p>
                  </div>

                  {/* Indigenous perspectives depth */}
                  <div className="mt-6 rounded-2xl border p-5 bg-[#fbfff4]">
                    <div className="flex items-center gap-3">
                      <Brain className="h-5 w-5 text-[#888625]" />
                      <h3 className="font-semibold">Embedding Indigenous Perspectives</h3>
                    </div>
                    <p className="text-xs text-[#666] mt-2">Respectful integration of First Nations knowledge. Choose the depth that suits context. <button className="underline text-[#333]" onClick={() => setModalContent({title:'Embedding Indigenous Perspectives', body:'Contextual embedding may include Country acknowledgments or examples. Deep integration uses Indigenous pedagogies in lesson structure.', link:'/resources#indigenous'})}>Learn more</button></p>
                    <div className="mt-3 flex gap-2">
                      {[0,1,2].map((lvl) => (
                        <button key={lvl} onClick={() => setIndigLevel(lvl)} className={`${indigLevel===lvl?'bg-[#888625] text-white':'bg-white'} border rounded px-3 py-1 text-sm`}>{lvl===0?'Not included':lvl===1?'Contextual':'Deep integration'}</button>
                      ))}
                    </div>
                  </div>

                  {/* Aboriginal Pedagogy (8 Ways) */}
                  <div className="mt-6 rounded-2xl border p-5 bg-[#f0faff]">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold">Aboriginal Pedagogy (8 Ways)</h3>
                      <Toggle checked={aboriginalPedagogy} onChange={setAboriginalPedagogy} />
                    </div>
                    <p className="text-xs text-[#666] mt-2">Includes Story Sharing, Learning Maps, Land Links and more. <button className="underline text-[#333]" onClick={() => setModalContent({title:'Aboriginal Pedagogy (8 Ways)', body:'The 8 Ways framework focuses on Aboriginal processes of knowledge transmission and is adapted locally. It is a culturally safe entry point for embedding Aboriginal pedagogies.', link:'/resources#8ways'})}>Learn more</button></p>
                    {aboriginalPedagogy && selectedEightWays.length>0 && (
                      <ul className="list-disc list-inside text-xs text-[#555] mt-2">
                        {selectedEightWays.map((w)=> <li key={w}>{w}</li>)}
                      </ul>
                    )}
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-1">Scaffold depth</label>
                    <div className="flex gap-2">
                      {[0,1,2].map((lvl)=> (
                        <button key={lvl} onClick={()=> setDiff(lvl)} className={`${diff===lvl?'bg-[#333] text-white':'bg-white'} border rounded px-3 py-1 text-sm`}>{['Light','Balanced','Full'][lvl]}</button>
                      ))}
                    </div>
                  </div>

                  <NavButtons onPrev={() => setActive('class')} onNext={() => setActive('generate')} />
                </motion.div>
              )}

              {active === 'generate' && (
                <motion.div key="generate" className="rounded-3xl bg-white shadow-md p-6">
                  <SectionHeader icon={CheckCircle2} title="Review & Generate" subtitle="Quick recap before we craft your plan." />
                  <div className="mt-4">
                    <div className="rounded-2xl border p-4">
                      <h4 className="font-semibold mb-2">Live Preview</h4>
                      <PreviewCard subject={subject} year={year} duration={duration} classSize={classSize} literacyTier={literacyTier} assessment={assessment} tiOn={tiOn} diff={diff} indigLevel={indigLevel} aboriginalPedagogy={aboriginalPedagogy} selectedEightWays={selectedEightWays} selectedCurriculumItems={selectedCurriculumItems} />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button onClick={() => setActive('pedagogy')} className="px-4 py-2 bg-gray-200 rounded">Back</button>
                    <button 
                      onClick={handleGenerateLessonPlan}
                      disabled={isGenerating}
                      className={`px-4 py-2 rounded ${isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#333] hover:bg-[#555]'} text-white`}
                    >
                      {isGenerating ? 'Generating... (this may take a few minutes)' : 'Generate Lesson Plan'}
                    </button>
                  </div>
                  
                  {error && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg">
                      <p className="text-red-700 text-sm">{error}</p>
                      {error.includes('overloaded') && (
                        <button 
                          onClick={handleGenerateLessonPlan}
                          disabled={isGenerating}
                          className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                        >
                          Try Again
                        </button>
                      )}
                    </div>
                  )}
                  
                  {generatedLessonPlan && (
                    <div className="mt-6">
                      <h3 className="text-xl font-bold mb-4">Generated Lesson Plan</h3>
                      <div className="bg-white border rounded-lg p-6 max-h-96 overflow-y-auto">
                        <h4 className="text-lg font-semibold mb-2">{generatedLessonPlan.title}</h4>
                        <p className="text-gray-700 mb-4">{generatedLessonPlan.overview}</p>
                        
                        <div className="mb-4">
                          <h5 className="font-semibold mb-2">Learning Goals:</h5>
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            {generatedLessonPlan.learningGoals?.map((goal, index) => (
                              <li key={index}>{goal}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="font-semibold mb-2">Lesson Timeline:</h5>
                          <div className="space-y-2">
                            {generatedLessonPlan.lessonTimeline?.map((item, index) => (
                              <div key={index} className="border-l-2 border-blue-300 pl-3">
                                <div className="font-medium text-sm">{item.minutes} minutes: {item.activity}</div>
                                <div className="text-xs text-gray-600 mt-1">
                                  <strong>Teacher:</strong> {item.teacherMoves?.join(', ')}
                                </div>
                                <div className="text-xs text-gray-600">
                                  <strong>Students:</strong> {item.studentTasks?.join(', ')}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {generatedLessonPlan.resources && generatedLessonPlan.resources.length > 0 && (
                          <div className="mb-4">
                            <h5 className="font-semibold mb-2">Resources:</h5>
                            <ul className="list-disc list-inside text-sm text-gray-700">
                              {generatedLessonPlan.resources.map((resource, index) => (
                                <li key={index}>{resource}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {generatedLessonPlan.traumaInformedStrategies && generatedLessonPlan.traumaInformedStrategies.length > 0 && (
                          <div className="mb-4">
                            <h5 className="font-semibold mb-2">Trauma-Informed Strategies:</h5>
                            <ul className="list-disc list-inside text-sm text-gray-700">
                              {generatedLessonPlan.traumaInformedStrategies.map((strategy, index) => (
                                <li key={index}>{strategy}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {generatedLessonPlan.indigenousPerspectives && (
                          <div className="mb-4">
                            <h5 className="font-semibold mb-2">Indigenous Perspectives:</h5>
                            <p className="text-sm text-gray-700">{generatedLessonPlan.indigenousPerspectives}</p>
                          </div>
                        )}
                      </div>
                      <div className="mt-6">
                        <TaughtfulSurvey />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {modalContent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg shadow-xl">
            <h2 className="text-lg font-bold mb-2">{modalContent.title}</h2>
            <p className="text-sm text-[#333] mb-4">{modalContent.body}</p>
            {modalContent.link && (
              <a href={modalContent.link} className="block text-sm text-blue-600 underline mb-4" target="_blank" rel="noopener noreferrer">Go to resources page</a>
            )}
            <button onClick={() => setModalContent(null)} className="px-4 py-2 bg-[#333] text-white rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Dev sanity tests (lightweight) ---
if (typeof window !== 'undefined' && typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
  const sci = getWeightedEightWays('Science');
  console.assert(sci.includes('Land Links: Place-based learning connected to Country'), 'Science should prefer Land Links');
  const eng = getWeightedEightWays('English');
  console.assert(eng.includes('Story Sharing: Approaching learning through narrative'), 'English should prefer Story Sharing');
}

// --- Supporting Components ---
function Stepper({ active, setActive }) {
  return (
    <div className="flex flex-wrap gap-2">
      {steps.map((step) => (
        <button
          key={step.key}
          onClick={() => setActive(step.key)}
          className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            active === step.key ? 'bg-[#333] text-white' : 'bg-gray-200 text-[#333]'
          }`}
        >
          <step.icon className="h-4 w-4 mr-2" />
          {step.label}
        </button>
      ))}
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-6 w-6 text-[#333]" />
      <div>
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border px-2 py-1"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function SliderField({ label, value, onChange, min, max, step, icon: Icon, suffix }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm text-gray-700">{value}{suffix ? ` ${suffix}` : ''}</span>
      </div>
    </div>
  );
}

function NavButtons({ onPrev, onNext, nextEnabled = true }) {
  return (
    <div className="mt-6 flex justify-between">
      {onPrev ? (
        <button onClick={onPrev} className="px-4 py-2 bg-gray-300 rounded">Back</button>
      ) : <span />}
      {onNext && (
        <button
          onClick={onNext}
          disabled={!nextEnabled}
          className={`px-4 py-2 rounded ${nextEnabled ? 'bg-[#333] text-white' : 'bg-gray-200 text-gray-400'}`}
        >
          Next
        </button>
      )}
    </div>
  );
}

function PreviewCard({ subject, year, duration, classSize, literacyTier, assessment, tiOn, diff, indigLevel, aboriginalPedagogy, selectedEightWays, selectedCurriculumItems }) {
  return (
    <div className="space-y-2 text-sm">
      <p><strong>Subject:</strong> {subject || '—'}</p>
      <p><strong>Year:</strong> {year || '—'}</p>
      <p><strong>Duration:</strong> {duration} mins</p>
      <p><strong>Class:</strong> {classSize} students • {literacyTier}</p>
      <p><strong>Assessment:</strong> {assessment}</p>
      <p><strong>Trauma-informed scaffolds:</strong> {tiOn ? 'Included' : 'Not included'}</p>
      <p><strong>Scaffold depth:</strong> {['Light','Balanced','Full'][diff]}</p>
      <p><strong>Embedding Indigenous perspectives:</strong> {['Not included','Contextual','Deep integration'][indigLevel]}</p>
      <p><strong>Aboriginal Pedagogy (8 Ways):</strong> {aboriginalPedagogy ? 'Enabled' : 'Not included'}</p>
      {aboriginalPedagogy && (
        <ul className="list-disc list-inside text-xs text-[#555]">
          {selectedEightWays.map((way) => <li key={way}>{way}</li>)}
        </ul>
      )}
      <p><strong>Selected Curriculum Standards:</strong> {selectedCurriculumItems?.length || 0} items</p>
      {selectedCurriculumItems && selectedCurriculumItems.length > 0 && (
        <ul className="list-disc list-inside text-xs text-[#555] max-h-20 overflow-y-auto">
          {selectedCurriculumItems.map((item, index) => (
            <li key={item.id || index}>
              {item.code}: {item.title || item.description || 'Curriculum Standard'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Badge({ children }) {
  return <span className="bg-[#333] text-white px-2 py-1 rounded-full text-xs">{children}</span>;
}

function Toggle({ checked, onChange }) {
  return (
    <button onClick={() => onChange(!checked)} className={`ml-auto relative h-6 w-11 rounded-full ${checked ? 'bg-[#FD6585]' : 'bg-gray-300'}`}>
      <span className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full shadow ${checked ? 'translate-x-5' : ''}`}></span>
    </button>
  );
}