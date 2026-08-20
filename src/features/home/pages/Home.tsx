import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { GlassCard, Badge } from '@/components/ui';
import { TRACKS } from '@/features/tracks/data/tracks';
import { getArticlesForTrack } from '@/features/tracks/data/articles';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="page-eyebrow justify-center">Aarya family</p>
        <h1 className="text-4xl font-bold mb-3">
          <span className="heading-gradient">Compass</span>
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          Practical AI, for people with a job to do — not a computer science
          degree. No jargon, no prerequisites, no exam pressure.
        </p>
      </div>

      <div className="space-y-4 mb-4">
        {TRACKS.map((track) => {
          const Icon = track.icon;
          const count = getArticlesForTrack(track.id).length;
          return (
            <Link key={track.id} to={`/tracks/${track.id}`} className="block">
              <GlassCard accent={track.accent} className="p-5 hover:-translate-y-0.5 transition-transform" rounded="2xl">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-white/5">
                    <Icon size={20} className="text-slate-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge label={track.audience} variant={track.badgeVariant} size="xs" />
                      <span className="text-[11px] text-slate-500">{count} articles</span>
                    </div>
                    <h2 className="text-base font-bold text-white">{track.label}</h2>
                  </div>
                  <ArrowRight size={16} className="text-slate-500 shrink-0" />
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>

      <GlassCard className="p-6" rounded="2xl" border="border-slate-700/30">
        <div className="flex items-start gap-3">
          <Sparkles size={20} className="text-slate-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-slate-300 mb-1">
              Looking for AI lessons for a kid, not a professional?
            </p>
            <p className="text-xs text-slate-500 mb-3">
              Spark teaches AI safety and basics to kids — safe, simple,
              reviewed content. Same Aarya family, different audience.
            </p>
            <a
              href="https://spark.aaryaai.dev"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white"
            >
              Visit Spark <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </GlassCard>

      <div className="text-center mt-8">
        <Link
          to="/tracks"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--aarya-accent)] hover:opacity-80"
        >
          <Compass size={14} /> See all tracks <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
