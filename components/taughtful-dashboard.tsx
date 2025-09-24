'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Users,
  Sparkles,
  CheckCircle2,
  Clock,
  GraduationCap,
  Layers,
  LibraryBig,
  HelpCircle,
  Brain,
  HandHeart,
  Feather,
} from 'lucide-react';

// TaughtfulDashboard - Cursor-ready React (JS) component
// Notes:
// - All quotes are straight ASCII quotes to avoid SyntaxError: Unexpected character.
// - No TypeScript types used.
// - Depends on: react, framer-motion, lucide-react, tailwindcss.
// - Optional mock API wired into Generate button.

const steps = [
  { key: 'basics', label: 'Lesson Basics', icon: BookOpen },
  { key: 'class', label: 'Class Profile', icon: Users },
  { key: 'pedagogy', label: 'Pedagogy & Scaffolds', icon: Feather },
  { key: 'generate', label: 'Review & Generate', icon: CheckCircle2 },
];

const subjects = [
  'English',
  'Mathematics',
  'Science',
  'Humanities',
  'Health & PE',
  'The Arts',
  'Technologies',
];

const yearLevels = ['F', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export default function TaughtfulDashboard() {
  const [active, setActive] = useState('basics');

  // Step 1 - Basics
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [duration, setDuration] = useState(50); // minutes

  // Step 2 - Class Profile
  const [classSize, setClassSize] = useState(25);
  const [literacyTier, setLiteracyTier] = useState('Mixed'); // Mixed / Emerging / Fluent
  const [assessment, setAssessment] = useState('Formative');

  // Step 3 - Pedagogy & Scaffolds
  const [diff, setDiff] = useState(1); // 0=Light,1=Balanced,2=Full
  const [tiOn, setTiOn] = useState(true); // Trauma-informed scaffolds toggle
  const [indigLevel, setIndigLevel] = useState(1); // 0=None,1=Light,2=Deep

  // Generate (mock API)
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutline, setGeneratedOutline] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const progress = useMemo(() => {
    let p = 0;
    if (subject && year) p += 0.33;
    if (classSize > 0) p += 0.33;
    if (tiOn || indigLevel > 0) p += 0.34;
    return Math.min(1, p);
  }, [subject, year, classSize, tiOn, indigLevel]);

  const canNextBasics = Boolean(subject && year);
  const canGenerate = Boolean(subject && year && classSize > 0);

  async function handleGenerate() {
    if (!canGenerate) return;
    setIsGenerating(true);
    setErrorMsg('');
    setGeneratedOutline(null);
    try {
      const payload = buildPayload({
        subject,
        year,
        duration,
        classSize,
        literacyTier,
        assessment,
        tiOn,
        diff,
        indigLevel,
      });
      const res = await mockGenerateLesson(payload);
      setGeneratedOutline(res);
    } catch (e) {
      setErrorMsg('Could not generate the lesson preview.');
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#FDE5DA]">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#333333]">Teacher Dashboard</h1>
            <p className="text-[#666666] mt-1">Generate AI-powered lesson plans aligned with the Australian Curriculum.</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Badge>Beta</Badge>
            <div className="text-xs text-[#666666]">Your feedback improves Taughtful</div>
          </div>
        </div>

        {/* Stepper */}
        <div className="mt-8">
          <Stepper active={active} setActive={setActive} />
        </div>

        {/* Main layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Panels */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {active === 'basics' && (
                <motion.div key="basics" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="rounded-3xl bg-white shadow-md p-6">
                  <SectionHeader icon={BookOpen} title="Lesson Basics" subtitle="Pick the essentials so we can tailor the plan." />
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SelectField label="Subject" value={subject} onChange={setSubject} options={subjects} placeholder="Select subject" />
                    <SelectField label="Year Level" value={year} onChange={setYear} options={yearLevels} placeholder="Select year level" />
                    <SliderField label="Duration (mins)" value={duration} onChange={setDuration} min={20} max={120} step={5} icon={Clock} />
                  </div>
                  <NavButtons onNext={() => setActive('class')} nextEnabled={canNextBasics} />
                </motion.div>
              )}

              {active === 'class' && (
                <motion.div key="class" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="rounded-3xl bg-white shadow-md p-6">
                  <SectionHeader icon={Users} title="Class Profile" subtitle="Help us calibrate scaffolds to your learners." />
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SliderField label="Class Size" value={classSize} onChange={setClassSize} min={5} max={35} step={1} icon={Users} suffix="students" />
                    <SelectField label="Literacy Tier" value={literacyTier} onChange={setLiteracyTier} options={[
                      'Emerging',
                      'Mixed',
                      'Fluent',
                    ]} />
                    <SelectField label="Assessment Style" value={assessment} onChange={setAssessment} options={['Formative', 'Summative', 'Diagnostic']} />
                  </div>
                  <NavButtons onPrev={() => setActive('basics')} onNext={() => setActive('pedagogy')} />
                </motion.div>
              )}

              {active === 'pedagogy' && (
                <motion.div key="pedagogy" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="rounded-3xl bg-white shadow-md p-6">
                  <SectionHeader icon={Feather} title="Pedagogy & Scaffolds" subtitle="Center trauma-informed practice and embed Indigenous perspectives." />

                  {/* Trauma-informed toggle + slider */}
                  <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-[#fde] p-5 bg-[#fff9fb]">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#FD6585]/15 flex items-center justify-center">
                          <HandHeart className="h-5 w-5 text-[#FD6585]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#333]">Trauma-Informed Scaffolds</h3>
                          <p className="text-sm text-[#666]">Regulation, routine, and relational practices layered into your lesson.</p>
                        </div>
                        <Toggle checked={tiOn} onChange={setTiOn} />
                      </div>

                      <div className={`mt-4 ${tiOn ? '' : 'opacity-40 pointer-events-none'}`}>
                        <SliderField
                          label="Differentiation Depth"
                          value={diff}
                          onChange={setDiff}
                          min={0}
                          max={2}
                          step={1}
                          marks={[
                            { v: 0, l: 'Light' },
                            { v: 1, l: 'Balanced' },
                            { v: 2, l: 'Full' },
                          ]}
                          icon={Layers}
                        />
                        <ul className="mt-3 text-sm text-[#555] list-disc ml-5">
                          {diff === 0 && <li>Light scaffolds: sentence starters, think-pair-share, visual anchors.</li>}
                          {diff === 1 && <li>Balanced supports: vocabulary pre-teach, chunked tasks, choice of output.</li>}
                          {diff === 2 && <li>Full support: co-regulation cues, explicit modeling, step-by-step frames.</li>}
                        </ul>
                      </div>
                    </div>

                    {/* Indigenous embedding cards */}
                    <div className="rounded-2xl border border-[#dfe7d1] p-5 bg-[#fbfff4]">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#888625]/15 flex items-center justify-center">
                          <SproutIcon />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#333]">Indigenous Perspectives</h3>
                          <p className="text-sm text-[#666]">Embed respectfully, aligned with community-informed frameworks.</p>
                        </div>
                        <InfoTooltip text="Levels reflect depth of embedding, from contextual references to deep structuring using frameworks like 8 Ways of Learning." />
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-3">
                        {[0, 1, 2].map(function (lvl) {
                          return (
                            <ChoiceCard
                              key={String(lvl)}
                              active={indigLevel === lvl}
                              onClick={function () {
                                setIndigLevel(lvl);
                              }}
                              title={lvl === 0 ? 'None' : lvl === 1 ? 'Light' : 'Deep'}
                              description={
                                lvl === 0
                                  ? 'No explicit embedding this lesson.'
                                  : lvl === 1
                                  ? 'Contextual examples, acknowledgments, respectful language.'
                                  : 'Lesson structure shaped by Indigenous pedagogies (for example, 8 Ways).'
                              }
                              icon={lvl === 0 ? LibraryBig : Brain}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <NavButtons onPrev={() => setActive('class')} onNext={() => setActive('generate')} />
                </motion.div>
              )}

              {active === 'generate' && (
                <motion.div key="generate" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="rounded-3xl bg-white shadow-md p-6">
                  <SectionHeader icon={CheckCircle2} title="Review & Generate" subtitle="Quick recap before we craft your plan." />

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SummaryCard title="Lesson">
                      <SummaryRow label="Subject" value={subject || '—'} />
                      <SummaryRow label="Year Level" value={year || '—'} />
                      <SummaryRow label="Duration" value={String(duration) + ' mins'} />
                    </SummaryCard>
                    <SummaryCard title="Learners">
                      <SummaryRow label="Class Size" value={String(classSize) + ' students'} />
                      <SummaryRow label="Literacy Tier" value={literacyTier} />
                      <SummaryRow label="Assessment" value={assessment} />
                    </SummaryCard>
                    <SummaryCard title="Pedagogy">
                      <SummaryRow label="Trauma-Informed" value={tiOn ? 'Enabled' : 'Off'} />
                      <SummaryRow label="Differentiation Depth" value={['Light', 'Balanced', 'Full'][diff]} />
                      <SummaryRow label="Indigenous Perspectives" value={['None', 'Light', 'Deep'][indigLevel]} />
                    </SummaryCard>

                    <div className="rounded-2xl bg-[#fff6f8] border border-[#ffd1dc] p-5">
                      <h4 className="font-semibold text-[#333] mb-2">What you will get</h4>
                      <ul className="text-sm text-[#555] space-y-1 list-disc ml-5">
                        <li>V9-aligned learning goals and success criteria</li>
                        <li>Stepwise lesson flow with timing</li>
                        <li>Scaffolds adapted to class profile</li>
                        <li>Indigenous perspectives embedded at selected depth</li>
                        <li>Assessment prompts and export options</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-3 flex-wrap">
                    <div className="w-full md:w-auto">
                      <ProgressBar progress={progress} />
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                      <button onClick={() => setActive('pedagogy')} className="px-4 py-3 rounded-xl bg-white border border-[#ddd] text-[#333] hover:bg-[#fafafa] transition">Back</button>
                      <GradientButton disabled={!canGenerate || isGenerating}>
                        <button onClick={handleGenerate} className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5" />
                          <span>{isGenerating ? 'Generating...' : 'Generate Trauma-Informed, Culturally Responsive Plan'}</span>
                        </button>
                      </GradientButton>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errorMsg}</div>
                  )}

                  {generatedOutline && (
                    <div className="mt-6 rounded-2xl border border-[#eee] p-5">
                      <h4 className="font-semibold text-[#333] mb-2">Generated Outline</h4>
                      <ol className="text-sm text-[#555] list-decimal ml-5 space-y-1">
                        {generatedOutline.steps.map(function (s, i) {
                          return <li key={String(i)}>{s}</li>;
                        })}
                      </ol>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Live Preview */}
          <div className="lg:col-span-1">
            <PreviewCard
              subject={subject}
              year={year}
              duration={duration}
              classSize={classSize}
              literacyTier={literacyTier}
              assessment={assessment}
              tiOn={tiOn}
              diff={diff}
              indigLevel={indigLevel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stepper(props) {
  const { active, setActive } = props;
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[#FD6585]/30 via-[#FF9A2E]/30 to-[#888625]/30 rounded-full" />
      <div className="relative grid grid-cols-4 gap-4">
        {steps.map(function (s, idx) {
          const Icon = s.icon;
          const isActive = active === s.key;
          return (
            <button
              key={s.key}
              onClick={function () {
                setActive(s.key);
              }}
              className={
                'group relative flex items-center gap-3 rounded-2xl p-3 bg-white shadow-sm border ' +
                (isActive ? 'border-[#FD6585]' : 'border-transparent')
              }
            >
              <div
                className={
                  'h-10 w-10 rounded-xl flex items-center justify-center transition ' +
                  (isActive ? 'bg-[#FD6585] text-white' : 'bg-[#333333]/5 text-[#333]')
                }
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-[#333]">{s.label}</div>
                <div className="text-xs text-[#666]">Step {idx + 1}</div>
              </div>
              <div
                className={
                  'absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-2/3 rounded-full transition ' +
                  (isActive ? 'bg-[#FD6585]' : 'bg-transparent')
                }
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SectionHeader(props) {
  const { icon: Icon, title, subtitle } = props;
  return (
    <div className="flex items-start gap-3">
      <div className="h-12 w-12 rounded-2xl bg-white border border-[#eee] shadow flex items-center justify-center">
        <Icon className="h-6 w-6 text-[#333]" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-[#333]">{title}</h2>
        <p className="text-sm text-[#666]">{subtitle}</p>
      </div>
    </div>
  );
}

function SelectField(props) {
  const { label, value, onChange, options, placeholder } = props;
  return (
    <label className="block">
      <span className="text-sm font-medium text-[#333]">{label}</span>
      <div className="mt-1 relative">
        <select
          value={value}
          onChange={function (e) {
            onChange(e.target.value);
          }}
          className="w-full appearance-none rounded-xl border border-[#e5e5e5] bg-white px-3 py-2 text-[#333] focus:outline-none focus:ring-2 focus:ring-[#FD6585]/50"
        >
          <option value="" disabled>
            {placeholder || 'Select'}
          </option>
          {options.map(function (o) {
            return (
              <option key={o} value={o}>
                {o}
              </option>
            );
          })}
        </select>
        <Chevron className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
      </div>
    </label>
  );
}

function SliderField(props) {
  const { label, value, onChange, min, max, step, icon: Icon, suffix, marks } = props;
  return (
    <label className="block">
      <span className="text-sm font-medium text-[#333] flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-[#666]" />}
        {label}
      </span>
      <div className="mt-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step || 1}
          value={value}
          onChange={function (e) {
            onChange(Number(e.target.value));
          }}
          className="w-full accent-[#FD6585]"
        />
        <div className="flex items-center justify-between mt-1 text-xs text-[#666]">
          <span>{min}</span>
          <span className="font-medium text-[#333]">{String(value) + (suffix ? ' ' + suffix : '')}</span>
          <span>{max}</span>
        </div>
        {marks && (
          <div className="mt-2 grid grid-cols-3 text-xs text-[#666]">
            {marks.map(function (m) {
              return (
                <div key={String(m.v)} className="text-center">
                  <span
                    className={
                      'px-2 py-0.5 rounded-full ' + (value === m.v ? 'bg-[#333] text-white' : 'bg-[#f2f2f2] text-[#333]')
                    }
                  >
                    {m.l}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </label>
  );
}

function ChoiceCard(props) {
  const { active, onClick, title, description, icon: Icon } = props;
  return (
    <button
      onClick={onClick}
      className={
        'text-left rounded-2xl border p-4 transition shadow-sm hover:shadow-md ' +
        (active ? 'border-[#888625] bg-white' : 'border-[#e8eddc] bg-[#fcfff7]')
      }
    >
      <div className="flex items-start gap-3">
        <div className={
          'h-10 w-10 rounded-xl flex items-center justify-center ' +
          (active ? 'bg-[#888625] text-white' : 'bg-[#888625]/15 text-[#55611c]')
        }>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="font-semibold text-[#333]">{title}</div>
          <div className="text-sm text-[#666]">{description}</div>
        </div>
      </div>
    </button>
  );
}

function NavButtons(props) {
  const { onPrev, onNext, nextEnabled } = props;
  return (
    <div className="mt-6 flex justify-between">
      <div>{onPrev && (
        <button onClick={onPrev} className="px-4 py-2 rounded-xl border border-[#ddd] bg-white text-[#333] hover:bg-[#fafafa]">Back</button>
      )}</div>
      <div>{onNext && (
        <button onClick={onNext} disabled={nextEnabled === false} className={(nextEnabled === false ? 'bg-[#c9c9c9] cursor-not-allowed ' : 'bg-[#333] hover:bg-black ') + 'px-5 py-2.5 rounded-xl text-white transition'}>Next</button>
      )}</div>
    </div>
  );
}

function GradientButton(props) {
  const { children, disabled } = props;
  return (
    <button disabled={disabled} className={(disabled ? 'bg-[#c9c9c9] cursor-not-allowed ' : 'bg-gradient-to-r from-[#FD6585] via-[#FF9A2E] to-[#888625] hover:brightness-110 ') + 'flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-semibold shadow-md transition'}>
      {children}
    </button>
  );
}

function PreviewCard(props) {
  const { subject, year, duration, classSize, literacyTier, assessment, tiOn, diff, indigLevel } = props;
  return (
    <div className="sticky top-6 rounded-3xl bg-white shadow-md p-6 border border-[#f1f1f1]">
      <h3 className="text-lg font-bold text-[#333] flex items-center gap-2"><Sparkles className="h-5 w-5 text-[#FD6585]" /> Live Preview</h3>
      <p className="text-xs text-[#666]">Updates as you tweak inputs.</p>

      <div className="mt-4 space-y-3">
        <Pill icon={BookOpen} label={subject || 'Subject'} />
        <Pill icon={GraduationCap} label={'Year ' + (year || '—')} />
        <Pill icon={Clock} label={String(duration) + ' mins'} />
        <Pill icon={Users} label={String(classSize) + ' students • ' + literacyTier} />
        <Pill icon={Layers} label={assessment + ' assessment'} />
        <Pill icon={HandHeart} label={'Trauma-informed: ' + (tiOn ? 'On' : 'Off')} />
        <Pill icon={Layers} label={'Differentiation: ' + ['Light', 'Balanced', 'Full'][diff]} />
        <Pill icon={Feather} label={'Indigenous: ' + ['None', 'Light', 'Deep'][indigLevel]} />
      </div>

      <div className="mt-6 rounded-2xl bg-[#fff6f8] border border-[#ffd1dc] p-4">
        <h4 className="font-semibold text-[#333] mb-2">Lesson Outline (preview)</h4>
        <ol className="text-sm text-[#555] list-decimal ml-5 space-y-1">
          <li>Warm welcome and regulation micro-routine</li>
          <li>Connect to prior knowledge ({subject || 'subject'})</li>
          <li>Teacher modeling and guided practice</li>
          <li>Student task with {['light', 'balanced', 'full'][diff]} scaffolds</li>
          <li>{['', 'Contextual Indigenous perspective', 'Deep Indigenous pedagogy frame'][indigLevel]}</li>
          <li>Exit check and {assessment} prompt</li>
        </ol>
      </div>

      <div className="mt-6">
        <ProgressBar progress={Math.min(1, (subject ? 0.3 : 0) + (year ? 0.2 : 0) + (classSize ? 0.2 : 0) + (tiOn || indigLevel ? 0.3 : 0))} />
      </div>
    </div>
  );
}

function ProgressBar(props) {
  const { progress } = props;
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-[#666] mb-1"><span>Setup Progress</span><span>{Math.round(progress * 100)}%</span></div>
      <div className="h-3 rounded-full bg-[#eee] overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#FD6585] via-[#FF9A2E] to-[#888625]" style={{ width: String(Math.round(progress * 100)) + '%' }} />
      </div>
    </div>
  );
}

function Pill(props) {
  const { icon: Icon, label } = props;
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[#f7f7f7] px-3 py-1 text-sm text-[#333] mr-2">
      <Icon className="h-4 w-4 text-[#666]" />
      <span>{label}</span>
    </div>
  );
}

function SummaryCard(props) {
  const { title, children } = props;
  return (
    <div className="rounded-2xl border border-[#eee] p-5 bg-white">
      <h4 className="font-semibold text-[#333] mb-3">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function SummaryRow(props) {
  const { label, value } = props;
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-[#666]">{label}</span>
      <span className="font-medium text-[#333]">{value}</span>
    </div>
  );
}

function Chevron(props) {
  return (
    <svg {...props} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
  );
}

function Badge(props) {
  const { children } = props;
  return <span className="inline-flex items-center rounded-full bg-[#333] text-white text-xs px-2 py-1">{children}</span>;
}

function Toggle(props) {
  const { checked, onChange } = props;
  return (
    <button onClick={function () { onChange(!checked); }} className={'ml-auto relative h-6 w-11 rounded-full transition ' + (checked ? 'bg-[#FD6585]' : 'bg-[#dcdcdc]')}>
      <span className={'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition ' + (checked ? 'translate-x-5' : '')} />
    </button>
  );
}

function InfoTooltip(props) {
  const { text } = props;
  return (
    <div className="ml-auto group relative">
      <HelpCircle className="h-5 w-5 text-[#666]" />
      <div className="absolute z-10 hidden group-hover:block right-0 mt-2 w-72 rounded-xl border border-[#eee] bg-white p-3 shadow-xl">
        <div className="text-sm text-[#555]">{text}</div>
      </div>
    </div>
  );
}

function SproutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888625" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20c3-6 0-10-4-12 4 0 6 2 8 5 2-5 5-8 10-9-3 4-4 7-4 10" /><path d="M12 21v-6" /></svg>
  );
}

// ---------------------------
// Mock API and pure helpers
// ---------------------------

function buildPayload(state) {
  return {
    subject: state.subject,
    year: state.year,
    duration: Number(state.duration),
    classSize: Number(state.classSize),
    literacyTier: state.literacyTier,
    assessment: state.assessment,
    traumaInformed: Boolean(state.tiOn),
    differentiation: ['light', 'balanced', 'full'][state.diff],
    indigenousEmbedding: ['none', 'light', 'deep'][state.indigLevel],
  };
}

function mockGenerateLesson(payload) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({
        steps: [
          'Welcome and regulation micro-routine (2-3 mins)',
          'Connect to prior knowledge in ' + payload.subject,
          'Modeling and guided practice',
          'Student task with ' + payload.differentiation + ' scaffolds',
          (payload.indigenousEmbedding === 'none'
            ? 'Optional Indigenous connection (not embedded)'
            : payload.indigenousEmbedding === 'light'
            ? 'Contextual Indigenous perspective'
            : 'Deep Indigenous pedagogy frame'),
          'Exit check and ' + payload.assessment + ' prompt',
        ],
      });
    }, 900);
  });
}
