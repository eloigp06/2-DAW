import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import SongCard from './SongCard'
import { tracks } from '../../Data/track'

afterEach(cleanup)

describe('SongCard', () => {
  it.each(tracks.map((track, index) => ({
    trackInfo: { ...track, reproduccions: index * 137 },
  })))(
    'renders all fields from the provided track: $trackInfo.title',
    ({ trackInfo }) => {
      const { container } = render(<SongCard trackInfo={trackInfo} />)

      expect(
        screen.getByRole('heading', { level: 1, name: trackInfo.title }),
      ).toBeTruthy()
      expect(Array.from(container.querySelectorAll('p')).map((paragraph) => paragraph.textContent))
        .toEqual([
          trackInfo.artist,
          String(trackInfo.duration),
          String(trackInfo.reproduccions),
        ])
    },
  )

  it('renders zero duration and play count instead of hiding valid zero values', () => {
    const sourceTrack = tracks[0]
    if (!sourceTrack) throw new Error('The track data must contain at least one track')

    const trackInfo = { ...sourceTrack, duration: 0, reproduccions: 0 }
    const { container } = render(<SongCard trackInfo={trackInfo} />)

    expect(screen.getByRole('heading', { level: 1, name: trackInfo.title })).toBeTruthy()
    expect(Array.from(container.querySelectorAll('p')).map((paragraph) => paragraph.textContent))
      .toEqual([trackInfo.artist, '0', '0'])
  })
})
