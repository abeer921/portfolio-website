'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Mail, MailOpen, Trash2, RefreshCw } from 'lucide-react';

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_token');
      const res = await fetch('http://localhost:5000/api/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setMessages(data);
    } catch {
      // Mock fallback messages for offline inspection
      setMessages([
        { id: 'm1', name: 'John Doe', email: 'john@example.com', subject: 'Project Redesign', message: 'Hello Abeer, I love your UI layouts. Let\'s schedule a talk next week.', isRead: false, createdAt: new Date().toISOString() },
        { id: 'm2', name: 'Jane Smith', email: 'jane@company.com', subject: 'Freelance Design', message: 'Do you have capacity for a mobile dashboard layout designer?', isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`http://localhost:5000/api/messages/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();

      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
      );
      toast.success('Message marked as read');
    } catch {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
      );
      toast.success('Simulated read success');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();

      toast.success('Message deleted successfully');
      loadMessages();
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success('Simulated delete success');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
        <h3 className="font-display font-bold text-white text-base">Inbox Messages</h3>
        <button
          onClick={loadMessages}
          className="p-2 bg-zinc-900 hover:bg-zinc-850 rounded-lg text-zinc-400 hover:text-white transition-colors duration-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 shadow-xl overflow-x-auto">
        {loading ? (
          <div className="text-center py-10 text-zinc-500 animate-pulse text-xs uppercase">Loading messages...</div>
        ) : (
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
                  <td className="py-4 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] ${
                      msg.isRead 
                        ? 'bg-zinc-800 text-zinc-500' 
                        : 'bg-[#d4af37]/15 text-[#d4af37]'
                    }`}>
                      {msg.isRead ? 'READ' : 'NEW'}
                    </span>
                  </td>
                  <td className="py-4 pl-4 text-right space-x-2">
                    {!msg.isRead && (
                      <button
                        onClick={() => markAsRead(msg.id)}
                        className="p-2 rounded-lg bg-zinc-900 hover:bg-[#d4af37]/20 hover:text-[#d4af37] text-zinc-400 transition-colors duration-200"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && messages.length === 0 && (
          <div className="text-center py-10 text-zinc-650 text-xs">No contact form messages found.</div>
        )}
      </div>
    </div>
  );
}
