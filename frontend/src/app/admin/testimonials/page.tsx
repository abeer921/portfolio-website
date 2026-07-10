'use client';

import CrudPage from '@/components/admin/CrudPage';

export default function AdminTestimonials() {
  return (
    <CrudPage
      title="Testimonials"
      endpoint="/testimonials"
      reorderType="testimonials"
      defaults={{ clientName: '', clientPhoto: '', clientRole: '', company: '', review: '', rating: 5, position: 0 }}
      fields={[
        { key: 'clientName', label: 'Client Name' },
        { key: 'clientRole', label: 'Role' },
        { key: 'company', label: 'Company' },
        { key: 'clientPhoto', label: 'Photo', type: 'image' },
        { key: 'review', label: 'Review', type: 'textarea', rows: 4 },
        { key: 'rating', label: 'Rating (1-5)', type: 'number' },
      ]}
      summary={(item) => (
        <div>
          <p className="text-sm font-semibold text-white">{item.clientName}</p>
          <p className="text-xs text-zinc-500 line-clamp-1">{item.review}</p>
        </div>
      )}
    />
  );
}
