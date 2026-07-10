'use client';

import CrudPage from '@/components/admin/CrudPage';

export default function AdminExperiences() {
  return (
    <CrudPage
      title="Experience"
      endpoint="/experiences"
      defaults={{
        company: '',
        role: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        responsibilities: [],
        achievements: [],
      }}
      fields={[
        { key: 'role', label: 'Role' },
        { key: 'company', label: 'Company' },
        { key: 'location', label: 'Location' },
        { key: 'startDate', label: 'Start Date' },
        { key: 'endDate', label: 'End Date' },
        { key: 'current', label: 'Currently Working Here', type: 'checkbox' },
        { key: 'responsibilities', label: 'Responsibilities', type: 'array' },
        { key: 'achievements', label: 'Achievements', type: 'array' },
      ]}
      summary={(item) => (
        <div>
          <p className="text-sm font-semibold text-white">{item.role} @ {item.company}</p>
          <p className="text-xs text-zinc-500">{item.startDate} – {item.current ? 'Present' : item.endDate}</p>
        </div>
      )}
    />
  );
}
