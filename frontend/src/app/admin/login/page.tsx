'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { ObermannLogo } from '@/components/ui/ObermannMark';
import { API_BASE_URL } from '@/services/apiService';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please input email and password');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));

      toast.success('Welcome back');
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid admin credentials';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-shell relative flex min-h-screen items-center justify-center px-6">
      <div className="glow-spot pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 opacity-30" />
      <div className="dot-bg pointer-events-none absolute inset-0 z-0 opacity-20" />

      <div className="admin-card relative z-10 w-full max-w-md p-8 sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white shadow-[0_10px_30px_rgba(139,92,246,0.35)]">
            <ObermannLogo size={20} />
          </div>
          <p className="admin-eyebrow mb-2">Content Studio</p>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-white">Sign in</h1>
          <p className="mt-2 text-sm text-[#9B99A8]">Manage your portfolio content</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="admin-eyebrow mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B99A8]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abeernisar11@gmail.com"
                className="admin-input pl-11"
                required
              />
            </div>
          </div>

          <div>
            <label className="admin-eyebrow mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B99A8]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="admin-input pl-11"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="admin-btn-primary w-full justify-center py-3.5 disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Enter Studio'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
