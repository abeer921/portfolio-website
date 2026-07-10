'use client';

import { GripVertical, ChevronUp, ChevronDown } from 'lucide-react';

type Item = { id: string; [key: string]: unknown };

type Props<T extends Item> = {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
};

export default function ReorderList<T extends Item>({ items, onReorder, renderItem, className = '' }: Props<T>) {
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [removed] = next.splice(from, 1);
    next.splice(to, 0, removed);
    onReorder(next);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', String(index));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    const fromIndex = Number(e.dataTransfer.getData('text/plain'));
    if (Number.isNaN(fromIndex) || fromIndex === toIndex) return;
    move(fromIndex, toIndex);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, index)}
          className="flex items-center gap-2 rounded-xl border border-zinc-900 bg-zinc-950 p-3"
        >
          <div className="flex flex-col gap-0.5 text-zinc-600">
            <button type="button" onClick={() => move(index, index - 1)} className="hover:text-white">
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
            <GripVertical className="h-4 w-4 cursor-grab" />
            <button type="button" onClick={() => move(index, index + 1)} className="hover:text-white">
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex-1 min-w-0">{renderItem(item, index)}</div>
        </div>
      ))}
    </div>
  );
}
