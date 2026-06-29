'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Briefcase, 
  BookOpen, 
  Settings, 
  Mail, 
  Award, 
  Layers, 
  LogOut,
  User,
  Sliders,
  ChevronRight
} from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Projects', path: '/admin/projects', icon: Briefcase },
  { name: 'Blogs', path: '/admin/blogs', icon: BookOpen },
  { name: 'Messages', path: '/admin/messages', icon: Mail },
  { name: 'Core Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

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

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <span className="text-zinc-500 font-mono text-xs animate-pulse">VERIFYING SESSION STATE...</span>
      </div>
    );
  }

  if (!authorized) return null;

  // Render clean for Login Page
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#060608] flex text-zinc-300">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-zinc-900 bg-[#09090b] flex flex-col justify-between p-6 fixed top-0 bottom-0 left-0 z-30">
        <div>
          <div className="flex items-center gap-2 mb-10 pb-4 border-b border-zinc-900">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37] flex items-center justify-center text-black font-display font-black text-sm">
              AN
            </div>
            <div>
              <span className="text-white text-sm font-semibold block">Abeer Nisar</span>
              <span className="text-zinc-500 text-[10px] uppercase tracking-wider block">CMS Panel</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#d4af37] text-black font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    {item.name}
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          Logout Session
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="pl-64 w-full flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 border-b border-zinc-900 bg-[#09090b]/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            {pathname?.split('/').pop()} Panel
          </h2>
          <div className="flex items-center gap-3 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-zinc-500">Connected to Database (Neon)</span>
          </div>
        </header>

        {/* Dynamic Inner Page Content */}
        <main className="p-8 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
