'use client';

import CrudPage from '@/components/admin/CrudPage';

export default function AdminCertificates() {
  return (
    <CrudPage
      title="Certificates"
      endpoint="/certificates"
      defaults={{ title: '', issuer: '', issueDate: '', credentialUrl: '', image: '' }}
      fields={[
        { key: 'title', label: 'Title' },
        { key: 'issuer', label: 'Issuer' },
        { key: 'issueDate', label: 'Issue Date' },
        { key: 'credentialUrl', label: 'Credential URL' },
        { key: 'image', label: 'Certificate Image', type: 'image' },
      ]}
      summary={(item) => (
        <div>
          <p className="text-sm font-semibold text-white">{item.title}</p>
          <p className="text-xs text-zinc-500">{item.issuer}</p>
        </div>
      )}
    />
  );
}
