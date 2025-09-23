// Example: src/components/curriculum/LearningAreaList.tsx
import React from "react";
import { LEARNING_AREAS } from "@/src/data/curriculum/learningAreas";

export default function LearningAreaList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {LEARNING_AREAS.map((la) => (
        <div key={la.slug} className="rounded-2xl p-4 border shadow-sm">
          <h3 className="text-xl font-semibold">{la.name}</h3>
          <p className="mt-1 text-sm text-gray-600">{la.overview}</p>
          <ul className="mt-3 list-disc pl-5">
            {la.subjects.map((s) => (
              <li key={s.slug}>
                <a className="underline" href={`/curriculum/${s.slug}`}>{s.name}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
