'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { MailOpen, Trash2, RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '@/services/apiService';

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API_BASE_URL}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401 || res.status === 403) {
        throw new Error('Please log in again to view inbox messages');
      }

      if (!res.ok) throw new Error('Could not load inbox messages');

      const data = await res.json();
      setMessages(data);
    } catch (error: unknown) {
      setMessages([]);
      toast.error(error instanceof Error ? error.message : 'Could not load inbox messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadMessages();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API_BASE_URL}/messages/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();

      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
      );
      toast.success('Message marked as read');
    } catch {
      toast.error('Could not mark message as read');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${API_BASE_URL}/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();

      toast.success('Message deleted successfully');
      loadMessages();
    } catch {
      toast.error('Could not delete message');
    }
  };

  const unreadCount = messages.filter((msg) => !msg.isRead).length;

  const renderStatus = (isRead: boolean) => (
    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] ${
      isRead
        ? 'bg-zinc-800 text-zinc-500'
        : 'bg-[#8B5CF6]/15 text-[#8B5CF6]'
    }`}>
      {isRead ? 'READ' : 'NEW'}
    </span>
  );

  const renderActions = (msg: ContactMessage) => (
    <div className="flex items-center justify-end gap-2">
      {!msg.isRead && (
        <button
          onClick={() => markAsRead(msg.id)}
          className="p-2 rounded-lg bg-zinc-900 hover:bg-[#8B5CF6]/20 hover:text-[#8B5CF6] text-zinc-400 transition-colors duration-200"
          title="Mark Read"
        >
          <MailOpen className="w-3.5 h-3.5" />
        </button>
      )}
      <button
        onClick={() => handleDelete(msg.id)}
        className="p-2 rounded-lg bg-zinc-900 hover:bg-rose-500/20 hover:text-rose-500 text-zinc-400 transition-colors duration-200"
        title="Delete Message"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-zinc-900 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display font-bold text-white text-base">Inbox Messages</h3>
          <p className="mt-1 text-xs text-zinc-500">{unreadCount} unread contact {unreadCount === 1 ? 'message' : 'messages'}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            {messages.length} total
          </span>
          <button
            onClick={loadMessages}
            className="p-2 bg-zinc-900 hover:bg-zinc-850 rounded-lg text-zinc-400 hover:text-white transition-colors duration-200"
            title="Refresh messages"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-zinc-950 border border-zinc-900 shadow-xl">
        {loading ? (
          <div className="text-center py-10 text-zinc-500 animate-pulse text-xs uppercase">Loading messages...</div>
        ) : (
          <>
            <div className="hidden overflow-x-auto p-6 md:block">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-900 text-zinc-500 uppercase tracking-wider">
                    <th className="pb-3 pr-4 font-semibold">Sender</th>
                    <th className="pb-3 px-4 font-semibold">Email</th>
                    <th className="pb-3 px-4 font-semibold">Subject</th>
                    <th className="pb-3 px-4 font-semibold">Content</th>
                    <th className="pb-3 px-4 font-semibold">Status</th>
                    <th className="pb-3 pl-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  {messages.map((msg) => (
                    <tr key={msg.id} className="group hover:bg-zinc-900/10 transition-colors duration-150">
                      <td className="py-4 pr-4 font-semibold text-white">{msg.name}</td>
                      <td className="py-4 px-4 text-zinc-500 font-mono">{msg.email}</td>
                      <td className="py-4 px-4 font-semibold text-zinc-300">{msg.subject || 'No Subject'}</td>
                      <td className="py-4 px-4 text-zinc-400 max-w-xs truncate">{msg.message}</td>
                      <td className="py-4 px-4">{renderStatus(msg.isRead)}</td>
                      <td className="py-4 pl-4">{renderActions(msg)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-zinc-900 md:hidden">
              {messages.map((msg) => (
                <article key={msg.id} className="p-4">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-semibold text-white">{msg.name}</h4>
                      <a href={`mailto:${msg.email}`} className="break-all font-mono text-xs text-zinc-500">
                        {msg.email}
                      </a>
                    </div>
                    {renderStatus(msg.isRead)}
                  </div>

                  <p className="mb-2 text-xs font-bold text-zinc-300">{msg.subject || 'No Subject'}</p>
                  <p className="mb-4 whitespace-pre-wrap break-words text-xs leading-relaxed text-zinc-400">{msg.message}</p>

                  <div className="flex items-center justify-between gap-3 border-t border-zinc-900/80 pt-3">
                    <span className="text-[10px] font-mono uppercase text-zinc-600">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                    {renderActions(msg)}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {!loading && messages.length === 0 && (
          <div className="text-center py-10 text-zinc-600 text-xs">No contact form messages found.</div>
        )}
      </div>
    </div>
  );
}
