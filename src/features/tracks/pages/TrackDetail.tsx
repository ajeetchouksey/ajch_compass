import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Users, Clock, BarChart2, ArrowRight, BookOpen } from 'lucide-react';
import { getTrack } from '../data/tracks';
import { getArticlesForTrack, type Article } from '../data/articles';
import type { Track } from '../data/tracks';

const DIFFICULTY_STYLE = {
  beginner:     { label: 'Beginner',     color: '#10b981', bg: 'rgba(16,185,129,0.10)',  border: 'rgba(16,185,129,0.25)'  },
  intermediate: { label: 'Intermediate', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.25)' },
  advanced:     { label: 'Advanced',     color: '#f43f5e', bg: 'rgba(244,63,94,0.10)',  border: 'rgba(244,63,94,0.25)'  },
};

// Faithful port of ajch_platform's former PathwayTrack.tsx — same
// intersection-observer reveal + hover-glow ArticleCard pattern.
function ArticleCard({ article, track, idx }: { article: Article; track: Track; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const diff = DIFFICULTY_STYLE[article.difficulty];

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: '50px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ background: 'rgba(8,15,30,0.97)', border: '1px solid rgba(71,85,105,0.20)', transitionDelay: `${Math.min(idx, 8) * 80}ms` }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.border = `1px solid ${track.border}`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 56px -16px ${track.color}22`;
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.border = '1px solid rgba(71,85,105,0.20)';
        (e.currentTarget as HTMLElement).style.boxShadow = '';
        (e.currentTarget as HTMLElement).style.transform = '';
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${track.color}, transparent 70%)` }} />
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${track.color}18 0%, transparent 70%)` }} />

      <div className="relative p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-lg"
            style={{ color: diff.color, background: diff.bg, border: `1px solid ${diff.border}` }}>
            {diff.label}
          </span>
          {!article.content && (
            <span className="text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-lg text-slate-500 bg-slate-800/60 border border-slate-700/40">
              Coming soon
            </span>
          )}
          <span className="text-[10px] text-slate-600 ml-auto">
            {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <h3 className="text-lg font-black text-white leading-snug mb-2" style={{ letterSpacing: '-0.01em' }}>
          {article.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-2">{article.excerpt}</p>

        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-5 text-[12px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <Clock size={11} style={{ color: track.color }} />
            <span className="text-white font-bold">{article.readingTime}</span> min read
          </span>
          <span className="flex items-center gap-1.5">
            <BarChart2 size={11} style={{ color: track.color }} />
            <span className="text-white font-bold capitalize">{article.difficulty}</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {article.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'rgba(15,23,42,0.8)', color: '#64748b', border: '1px solid rgba(71,85,105,0.18)' }}>
              #{tag}
            </span>
          ))}
        </div>

        <Link
          to={`/tracks/${track.id}/${article.slug}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: `linear-gradient(135deg, ${track.color}, ${track.color}cc)`, border: `1px solid ${track.border}`, boxShadow: `0 4px 16px -4px ${track.color}30` }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px -6px ${track.color}50`)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px -4px ${track.color}30`)}
        >
          <BookOpen size={13} /> Read article <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export default function TrackDetail() {
  const { trackId } = useParams<{ trackId: string }>();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  const track = getTrack(trackId);
  if (!track) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center text-slate-400">
        Track not found. <Link to="/tracks" className="text-[var(--aarya-accent)] underline">Back to all tracks</Link>
      </div>
    );
  }

  const Icon = track.icon;
  const articles = getArticlesForTrack(track.id);

  return (
    <div className="space-y-10 max-w-4xl mx-auto px-4 py-10">

      <section className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(15,23,42,0.95)', border: `1px solid ${track.border}` }}>
          <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${track.color}, transparent)` }} />
          <div className="p-6 flex flex-col sm:flex-row items-start gap-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: track.bg, border: `2px solid ${track.color}`, boxShadow: `0 0 24px -8px ${track.color}50` }}>
              <Icon size={22} style={{ color: track.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                  style={{ color: track.color, background: track.bg, border: `1px solid ${track.border}` }}>
                  <Users size={8} /> {track.audience}
                </span>
                <span className="text-[10px] text-slate-600">{articles.length} articles</span>
              </div>
              <h1 className="text-2xl font-black text-white mb-2">{track.label}</h1>
              <p className="text-sm text-slate-400 leading-relaxed">{track.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '80ms' }}>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">
          {articles.length} article{articles.length !== 1 ? 's' : ''}
        </p>
        <div className="space-y-4">
          {articles.map((article, idx) => (
            <ArticleCard key={article.slug} article={article} track={track} idx={idx} />
          ))}
        </div>
      </section>

      <section className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
        <div className="rounded-2xl p-5 flex items-center justify-between gap-4" style={{ background: 'rgba(15,23,42,0.60)', border: '1px solid rgba(71,85,105,0.18)' }}>
          <p className="text-sm text-slate-400">Want to explore a different track?</p>
          <Link
            to="/tracks"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black transition-all hover:-translate-y-0.5"
            style={{ color: track.color, background: track.bg, border: `1px solid ${track.border}` }}
          >
            All Tracks <ArrowRight size={13} />
          </Link>
        </div>
      </section>

    </div>
  );
}
