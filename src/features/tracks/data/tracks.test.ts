import { describe, it, expect } from 'vitest'
import { TRACKS, getTrack } from './tracks'

describe('getTrack', () => {
  it('returns the track matching the given id', () => {
    const track = getTrack('safety')
    expect(track).toBeDefined()
    expect(track?.id).toBe('safety')
    expect(track?.label).toBe('AI Safety & Responsibility')
  })

  it('returns undefined for an id that does not exist', () => {
    expect(getTrack('does-not-exist')).toBeUndefined()
  })

  it('returns undefined when given undefined', () => {
    expect(getTrack(undefined)).toBeUndefined()
  })

  it('finds every track defined in TRACKS by its own id', () => {
    for (const track of TRACKS) {
      expect(getTrack(track.id)).toBe(track)
    }
  })
})
