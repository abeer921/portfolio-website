'use client';

import CrudPage from '@/components/admin/CrudPage';

export default function AdminServices() {
  return (
    <CrudPage
      title="Services"
      endpoint="/services"
      reorderType="services"
      defaults={{ title: '', description: '', num: '', previewImage: '', items: [], price: '', icon: '', position: 0 }}
      fields={[
        { key: 'num', label: 'Number (e.g. 1)' },
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
        { key: 'previewImage', label: 'Hover Preview Image', type: 'image' },
        { key: 'items', label: 'Bullet Items', type: 'array', placeholder: 'One service item per line' },
        { key: 'price', label: 'Price Label (optional)' },
      ]}
      summary={(item) => (
        <div>
          <p className="text-sm font-semibold text-white"><span className="text-[#8B5CF6]">{item.num}.</span> {item.title}</p>
          <p className="text-xs text-zinc-500 line-clamp-1">{item.description}</p>
        </div>
      )}
    />
  );
}
