import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, BookOpen, ArrowRight, Sparkles, Target, Zap as ZapIcon, ExternalLink,
} from 'lucide-react';
import { PulsingDot } from '@/components/ui';
import { TRACKS } from '@/features/tracks/data/tracks';
import { getArticlesForTrack } from '@/features/tracks/data/articles';

// Faithful port of ajch_platform's former Pathways.tsx (Discovery) page —
// same hero/what-is/track-card/cross-link structure, re-themed to
// Compass's blue/sky site accent, track cards keep their own per-track
// color (matches the original — tracks were never mono-colored to the
// site accent). See docs/design-sync.md.
export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  return (
    <div className="space-y-16 max-w-4xl mx-auto px-4 py-10">

      {/*━━━━ HERO */}
      <section className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="flex items-center gap-2 mb-4">
          <PulsingDot active color="bg-[var(--aarya-accent-2)]" size="sm" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--aarya-accent-2)' }}>
            Compass
          </span>
        </div>
        <h1 className="text-4xl font-black text-white leading-tight mb-3">
          Practical AI for{' '}
          <span className="heading-gradient">people with a job to do.</span>
        </h1>
        <p className="text-base text-slate-400 max-w-2xl leading-relaxed mb-6">
          Compass is <strong className="text-slate-300">not a computer science course</strong> — it's
          audience-focused tracks for professionals who want clear, practical AI knowledge without
          prerequisites. Whether you're in finance, policy, or just trying to save a few hours a week —
          there's a track for you.
        </p>

        {/* Track quick-pick */}
        <div className="flex flex-wrap gap-2">
          <span className="text-[11px] text-slate-600 self-center mr-1 font-semibold">I am a →</span>
          {TRACKS.map((t) => (
            <Link
              key={t.id}
              to={`/tracks/${t.id}`}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full transition-all hover:-translate-y-0.5"
              style={{ color: t.color, background: `${t.color}12`, border: `1px solid ${t.color}38` }}
            >
              {t.audience} <ArrowRight size={10} />
            </Link>
          ))}
        </div>
      </section>

      {/*━━━━ WHAT IS COMPASS? */}
      <section className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        style={{ transitionDelay: '60ms' }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Target, label: 'Audience-first', desc: 'Each track is written for a specific reader — not a generic "learner".' },
            { icon: BookOpen, label: 'No prerequisites', desc: 'No code required. No exam pressure. Read at your own pace.' },
            { icon: ZapIcon, label: 'Practical & current', desc: 'Real examples, real tools, written for people who need results this week.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-2xl p-5"
                style={{ background: 'rgba(8,15,30,0.97)', border: '1px solid rgba(71,85,105,0.18)' }}>
                <Icon size={18} className="text-slate-400 mb-3" />
                <p className="text-sm font-black text-white mb-1">{item.label}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/*━━━━ TRACK CARDS */}
      <section className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        style={{ transitionDelay: '120ms' }}>
        <div className="mb-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1.5" style={{ color: '#64748b' }}>
            {TRACKS.length} Tracks
          </p>
          <h2 className="text-2xl font-black text-white">Pick the right track for you.</h2>
          <p className="text-sm text-slate-400 mt-1">
            Each track is a standalone collection of articles — start anywhere, finish any time.
          </p>
        </div>

        <div className="space-y-5">
          {TRACKS.map((track, idx) => {
            const Icon = track.icon;
            const articleCount = getArticlesForTrack(track.id).length;
            return (
              <div
                key={track.id}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${140 + idx * 80}ms`, background: 'rgba(8,15,30,0.97)', border: '1px solid rgba(71,85,105,0.20)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${track.border}`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px -16px ${track.color}22`;
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
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${track.color}18 0%, transparent 70%)` }} />

                <div className="relative p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ background: track.bg, border: `2px solid ${track.color}`, boxShadow: `0 0 20px -6px ${track.color}40` }}>
                        <Icon size={22} style={{ color: track.color }} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: '#475569' }}>For →</span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.12em] px-2.5 py-1 rounded-lg"
                          style={{ color: track.color, background: track.bg, border: `1px solid ${track.border}` }}>
                          <Users size={8} /> {track.audience}
                        </span>
                        <span className="text-[10px] text-slate-600">{articleCount} articles</span>
                      </div>

                      <h3 className="text-xl font-black text-white mb-1 tracking-tight">{track.label}</h3>
                      <p className="text-xs font-semibold mb-3" style={{ color: `${track.color}bb` }}>
                        {track.audienceFull}
                      </p>
                      <p className="text-sm text-slate-400 leading-relaxed mb-4">{track.description}</p>
                      <p className="text-[11px] text-slate-600 mb-4">
                        <span className="font-bold text-slate-500">What you get: </span>{track.what}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {track.topics.map((t) => (
                          <span key={t} className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                            style={{ background: 'rgba(15,23,42,0.8)', color: '#64748b', border: '1px solid rgba(71,85,105,0.18)' }}>
                            {t}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/tracks/${track.id}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${track.color}, ${track.color}cc)`, border: `1px solid ${track.border}`, boxShadow: `0 4px 16px -4px ${track.color}30` }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px -6px ${track.color}50`)}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px -4px ${track.color}30`)}
                      >
                        <BookOpen size={13} /> Browse {articleCount} articles <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/*━━━━ CROSS-LINK TO SPARK */}
      <section className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        style={{ transitionDelay: '480ms' }}>
        <div className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          style={{ background: 'rgba(29,78,216,0.06)', border: '1px solid rgba(56,189,248,0.18)' }}>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--aarya-accent-2)' }}>
              Got a kid, not a colleague?
            </p>
            <h3 className="text-base font-black text-white mb-1">This isn't your section — Spark is.</h3>
            <p className="text-sm text-slate-400">
              Safe, simple AI lessons for kids — reviewed content, no data collected.
              Compass is for working professionals; Spark is for children.
            </p>
          </div>
          <a
            href="https://spark.aaryaai.dev"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-black rounded-xl text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', border: '1px solid rgba(251,191,36,0.45)' }}
          >
            <Sparkles size={14} /> Visit Spark <ExternalLink size={14} />
          </a>
        </div>
      </section>

    </div>
  );
}
