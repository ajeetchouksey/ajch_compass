import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Clock, Users, Tag, List, X } from 'lucide-react';
import { getTrack } from '../data/tracks';
import { getArticle } from '../data/articles';

const DIFFICULTY_STYLE = {
  beginner:     { label: 'Beginner',     color: '#10b981', bg: 'rgba(16,185,129,0.10)',  border: 'rgba(16,185,129,0.25)'  },
  intermediate: { label: 'Intermediate', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.25)' },
  advanced:     { label: 'Advanced',     color: '#f43f5e', bg: 'rgba(244,63,94,0.10)',  border: 'rgba(244,63,94,0.25)'  },
};

const PLACEHOLDER = (title: string) => `
## Coming soon

This article isn't written yet. **${title}** will cover the topic with
clear, practical, no-jargon guidance once it's ready — browse the other
articles in this track in the meantime.
`.trim();

// Faithful port of ajch_platform's former PathwayArticle.tsx (reading bar,
// TOC sidebar, mobile TOC drawer, related articles). Deliberately excludes
// Mermaid diagram rendering (Compass doesn't carry that dependency — the
// two real articles' diagrams were rewritten as plain numbered lists during
// migration) and the platform's KeywordHighlight feature (not available
// outside ajch_platform).
function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}
interface Heading { id: string; text: string; level: number }
function extractHeadings(md: string): Heading[] {
  return md.split('\n')
    .filter((l) => /^#{1,3} /.test(l))
    .map((l) => ({
      level: l.match(/^(#+)/)?.[1].length ?? 1,
      text: l.replace(/^#+\s+/, '').trim(),
      id: slugify(l.replace(/^#+\s+/, '').trim()),
    }));
}

function ReadingBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const mainEl = document.querySelector('main') as HTMLElement | null;
    const fn = () => {
      const el = mainEl;
      if (!el) return;
      const h = el.scrollHeight - el.clientHeight;
      setPct(h > 0 ? Math.min((el.scrollTop / h) * 100, 100) : 0);
    };
    const target: HTMLElement | Window = mainEl ?? window;
    target.addEventListener('scroll', fn, { passive: true });
    return () => target.removeEventListener('scroll', fn);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px]">
      <div className="h-full transition-[width] duration-100"
        style={{ width: `${pct}%`, background: 'linear-gradient(90deg, var(--aarya-accent) 0%, var(--aarya-accent-2) 60%, #fb923c 100%)' }} />
    </div>
  );
}

function MobileToc({ headings, activeId, onClose }: { headings: Heading[]; activeId: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }} />
      <div
        className="absolute bottom-0 left-0 right-0 rounded-t-2xl p-5 max-h-[72vh] overflow-y-auto"
        style={{ background: 'rgba(15,23,42,0.99)', border: '1px solid rgba(71,85,105,0.30)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-black text-white flex items-center gap-2"><List size={14} />Contents</p>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><X size={16} /></button>
        </div>
        <nav className="space-y-1">
          {headings.map(({ id, text, level }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); onClose(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              className="block py-1.5 text-sm rounded-lg transition-all"
              style={{ paddingLeft: level === 3 ? '24px' : '8px', color: activeId === id ? 'var(--aarya-accent-2)' : '#94a3b8', fontWeight: activeId === id ? 700 : 400 }}
            >
              {text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default function TrackArticle() {
  const { trackId, slug } = useParams<{ trackId: string; slug: string }>();
  const [mounted, setMounted] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [activeId, setActiveId] = useState('');
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  const track = getTrack(trackId);
  const article = getArticle(slug);
  const diff = article ? DIFFICULTY_STYLE[article.difficulty] : DIFFICULTY_STYLE.beginner;
  const displayTitle = article?.title ?? (slug ?? '').split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const content = article?.content ?? PLACEHOLDER(displayTitle);
  const headings = useMemo(() => extractHeadings(content), [content]);

  useEffect(() => {
    if (!headings.length) return;
    const mainEl = document.querySelector('main') as HTMLElement | null;
    const THRESHOLD = 120;
    const fn = () => {
      const passed = headings
        .map(({ id }) => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top ?? Infinity }))
        .filter(({ top }) => top < THRESHOLD)
        .sort((a, b) => b.top - a.top);
      if (passed.length) setActiveId((prev) => (prev === passed[0].id ? prev : passed[0].id));
    };
    const target: HTMLElement | Window = mainEl ?? window;
    target.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => target.removeEventListener('scroll', fn);
  }, [headings]);

  if (!track) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center text-slate-400">
        Track not found. <Link to="/tracks" className="text-[var(--aarya-accent)] underline">Back to all tracks</Link>
      </div>
    );
  }

  const Icon = track.icon;

  return (
    <>
      <ReadingBar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex gap-8">

          <article ref={articleRef} className={`flex-1 min-w-0 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Link
                  to={`/tracks/${track.id}`}
                  className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full transition-opacity hover:opacity-80"
                  style={{ color: track.color, background: track.bg, border: `1px solid ${track.border}` }}
                >
                  <Icon size={8} /> {track.label}
                </Link>
                {article && (
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                    style={{ color: diff.color, background: diff.bg, border: `1px solid ${diff.border}` }}>
                    {diff.label}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{ color: '#64748b', background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(71,85,105,0.20)' }}>
                  <Users size={8} /> {track.audience}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-4">{displayTitle}</h1>

              {article && (
                <p className="text-base text-slate-400 leading-relaxed mb-5 max-w-2xl">{article.excerpt}</p>
              )}
              {article && (
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pb-5" style={{ borderBottom: '1px solid rgba(71,85,105,0.18)' }}>
                  <span className="flex items-center gap-1.5"><Clock size={11} /> {article.readingTime} min read</span>
                  <span className="flex items-center gap-1.5">
                    {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <button
                    onClick={() => setShowToc(true)}
                    className="lg:hidden flex items-center gap-1 ml-auto transition-colors hover:text-slate-300"
                  >
                    <List size={11} /> Contents
                  </button>
                </div>
              )}
            </header>

            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h2: ({ children }) => {
                    const id = slugify(String(children));
                    return <h2 id={id} className="text-xl font-black text-white mt-10 mb-4 scroll-mt-24">{children}</h2>;
                  },
                  h3: ({ children }) => {
                    const id = slugify(String(children));
                    return <h3 id={id} className="text-base font-black text-white mt-8 mb-3 scroll-mt-24">{children}</h3>;
                  },
                  p: ({ children }) => <p className="text-slate-300 leading-relaxed mb-4 text-[15px]">{children}</p>,
                  ul: ({ children }) => <ul className="space-y-2 mb-4 pl-4">{children}</ul>,
                  ol: ({ children }) => <ol className="space-y-2 mb-4 pl-4 list-decimal list-inside text-slate-300">{children}</ol>,
                  li: ({ children }) => (
                    <li className="text-slate-300 text-[15px] leading-relaxed flex gap-2">
                      <span style={{ color: track.color }} className="mt-1.5 shrink-0">▸</span>
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => <strong className="font-black text-white">{children}</strong>,
                  code: ({ children }) => (
                    <code className="text-xs font-mono px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(30,41,59,0.9)', color: track.color, border: '1px solid rgba(71,85,105,0.25)' }}>
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="rounded-xl p-4 sm:p-5 text-xs sm:text-sm overflow-x-auto leading-relaxed font-mono my-5"
                      style={{ background: 'rgba(2,6,23,0.98)', border: '1px solid rgba(71,85,105,0.28)', color: '#e2e8f0' }}>
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-5 pl-4 py-1 italic text-slate-400 text-[15px] leading-relaxed" style={{ borderLeft: `3px solid ${track.color}` }}>
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-5 rounded-xl" style={{ border: '1px solid rgba(71,85,105,0.25)' }}>
                      <table className="w-full text-sm text-slate-300">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => <thead style={{ background: 'rgba(15,23,42,0.98)', borderBottom: '1px solid rgba(71,85,105,0.25)' }}>{children}</thead>,
                  th: ({ children }) => <th className="px-4 py-2 text-left text-[11px] font-black uppercase tracking-wider text-slate-500">{children}</th>,
                  td: ({ children }) => <td className="px-4 py-2.5 text-slate-300 text-[13px]" style={{ borderTop: '1px solid rgba(71,85,105,0.15)' }}>{children}</td>,
                  a: ({ href, children }) => (
                    <a href={href} className="underline underline-offset-2 transition-colors" style={{ color: track.color }}
                      target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
                      {children}
                    </a>
                  ),
                  hr: () => <hr className="my-8" style={{ borderColor: 'rgba(71,85,105,0.20)' }} />,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </article>

          {/*━━━━ SIDEBAR (desktop only) */}
          <aside className="hidden lg:flex flex-col w-[200px] xl:w-[220px] shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] gap-3 overflow-y-auto pb-4" style={{ scrollbarWidth: 'none' }}>
            <div className="rounded-xl p-4" style={{ background: 'rgba(15,23,42,0.95)', border: `1px solid ${track.border}` }}>
              <div className="h-[2px] rounded-full mb-3" style={{ background: `linear-gradient(90deg,${track.color},transparent)` }} />
              <Link to={`/tracks/${track.id}`} className="flex items-center gap-2 mb-3 group">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: track.bg, border: `1px solid ${track.border}` }}>
                  <Icon size={13} style={{ color: track.color }} />
                </div>
                <span className="text-[11px] font-bold transition-colors group-hover:text-white" style={{ color: track.color }}>{track.label}</span>
              </Link>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500"><Users size={9} /> {track.audience}</div>
              {article && (
                <>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1.5"><Clock size={9} /> {article.readingTime} min read</div>
                  <span className="inline-block mt-2 text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                    style={{ color: diff.color, background: diff.bg, border: `1px solid ${diff.border}` }}>
                    {diff.label}
                  </span>
                </>
              )}
            </div>

            {headings.length > 0 && (
              <div className="rounded-xl p-4" style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(71,85,105,0.20)' }}>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-1.5"><List size={9} /> In this article</p>
                <nav className="space-y-0.5">
                  {headings.map(({ id, text, level }) => {
                    const isActive = activeId === id;
                    return (
                      <a
                        key={id}
                        href={`#${id}`}
                        onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                        className="block text-[11px] leading-snug py-1 rounded-r-lg transition-all duration-200"
                        style={{ paddingLeft: level === 3 ? '16px' : '6px', color: isActive ? track.color : '#64748b', fontWeight: isActive ? 700 : 400, borderLeft: `2px solid ${isActive ? track.color : 'transparent'}` }}
                      >
                        {text}
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}

            {article && article.tags.length > 0 && (
              <div className="rounded-xl p-4" style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(71,85,105,0.20)' }}>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5"><Tag size={9} /> Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-lg" style={{ background: 'rgba(30,41,59,0.8)', color: '#64748b', border: '1px solid rgba(71,85,105,0.20)' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {article && article.related && article.related.length > 0 && (
              <div className="rounded-xl p-4" style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(71,85,105,0.20)' }}>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Related</p>
                <div className="space-y-2">
                  {article.related.map((rel) => (
                    <Link key={rel.slug} to={`/tracks/${rel.track}/${rel.slug}`} className="block text-[11px] leading-snug text-slate-400 hover:text-white transition-colors py-1">
                      {rel.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {showToc && <MobileToc headings={headings} activeId={activeId} onClose={() => setShowToc(false)} />}
    </>
  );
}
