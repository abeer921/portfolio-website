'use client';

import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function AdminDrawer({ open, onClose, title, children, footer }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-[#09090b] border-l border-zinc-900 h-screen overflow-y-auto p-6 sm:p-8 shadow-2xl flex flex-col">
        <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-6">
          <h4 className="font-display font-bold text-white text-base">{title}</h4>
          <button onClick={onClose} className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1">{children}</div>
        {footer && <div className="border-t border-zinc-900 pt-6 mt-6">{footer}</div>}
      </div>
    </div>
  );
}
