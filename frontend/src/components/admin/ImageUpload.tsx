'use client';

import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadFile } from '@/services/adminService';

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

type Props = {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
};

export default function ImageUpload({ value, onChange, label = 'Image', className = '' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (!ALLOWED.includes(file.type)) {
      toast.error('Only JPEG, PNG, GIF, WebP, or SVG images are allowed');
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error('Image must be under 10MB');
      return;
    }

    setUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
      toast.success('Image uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      <label className="block text-zinc-500 font-semibold mb-2 uppercase text-[10px]">{label}</label>
      <div className="flex flex-col gap-3">
        {value && (
          <div className="relative w-full max-w-xs overflow-hidden rounded-xl border border-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="h-32 w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white hover:bg-black"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/uploads/... or https://..."
            className="flex-1 bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] text-xs"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3 py-2 text-[10px] font-bold uppercase text-zinc-300 hover:bg-zinc-800 disabled:opacity-50"
          >
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            Upload
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
            e.target.value = '';
          }}
        />
      </div>
    </div>
  );
}
