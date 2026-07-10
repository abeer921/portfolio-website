'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { adminFetch, reorderItems } from '@/services/adminService';

export function useAdminCrud<T extends { id: string; [key: string]: any }>(endpoint: string, reorderType?: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminFetch<T[]>(endpoint);
      setItems(data);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    void load();
  }, [load]);

  const save = async (item: Partial<T> & { id?: string }) => {
    const method = item.id ? 'PUT' : 'POST';
    const path = item.id ? `${endpoint}/${item.id}` : endpoint;
    await adminFetch(path, { method, body: JSON.stringify(item) });
    toast.success(item.id ? 'Updated' : 'Created');
    await load();
  };

  const remove = async (id: string) => {
    await adminFetch(`${endpoint}/${id}`, { method: 'DELETE' });
    toast.success('Deleted');
    await load();
  };

  const reorder = async (ordered: T[]) => {
    if (!reorderType) return;
    setItems(ordered);
    await reorderItems(
      reorderType,
      ordered.map((item, index) => ({ id: item.id, position: index }))
    );
    toast.success('Order saved');
  };

  return { items, loading, load, save, remove, reorder, setItems };
}
