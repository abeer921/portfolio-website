'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';
import AdminDrawer from '@/components/admin/AdminDrawer';
import ReorderList from '@/components/admin/ReorderList';
import ImageUpload from '@/components/admin/ImageUpload';
import { useAdminCrud } from '@/hooks/useAdminCrud';

type Field = {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'number' | 'checkbox' | 'array' | 'image';
  rows?: number;
  placeholder?: string;
};

type Props<T extends { id: string }> = {
  title: string;
  endpoint: string;
  reorderType?: string;
  fields: Field[];
  defaults: Omit<T, 'id'>;
  summary?: (item: T) => React.ReactNode;
};

export default function CrudPage<T extends { id: string; [key: string]: any }>({
  title,
  endpoint,
  reorderType,
  fields,
  defaults,
  summary,
}: Props<T>) {
  const { items, loading, save, remove, reorder } = useAdminCrud<T>(endpoint, reorderType);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Partial<T>>(defaults as Partial<T>);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setCurrent(defaults as Partial<T>);
    setOpen(true);
  };

  const openEdit = (item: T) => {
    setCurrent({ ...item });
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await save(current);
      setOpen(false);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    try {
      await remove(id);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Delete failed');
    }
  };

  const updateField = (key: string, value: unknown) => {
    setCurrent((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
        <h3 className="font-display font-bold text-white text-base">{title}</h3>
        <button
          onClick={openNew}
          className="px-4 py-2 bg-[#8B5CF6] text-black text-xs font-bold uppercase rounded-full flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-zinc-500 animate-pulse text-xs uppercase">Loading...</div>
      ) : reorderType ? (
        <ReorderList
          items={items}
          onReorder={(ordered) => void reorder(ordered)}
          renderItem={(item) => (
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">{summary ? summary(item) : <p className="text-sm text-white truncate">{(item as Record<string, unknown>).title as string || (item as Record<string, unknown>).name as string || item.id}</p>}</div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(item)} className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-[#8B5CF6]"><Edit2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          )}
        />
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-zinc-900 bg-zinc-950 p-4">
              <div>{summary ? summary(item) : <p className="text-sm text-white">{(item as Record<string, unknown>).title as string || item.id}</p>}</div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(item)} className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-[#8B5CF6]"><Edit2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminDrawer
        open={open}
        onClose={() => setOpen(false)}
        title={current.id ? `Edit ${title}` : `New ${title}`}
        footer={
          <div className="flex justify-end gap-3">
            <button onClick={() => setOpen(false)} className="px-5 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 text-[10px] font-bold uppercase">Cancel</button>
            <button onClick={() => void handleSave()} disabled={saving} className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] text-black text-[10px] font-bold uppercase flex items-center gap-1.5 disabled:opacity-50">
              <Save className="w-3.5 h-3.5" /> {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          {fields.map((field) => {
            const val = current[field.key];
            if (field.type === 'image') {
              return (
                <ImageUpload
                  key={field.key}
                  label={field.label}
                  value={(val as string) || ''}
                  onChange={(url) => updateField(field.key, url)}
                />
              );
            }
            if (field.type === 'textarea') {
              return (
                <div key={field.key}>
                  <label className="block text-zinc-500 font-semibold mb-2 uppercase">{field.label}</label>
                  <textarea
                    rows={field.rows || 3}
                    value={(val as string) || ''}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] resize-none"
                  />
                </div>
              );
            }
            if (field.type === 'checkbox') {
              return (
                <label key={field.key} className="flex items-center gap-2 text-white font-semibold uppercase">
                  <input type="checkbox" checked={!!val} onChange={(e) => updateField(field.key, e.target.checked)} className="w-4 h-4" />
                  {field.label}
                </label>
              );
            }
            if (field.type === 'array') {
              return (
                <div key={field.key}>
                  <label className="block text-zinc-500 font-semibold mb-2 uppercase">{field.label}</label>
                  <textarea
                    rows={field.rows || 4}
                    value={Array.isArray(val) ? val.join('\n') : ''}
                    onChange={(e) => updateField(field.key, e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
                    placeholder={field.placeholder || 'One item per line'}
                    className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6] resize-none"
                  />
                </div>
              );
            }
            if (field.type === 'number') {
              return (
                <div key={field.key}>
                  <label className="block text-zinc-500 font-semibold mb-2 uppercase">{field.label}</label>
                  <input
                    type="number"
                    value={val !== undefined ? Number(val) : ''}
                    onChange={(e) => updateField(field.key, Number(e.target.value))}
                    className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              );
            }
            return (
              <div key={field.key}>
                <label className="block text-zinc-500 font-semibold mb-2 uppercase">{field.label}</label>
                <input
                  type="text"
                  value={(val as string) || ''}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full bg-zinc-900/50 border border-zinc-850 text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#8B5CF6]"
                />
              </div>
            );
          })}
        </div>
      </AdminDrawer>
    </div>
  );
}
