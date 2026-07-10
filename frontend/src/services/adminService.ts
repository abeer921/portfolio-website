import { API_BASE_URL } from './apiService';

export function getAdminToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

export function adminHeaders(json = true): HeadersInit {
  const headers: HeadersInit = {
    Authorization: `Bearer ${getAdminToken()}`,
  };
  if (json) headers['Content-Type'] = 'application/json';
  return headers;
}

export async function adminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...adminHeaders(!(options.body instanceof FormData)),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed: ${res.status}`);
  }

  return res.json();
}

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getAdminToken()}` },
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.url as string;
}

export async function reorderItems(type: string, items: { id: string; position: number }[]) {
  return adminFetch('/reorder', {
    method: 'PUT',
    body: JSON.stringify({ type, items }),
  });
}
