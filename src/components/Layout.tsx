import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Compass, BookOpen } from 'lucide-react';

const NAV = [
  { to: '/', label: 'Home', icon: Compass, end: true },
  { to: '/tracks', label: 'Tracks', icon: BookOpen, end: false },
] as const;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
    isActive ? 'bg-[var(--aarya-accent)]/15 text-[var(--aarya-accent-2)]' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]',
  ].join(' ');

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <Compass size={18} className="text-[var(--aarya-accent)]" />
            <span className="font-bold text-white">Compass</span>
          </NavLink>
          <nav className="flex items-center gap-1">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={navLinkClass}>
                <Icon size={14} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-800/60">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between text-xs text-slate-500">
          <span>Part of the Aarya family</span>
          <a
            href="https://aaryaai.dev"
            className="hover:text-[var(--aarya-accent-2)] transition-colors"
          >
            aaryaai.dev
          </a>
        </div>
      </footer>
    </div>
  );
}
