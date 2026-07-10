'use client';

import CrudPage from '@/components/admin/CrudPage';

export default function AdminEducation() {
  return (
    <CrudPage
      title="Education"
      endpoint="/education"
      reorderType="education"
      defaults={{ degree: '', school: '', duration: '', position: 0 }}
      fields={[
        { key: 'degree', label: 'Degree' },
        { key: 'school', label: 'School' },
        { key: 'duration', label: 'Duration' },
      ]}
      summary={(item) => (
        <div>
          <p className="text-sm font-semibold text-white">{item.degree}</p>
          <p className="text-xs text-zinc-500">{item.school} · {item.duration}</p>
        </div>
      )}
    />
  );
}
