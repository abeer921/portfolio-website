'use client';

import CrudPage from '@/components/admin/CrudPage';

export default function AdminSkills() {
  return (
    <CrudPage
      title="Skills"
      endpoint="/skills"
      reorderType="skills"
      defaults={{ name: '', category: 'UI UX', level: 80, position: 0 }}
      fields={[
        { key: 'name', label: 'Skill Name' },
        { key: 'category', label: 'Category' },
        { key: 'level', label: 'Level (0-100)', type: 'number' },
      ]}
      summary={(item) => (
        <div className="flex items-center gap-4">
          <p className="text-sm font-semibold text-white">{item.name}</p>
          <span className="text-xs text-zinc-500">{item.category}</span>
          <span className="text-xs text-[#8B5CF6]">{item.level}%</span>
        </div>
      )}
    />
  );
}
