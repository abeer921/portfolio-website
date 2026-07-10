'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Trash2, Upload, Loader2 } from 'lucide-react';
import { adminFetch, uploadFile } from '@/services/adminService';

type MediaItem = {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  alt?: string;
  createdAt: string;
};

export default function AdminMedia() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await adminFetch<MediaItem[]>('/media');
      setMedia(data);
    } catch {
      toast.error('Failed to load media library');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Only images are allowed');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File must be under 10MB');
      return;
    }
    setUploading(true);
    try {
      await uploadFile(file);
      toast.success('Uploaded');
      await load();
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this file from the library?')) return;
    try {
      await adminFetch(`/media/${id}`, { method: 'DELETE' });
      toast.success('Deleted');
      await load();
    } catch {
      toast.error('Delete failed');
    }
  };

  const copyUrl = (url: string) => {
    const full = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    void navigator.clipboard.writeText(full);
    toast.success('URL copied');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
        <h3 className="font-display font-bold text-white text-base">Media Library</h3>
        <label className="flex items-center gap-1.5 px-4 py-2 bg-[#8B5CF6] text-black text-xs font-bold uppercase rounded-full cursor-pointer">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          Upload Image
          <input type="file" accept="image/*" className="hidden" onChange={(e) => void handleUpload(e)} disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <div className="text-center py-16 text-zinc-500 animate-pulse text-xs uppercase">Loading media...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {media.map((item) => (
            <div key={item.id} className="rounded-xl border border-zinc-900 bg-zinc-950 overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt={item.alt || item.filename} className="h-40 w-full object-cover" />
              <div className="p-3 space-y-2">
                <p className="text-[10px] text-zinc-500 truncate">{item.filename}</p>
                <p className="text-[10px] text-zinc-600">{(item.size / 1024).toFixed(0)} KB</p>
                <div className="flex gap-2">
                  <button onClick={() => copyUrl(item.url)} className="flex-1 py-1.5 rounded-lg bg-zinc-900 text-[10px] font-bold uppercase text-zinc-400 hover:text-white">Copy URL</button>
                  <button onClick={() => void handleDelete(item.id)} className="p-1.5 rounded-lg bg-zinc-900 text-rose-500 hover:bg-rose-500/10"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
