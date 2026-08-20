import { Link } from 'react-router-dom';
import { Users, BookOpen, ArrowRight } from 'lucide-react';
import { GlassCard, SectionHeader, Badge } from '@/components/ui';
import { TRACKS } from '../data/tracks';
import { getArticlesForTrack } from '../data/articles';

export default function TracksHome() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <SectionHeader
          title="Tracks"
          badge={`${TRACKS.length} tracks`}
          badgeVariant="blue"
          className="items-center [&>div]:justify-center text-center"
        />
        <p className="text-slate-400 max-w-md mx-auto">
          Practical AI skills for non-technical professionals — no jargon, no
          prerequisites, no exam pressure. Pick the track built for you.
        </p>
      </div>

      <div className="space-y-4">
        {TRACKS.map((track) => {
          const Icon = track.icon;
          const articleCount = getArticlesForTrack(track.id).length;
          return (
            <GlassCard key={track.id} accent={track.accent} className="p-5" rounded="2xl">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-white/5">
                  <Icon size={20} className="text-slate-200" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge label={track.audience} variant={track.badgeVariant} icon={Users} />
                    <span className="text-[11px] text-slate-500">{articleCount} articles</span>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-1">{track.label}</h2>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">{track.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {track.topics.map((t) => (
                      <Badge key={t} label={t} variant="slate" size="xs" />
                    ))}
                  </div>
                  <Link
                    to={`/tracks/${track.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white"
                  >
                    <BookOpen size={14} /> Browse {articleCount} articles <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
