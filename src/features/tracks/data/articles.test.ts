import { describe, it, expect } from 'vitest'
import { ARTICLES, getArticle, getArticlesForTrack } from './articles'

describe('getArticle', () => {
  it('returns the article matching the given slug', () => {
    const article = getArticle('ai-scam-awareness')
    expect(article).toBeDefined()
    expect(article?.slug).toBe('ai-scam-awareness')
    expect(article?.track).toBe('safety')
  })

  it('returns undefined for a slug that does not exist', () => {
    expect(getArticle('does-not-exist')).toBeUndefined()
  })

  it('returns undefined when given undefined', () => {
    expect(getArticle(undefined)).toBeUndefined()
  })
})

describe('getArticlesForTrack', () => {
  it('returns only articles belonging to the given track', () => {
    const safetyArticles = getArticlesForTrack('safety')
    expect(safetyArticles.length).toBeGreaterThan(0)
    expect(safetyArticles.every((a) => a.track === 'safety')).toBe(true)
  })

  it('returns an empty array for a track with no articles', () => {
    expect(getArticlesForTrack('does-not-exist')).toEqual([])
  })

  it('returns the current article count for each real track', () => {
    // Reflects the current ARTICLES data (12 articles, 3 per track).
    expect(getArticlesForTrack('safety')).toHaveLength(3)
    expect(getArticlesForTrack('applied')).toHaveLength(3)
    expect(getArticlesForTrack('ethics')).toHaveLength(3)
    expect(getArticlesForTrack('productivity')).toHaveLength(3)
  })

  it('every article returned is present in ARTICLES', () => {
    const slugs = new Set(ARTICLES.map((a) => a.slug))
    for (const article of getArticlesForTrack('applied')) {
      expect(slugs.has(article.slug)).toBe(true)
    }
  })
})
