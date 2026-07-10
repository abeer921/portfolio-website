'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Briefcase,
  BookOpen,
  LogOut,
  FileText,
  Image as ImageIcon,
  Layers,
  MessageSquare,
  Wrench,
  GraduationCap,
  Award,
  ExternalLink,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { ObermannLogo } from '@/components/ui/ObermannMark';

const sidebarItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Page Content', path: '/admin/home-content', icon: FileText },
  { name: 'Projects', path: '/admin/projects', icon: Briefcase },
  { name: 'Services', path: '/admin/services', icon: Wrench },
  { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
  { name: 'Experience', path: '/admin/experiences', icon: Layers },
  { name: 'Education', path: '/admin/education', icon: GraduationCap },
  { name: 'Certificates', path: '/admin/certificates', icon: Award },
  { name: 'Skills', path: '/admin/skills', icon: Sparkles },
  { name: 'Media Library', path: '/admin/media', icon: ImageIcon },
  { name: 'Blogs', path: '/admin/blogs', icon: BookOpen },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';
  const activeItem = sidebarItems.find((item) => pathname === item.path);

  useEffect(() => {
    const checkAuth = () => {
      if (isLoginPage) {
        setAuthorized(true);
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('admin_token');
      if (!token) {
        setAuthorized(false);
        router.push('/admin/login');
      } else {
        setAuthorized(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [pathname, isLoginPage, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="admin-shell flex min-h-screen items-center justify-center">
        <span className="admin-eyebrow animate-pulse">Verifying session…</span>
      </div>
    );
  }

  if (!authorized) return null;

  if (isLoginPage) {
    return <>{children}</>;
  }

  const SidebarContent = () => (
    <>
      <div className="mb-8 border-b border-[rgba(255,255,255,0.08)] pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white shadow-[0_10px_30px_rgba(139,92,246,0.35)]">
            <ObermannLogo size={16} />
          </div>
          <div>
            <span className="block font-display text-sm font-semibold text-white">Abeer Nisar</span>
            <span className="admin-eyebrow">Content Studio</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`admin-nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 space-y-2 border-t border-[rgba(255,255,255,0.08)] pt-6">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn-ghost w-full justify-center"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Preview Site
        </a>
        <button
          onClick={handleLogout}
          className="admin-nav-link w-full text-[#EC4899] hover:bg-[rgba(236,72,153,0.08)] hover:text-[#EC4899]"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="admin-shell relative flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="admin-sidebar fixed inset-y-0 left-0 z-30 hidden w-64 flex-col p-6 lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
          <aside className="admin-sidebar absolute inset-y-0 left-0 flex w-72 flex-col p-6 shadow-2xl">
            <div className="mb-4 flex justify-end">
              <button type="button" onClick={() => setMobileOpen(false)} className="text-[#9B99A8] hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="relative z-10 flex w-full flex-col lg:pl-64">
        {/* Minimal mobile bar — not a full header */}
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-4 py-4 lg:hidden">
          <button type="button" onClick={() => setMobileOpen(true)} className="text-white">
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-display text-sm font-semibold text-white">
            {activeItem?.name || 'Admin'}
          </span>
          <div className="w-5" />
        </div>

        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 lg:p-10">
          <div className="mb-8 hidden lg:block">
            <p className="admin-eyebrow mb-1">CMS</p>
            <h1 className="admin-page-title">{activeItem?.name || 'Dashboard'}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
