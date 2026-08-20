import { ShieldCheck, TrendingUp, Brain, Zap } from 'lucide-react';
import type { AccentKey, BadgeVariant } from '@/components/ui';

// Migrated from ajch_platform's former Discovery/Pathways feature, by way
// of Spark (which briefly hosted this as /grownups before the Kids/
// non-technical-pro split). Color/bg/border are the exact values from the
// original Pathways.tsx TRACKS array — needed for a faithful hover/glow
// port, not just the badge accent token. See docs/design-sync.md.
export interface Track {
  id: string;
  label: string;
  audience: string;
  audienceFull: string;
  accent: AccentKey;
  badgeVariant: BadgeVariant;
  color: string;
  bg: string;
  border: string;
  icon: typeof ShieldCheck;
  what: string;
  description: string;
  topics: string[];
}

export const TRACKS: Track[] = [
  {
    id: 'safety',
    label: 'AI Safety & Responsibility',
    audience: 'Teens 13–18',
    audienceFull: 'Built for teens & students learning to navigate AI safely',
    accent: 'blue',
    badgeVariant: 'blue',
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.08)',
    border: 'rgba(56,189,248,0.22)',
    icon: ShieldCheck,
    what: 'Short, jargon-free articles with real examples.',
    description:
      'Learn how AI is used in scams, deepfakes, and disinformation — and how to stay safe, spot manipulation, and be a responsible digital citizen.',
    topics: ['Scam Detection', 'Deepfakes & Disinformation', 'Digital Privacy', 'Responsible AI Use'],
  },
  {
    id: 'applied',
    label: 'Applied AI for Practitioners',
    audience: 'Finance & Data Professionals',
    audienceFull: 'Built for finance and data professionals who want practical AI skills',
    accent: 'amber',
    badgeVariant: 'amber',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.22)',
    icon: TrendingUp,
    what: 'Workflow-ready guides you can apply this week.',
    description:
      'Practical AI skills for financial modeling, data storytelling, scenario forecasting, and automating repetitive workflows — no data science degree required.',
    topics: ['Financial Forecasting', 'Data Storytelling', 'Report Automation', 'Scenario Modeling'],
  },
  {
    id: 'ethics',
    label: 'AI Ethics & Bias',
    audience: 'Students & Policy Researchers',
    audienceFull: "Built for students and policy researchers studying AI's societal impact",
    accent: 'purple',
    badgeVariant: 'purple',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.22)',
    icon: Brain,
    what: 'Analytical deep-dives grounded in real cases.',
    description:
      'Understand how algorithmic bias happens, why fairness in ML is contested, and how governance frameworks like the EU AI Act shape responsible AI.',
    topics: ['Algorithmic Bias', 'Fairness in ML', 'AI Governance', 'Ethical Design'],
  },
  {
    id: 'productivity',
    label: 'AI Productivity',
    audience: 'Students & Professionals',
    audienceFull: 'Built for anyone who wants AI to save them hours every week',
    accent: 'emerald',
    badgeVariant: 'emerald',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.22)',
    icon: Zap,
    what: 'Hands-on tips and templates you can use immediately.',
    description:
      'Use AI as a force multiplier — for studying, writing, workflow automation, and prompt engineering that actually saves you hours every week.',
    topics: ['Prompt Engineering', 'AI Study Assistants', 'Workflow Automation', 'Research Acceleration'],
  },
];

export function getTrack(id: string | undefined): Track | undefined {
  return TRACKS.find((t) => t.id === id);
}
