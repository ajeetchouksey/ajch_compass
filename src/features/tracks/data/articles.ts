// Migrated from ajch_platform's former Discovery/Pathways feature, by way
// of Spark (which briefly hosted this as /grownups before the Kids/
// non-technical-pro split).
//
// Source-of-truth note: only 2 of these 12 articles ever had real body
// content in ajch_platform — the other 10 always rendered a generic
// "coming soon" placeholder there too. `content` is left undefined for
// those; TrackArticle.tsx shows the same honest placeholder rather than
// pretending they're finished.
export interface Article {
  slug: string;
  track: string;
  title: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  date: string;
  content?: string;
}

export const ARTICLES: Article[] = [
  // ── safety ──────────────────────────────────────────────────────────
  {
    slug: 'ai-scam-awareness',
    track: 'safety',
    title: 'How Scammers Use AI (And How to Spot It)',
    excerpt:
      'AI-generated voice clones, deepfake videos, and automated phishing emails are changing how scams work. Here is what to watch for and how to protect yourself.',
    tags: ['scams', 'digital-safety', 'deepfakes'],
    readingTime: 5,
    difficulty: 'beginner',
    date: '2026-06-10',
    content: `
## Why AI Makes Scams More Dangerous

AI didn't invent scams — but it made them faster, cheaper, and much harder to spot. A scammer who once needed hours to craft a convincing email can now generate thousands of personalised messages in seconds.

Here is what has changed:

- **Voice cloning**: 3 seconds of audio is enough to clone a person's voice with modern AI models
- **Deepfake video**: Real-time face-swapping runs on a standard laptop
- **Automated phishing**: LLMs write personalised, grammatically perfect lures at scale
- **Impersonation at scale**: AI monitors your social media to craft contextually relevant messages

## How a Modern AI Scam Works

1. Scammer collects public data about you (social media, public records)
2. AI generates a personalised, believable message using that data
3. You receive contact that feels specific and trustworthy
4. If you respond, data or money is stolen — if not, the scammer moves to the next target

## The Three Red Flags

Most AI scams share three patterns regardless of how they are delivered:

**1. Urgency pressure**

"Act now or lose access." "Your account will be suspended in 24 hours." Urgency bypasses slow, critical thinking and activates fast, reactive decision-making.

**2. Unusual payment or data request**

Legitimate organisations never ask for gift cards, crypto, or one-time passwords over an unsolicited contact — ever.

**3. Too-good or too-bad to be true**

Both extremes are designed to create emotional override — either excitement (prize won) or fear (account hacked). Emotion is the exploit.

## The Pause Protocol

The best defence is a simple three-step pause:

1. **Stop** — do not click, call back, or respond immediately
2. **Verify independently** — use a number or URL you looked up yourself, not one they gave you
3. **Ask someone** — scammers rely on isolation; talking to another person breaks the spell

## Voice Clone Red Flags

A real-time voice clone can be convincing but still shows tells:

- Slight audio artefacts or unnatural pauses
- Can't answer personal questions you'd both know (shared memories, last time you met)
- Refuses a video call or face-to-face

If something feels off, it probably is. Trust your instinct and verify through a separate channel.

## Summary

AI has industrialised scamming. The tactics are old — urgency, impersonation, trust exploitation. The scale and personalisation are new. Recognition is your first line of defence, and a 30-second pause is the most powerful tool you have.
    `.trim(),
  },
  {
    slug: 'responsible-ai-guide',
    track: 'safety',
    title: 'Responsible AI: What It Means for You',
    excerpt:
      'Responsibility in AI is not just for engineers — it starts with how you search, share, and trust information online.',
    tags: ['responsible-ai', 'digital-literacy'],
    readingTime: 4,
    difficulty: 'beginner',
    date: '2026-06-12',
  },
  {
    slug: 'deepfakes-and-disinformation',
    track: 'safety',
    title: 'Deepfakes, Disinformation & Digital Literacy',
    excerpt:
      'AI-generated media is now indistinguishable from real content. Understanding how deepfakes are made is the first step to spotting them.',
    tags: ['deepfakes', 'disinformation', 'media-literacy'],
    readingTime: 6,
    difficulty: 'intermediate',
    date: '2026-06-14',
  },

  // ── applied ──────────────────────────────────────────────────────────
  {
    slug: 'financial-forecasting-with-ai',
    track: 'applied',
    title: 'Financial Forecasting with AI: A Practical Guide',
    excerpt:
      'How to use regression models and LLMs to predict cash flow, budget variances, and market trends — without a data science degree.',
    tags: ['finance', 'forecasting', 'applied-ai'],
    readingTime: 8,
    difficulty: 'intermediate',
    date: '2026-06-10',
    content: `
## Why AI Changes Financial Forecasting

Traditional forecasting depends on historical averages, linear trend lines, and analyst intuition. AI doesn't replace that — it augments it. The key shift is moving from static models to adaptive ones that update as new data arrives.

## The Forecasting Stack

1. Raw financial data (CSV / ERP / spreadsheet)
2. Data cleaning and feature engineering
3. A regression model or time-series ML model
4. An LLM narrative layer that explains the numbers
5. A forecast report with scenarios

## Step 1: Prepare Your Data

The model is only as good as the input. Before touching any AI:

- **Normalise dates** — consistent YYYY-MM-DD across all rows
- **Handle missing values** — forward-fill for sparse periods, flag for genuine gaps
- **Create lag features** — last month's revenue, 3-month rolling average, YoY delta

## Step 2: Choose Your Model

For most finance practitioners, three models cover 90% of use cases:

| Model | Best For | Complexity |
|-------|----------|------------|
| Linear Regression | Trend + seasonality, explainable | Low |
| XGBoost | Complex patterns, feature interactions | Medium |
| Prophet (Meta) | Time-series with holidays, events | Low |

Start with Prophet for monthly data — it handles seasonality natively.

## Step 3: Add an LLM Narrative Layer

Numbers without narrative don't get actioned. Use an LLM to:

- Summarise what drove the variance vs. budget
- Flag anomalies in plain English before the numbers hit the board
- Generate scenario descriptions ("If Q3 headcount grows 10%...")

> Prompt: "Given these monthly actuals vs. forecast: [data table], write a 3-bullet CFO summary highlighting the top variance drivers and any risks for Q4. Keep it under 100 words."

## Summary

AI forecasting is not about replacing the analyst — it is about giving them better inputs faster. Start with clean data, a simple model, and an LLM narrative layer. Complexity comes later; value comes first.
    `.trim(),
  },
  {
    slug: 'ai-for-data-storytelling',
    track: 'applied',
    title: 'AI-Powered Data Storytelling',
    excerpt:
      'Turning raw numbers into a clear narrative is where most analysts struggle. AI closes that gap faster than any BI tool.',
    tags: ['data', 'storytelling', 'dashboards'],
    readingTime: 7,
    difficulty: 'intermediate',
    date: '2026-06-12',
  },
  {
    slug: 'automating-reports-with-llms',
    track: 'applied',
    title: 'Automating Reports with LLMs',
    excerpt:
      'Monthly reporting cycles that take days can be compressed to hours using structured prompts and LLM pipelines.',
    tags: ['automation', 'llm', 'productivity'],
    readingTime: 6,
    difficulty: 'intermediate',
    date: '2026-06-14',
  },

  // ── ethics ──────────────────────────────────────────────────────────
  {
    slug: 'bias-in-ai-systems',
    track: 'ethics',
    title: 'Bias in AI Systems: How It Happens',
    excerpt:
      'Algorithmic bias is not a bug — it is a feature of how models learn from human-generated data. Understanding the sources changes how you build and use AI.',
    tags: ['bias', 'fairness', 'ml'],
    readingTime: 6,
    difficulty: 'beginner',
    date: '2026-06-10',
  },
  {
    slug: 'fairness-in-ml',
    track: 'ethics',
    title: 'Fairness in Machine Learning',
    excerpt:
      'There are at least seven definitions of "fairness" in ML — and they contradict each other. Here is how to navigate them in real projects.',
    tags: ['fairness', 'ethics', 'ml'],
    readingTime: 7,
    difficulty: 'intermediate',
    date: '2026-06-12',
  },
  {
    slug: 'ai-governance-for-students',
    track: 'ethics',
    title: 'AI Governance Frameworks for Students',
    excerpt:
      'EU AI Act, NIST AI RMF, OECD Principles — the governance landscape is dense. This guide maps it clearly for newcomers.',
    tags: ['governance', 'policy', 'ai-act'],
    readingTime: 5,
    difficulty: 'intermediate',
    date: '2026-06-14',
  },

  // ── productivity ────────────────────────────────────────────────────
  {
    slug: 'ai-study-assistant',
    track: 'productivity',
    title: 'AI as Your Study Assistant',
    excerpt:
      'Summarise papers, generate practice questions, build study schedules — LLMs are the study tool that adapts to you, not the other way around.',
    tags: ['studying', 'llm', 'education'],
    readingTime: 4,
    difficulty: 'beginner',
    date: '2026-06-10',
  },
  {
    slug: 'automating-workflows-with-ai',
    track: 'productivity',
    title: 'Automating Repetitive Workflows with AI',
    excerpt:
      'Identifying which workflows are worth automating — and building the right prompts to do it reliably without hallucinations breaking the chain.',
    tags: ['automation', 'workflows', 'prompting'],
    readingTime: 6,
    difficulty: 'intermediate',
    date: '2026-06-12',
  },
  {
    slug: 'prompt-engineering-for-productivity',
    track: 'productivity',
    title: 'Prompt Engineering for Productivity',
    excerpt:
      'The prompts that save the most time are not clever one-liners — they are structured, consistent, and reusable across contexts.',
    tags: ['prompts', 'prompt-engineering', 'productivity'],
    readingTime: 5,
    difficulty: 'beginner',
    date: '2026-06-14',
  },
];

export function getArticlesForTrack(trackId: string): Article[] {
  return ARTICLES.filter((a) => a.track === trackId);
}

export function getArticle(slug: string | undefined): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
