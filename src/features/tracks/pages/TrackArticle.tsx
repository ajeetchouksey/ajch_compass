import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Clock, Users } from 'lucide-react';
import { Badge, Breadcrumb } from '@/components/ui';
import { getTrack } from '../data/tracks';
import { getArticle } from '../data/articles';

const DIFFICULTY_VARIANT = {
  beginner: 'emerald',
  intermediate: 'amber',
  advanced: 'rose',
} as const;

const PLACEHOLDER = (title: string) => `
## Coming soon

This article isn't written yet. **${title}** will cover the topic with
clear, practical, no-jargon guidance once it's ready.

In the meantime, browse the other articles in this track.
`.trim();

export default function TrackArticle() {
  const { trackId, slug } = useParams<{ trackId: string; slug: string }>();
  const track = getTrack(trackId);
  const article = getArticle(slug);

  if (!track) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center text-slate-400">
        Track not found. <Link to="/tracks" className="text-[var(--aarya-accent)] underline">Back to all tracks</Link>
      </div>
    );
  }

  const title = article?.title ?? (slug ?? '').replace(/-/g, ' ');
  const content = article?.content ?? PLACEHOLDER(title);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Breadcrumb
        items={[
          { label: 'Tracks', to: '/tracks' },
          { label: track.label, to: `/tracks/${track.id}` },
          { label: title },
        ]}
      />

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge label={track.audience} variant={track.badgeVariant} icon={Users} size="xs" />
          {article && (
            <Badge label={article.difficulty} variant={DIFFICULTY_VARIANT[article.difficulty]} size="xs" uppercase />
          )}
        </div>
        <h1 className="text-3xl font-bold text-white leading-tight mb-3">{title}</h1>
        {article && (
          <p className="text-base text-slate-400 leading-relaxed mb-3">{article.excerpt}</p>
        )}
        {article && (
          <div className="flex items-center gap-1.5 text-[12px] text-slate-500 pb-4 border-b border-slate-800/60">
            <Clock size={12} /> {article.readingTime} min read
          </div>
        )}
      </header>

      <div className="prose prose-invert prose-sm max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
