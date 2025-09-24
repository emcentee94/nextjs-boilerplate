'use client';

import React, { useMemo, useState } from 'react';
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
} from 'lucide-react';

// Cursor-ready React component
// Update: Modals now include a "Resources" link to an external resources page.

const steps = [
  { key: 'basics', label: 'Lesson Basics', icon: BookOpen },
  { key: 'class', label: 'Class Profile', icon: Users },
  { key: 'pedagogy', label: 'Pedagogy & Scaffolds', icon: Feather },
  { key: 'generate', label: 'Review & Generate', icon: CheckCircle2 },
];

const subjects = ['English', 'Mathematics', 'Science', 'Humanities', 'Health & PE', 'The Arts', 'Technologies'];

const yearLevels = ['F', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export default function TaughtfulDashboard() {
  const [active, setActive] = useState('basics');

  // Step 1 - Basics
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [duration, setDuration] = useState(60);

  // Step 2 - Class Profile
  const [classSize, setClassSize] = useState(25);
  const [literacyTier, setLiteracyTier] = useState('Mixed');
  const [assessment, setAssessment] = useState('Formative');

  // Step 3 - Pedagogy & Scaffolds
  const [diff, setDiff] = useState(1);
  const [tiOn, setTiOn] = useState(true);
  const [indigLevel, setIndigLevel] = useState(1);

  // Modal state
  const [modalContent, setModalContent] = useState(null);

  const canNextBasics = Boolean(subject && year);

  return (
    <div className="min-h-screen w-full bg-[#FDE5DA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-[#333]">Teacher Dashboard</h1>
          <Badge>Beta</Badge>
        </div>

        {/* Stepper */}
        <div className="mt-8">
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
                  <NavButtons onNext={() => setActive('class')} nextEnabled={canNextBasics} />
                </motion.div>
              )}

              {active === 'class' && (
                <motion.div key="class" className="rounded-3xl bg-white shadow-md p-6">
                  <SectionHeader icon={Users} title="Class Profile" subtitle="Calibrate scaffolds to your learners." />
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SliderField label="Class Size" value={classSize} onChange={setClassSize} min={5} max={35} step={1} icon={Users} suffix="students" />
                    <SelectField label="Literacy Tier" value={literacyTier} onChange={setLiteracyTier} options={['Emerging', 'Mixed', 'Fluent']} />
                    <SelectField label="Assessment Style" value={assessment} onChange={setAssessment} options={['Formative', 'Summative', 'Diagnostic']} />
                  </div>
                  <NavButtons onPrev={() => setActive('basics')} onNext={() => setActive('pedagogy')} />
                </motion.div>
              )}

              {active === 'pedagogy' && (
                <motion.div key="pedagogy" className="rounded-3xl bg-white shadow-md p-6">
                  <SectionHeader icon={Feather} title="Pedagogy & Scaffolds" subtitle="Center trauma-informed practice and embed Indigenous perspectives." />

                  <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Trauma-informed */}
                    <div className="rounded-2xl border p-5 bg-[#fff9fb]">
                      <div className="flex items-center gap-3">
                        <HandHeart className="h-5 w-5 text-[#FD6585]" />
                        <h3 className="font-semibold">Trauma-Informed Scaffolds</h3>
                        <Toggle checked={tiOn} onChange={setTiOn} />
                      </div>
                      <p className="text-xs text-[#666] mt-2">These supports emphasize regulation, routine, and relationships. They help create safe environments for students who have experienced adversity. <button className="underline text-[#333]" onClick={() => setModalContent({title: 'Trauma-Informed Scaffolds', body: 'Practical strategies include predictable routines, co-regulation activities, safe spaces, and relational check-ins to support all learners.', link: '/resources#trauma-informed'})}>Learn more</button></p>
                    </div>

                    {/* Indigenous perspectives */}
                    <div className="rounded-2xl border p-5 bg-[#fbfff4]">
                      <div className="flex items-center gap-3">
                        <Brain className="h-5 w-5 text-[#888625]" />
                        <h3 className="font-semibold">Embedding Indigenous Perspectives</h3>
                        <div className="ml-auto"></div>
                      </div>
                      <p className="text-xs text-[#666] mt-2">Refers to the respectful integration of First Nations knowledge. Levels: Not included, Contextual (acknowledgment/examples), Deep (lesson shaped by Indigenous pedagogies). <button className="underline text-[#333]" onClick={() => setModalContent({title: 'Embedding Indigenous Perspectives', body: 'Contextual embedding may include Country acknowledgments or examples. Deep integration uses frameworks such as 8 Ways of Learning, weaving story, land, kinship, and cultural protocols into lesson design.', link: '/resources#indigenous'})}>Learn more</button></p>
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        {[0, 1, 2].map((lvl) => (
                          <ChoiceCard
                            key={lvl}
                            active={indigLevel === lvl}
                            onClick={() => setIndigLevel(lvl)}
                            title={lvl === 0 ? 'Not included' : lvl === 1 ? 'Contextual' : 'Deep integration'}
                            description={lvl === 0 ? 'No explicit embedding.' : lvl === 1 ? 'Acknowledgment and contextual examples.' : 'Lesson structured by Indigenous pedagogies.'}
                            icon={lvl === 0 ? LibraryBig : Brain}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <NavButtons onPrev={() => setActive('class')} onNext={() => setActive('generate')} />
                </motion.div>
              )}

              {active === 'generate' && (
                <motion.div key="generate" className="rounded-3xl bg-white shadow-md p-6">
                  <SectionHeader icon={CheckCircle2} title="Review & Generate" subtitle="Quick recap before we craft your plan." />
                  <PreviewCard subject={subject} year={year} duration={duration} classSize={classSize} literacyTier={literacyTier} assessment={assessment} tiOn={tiOn} diff={diff} indigLevel={indigLevel} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Modal */}
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


function PreviewCard(props) {
  const { subject, year, duration, classSize, literacyTier, assessment, tiOn, diff, indigLevel } = props;
  return (
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

