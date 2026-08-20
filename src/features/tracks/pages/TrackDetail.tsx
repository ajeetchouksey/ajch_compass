import { Link, useParams } from 'react-router-dom';
import { Users, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { GlassCard, Badge, Breadcrumb } from '@/components/ui';
import { getTrack } from '../data/tracks';
import { getArticlesForTrack } from '../data/articles';

const DIFFICULTY_VARIANT = {
  beginner: 'emerald',
  intermediate: 'amber',
  advanced: 'rose',
} as const;

export default function TrackDetail() {
  const { trackId } = useParams<{ trackId: string }>();
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
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ label: 'Tracks', to: '/tracks' }, { label: track.label }]} />

      <GlassCard accent={track.accent} className="p-6 mb-8" rounded="2xl">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-white/5">
            <Icon size={22} className="text-slate-200" />
          </div>
          <div>
            <Badge label={track.audience} variant={track.badgeVariant} icon={Users} className="mb-2" />
            <h1 className="text-2xl font-bold text-white mb-1">{track.label}</h1>
            <p className="text-sm text-slate-400 leading-relaxed">{track.description}</p>
          </div>
        </div>
      </GlassCard>

      <div className="space-y-3">
        {articles.map((article) => (
          <GlassCard key={article.slug} className="p-4" rounded="xl">
            <div className="flex items-center gap-2 mb-2">
              <Badge label={article.difficulty} variant={DIFFICULTY_VARIANT[article.difficulty]} size="xs" uppercase />
              {!article.content && <Badge label="Coming soon" variant="slate" size="xs" />}
              <span className="ml-auto text-[11px] text-slate-500 flex items-center gap-1">
                <Clock size={11} /> {article.readingTime} min read
              </span>
            </div>
            <h3 className="text-base font-semibold text-white mb-1">{article.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-3 line-clamp-2">{article.excerpt}</p>
            <Link
              to={`/tracks/${track.id}/${article.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--aarya-accent)] hover:opacity-80"
            >
              <BookOpen size={14} /> Read <ArrowRight size={14} />
            </Link>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
