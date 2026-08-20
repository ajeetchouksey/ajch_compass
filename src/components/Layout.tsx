import { NavLink, useLocation, Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Compass, BookOpen, ExternalLink } from 'lucide-react';
import { Breadcrumb } from './ui';
import { getTrack } from '@/features/tracks/data/tracks';
import { getArticle } from '@/features/tracks/data/articles';

const NAV = [
  { to: '/tracks', label: 'Tracks', icon: BookOpen, end: false },
] as const;

const footerLinks = [
  { href: '/', label: 'Home', external: false },
  { href: '/tracks', label: 'Tracks', external: false },
  { href: 'https://aaryaai.dev', label: 'Aarya — My AI Learning Hub', external: true },
  { href: 'https://spark.aaryaai.dev', label: 'Spark (for kids)', external: true },
  { href: 'https://github.com/ajeetchouksey/ajch_compass', label: 'GitHub', external: true },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
    isActive ? 'bg-[var(--aarya-accent)]/15 text-[var(--aarya-accent-2)]' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]',
  ].join(' ');

// ── Auto breadcrumbs from the URL, same pattern as ajch_platform's Layout.tsx ──
function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const [first, second, third] = segments;

  if (first === 'tracks' && second && third) {
    const track = getTrack(second);
    const article = getArticle(third);
    return (
      <Breadcrumb
        items={[
          { label: 'Tracks', to: '/tracks' },
          ...(track ? [{ label: track.label, to: `/tracks/${track.id}` }] : []),
          { label: article?.title ?? third.replace(/-/g, ' ') },
        ]}
      />
    );
  }
  if (first === 'tracks' && second) {
    const track = getTrack(second);
    return (
      <Breadcrumb items={[{ label: 'Tracks', to: '/tracks' }, { label: track?.label ?? second }]} />
    );
  }
  if (first === 'tracks') {
    return <Breadcrumb items={[{ label: 'Tracks' }]} />;
  }
  return null;
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800/60 sticky top-0 z-40 backdrop-blur-md bg-[#0e1a2d]/80">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <Compass size={18} className="text-[var(--aarya-accent)]" />
            <span className="font-black text-white tracking-tight">Compass</span>
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
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumbs />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-800/60">
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-500">Part of the Aarya family</span>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {footerLinks.map(({ href, label, external }) =>
              external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[var(--aarya-accent-2)] transition-colors"
                >
                  {label} <ExternalLink size={10} />
                </a>
              ) : (
                <Link
                  key={href}
                  to={href}
                  className="text-xs text-slate-500 hover:text-[var(--aarya-accent-2)] transition-colors"
                >
                  {label}
                </Link>
              ),
            )}
          </nav>
        </div>
      </footer>
    </div>
  );
}
