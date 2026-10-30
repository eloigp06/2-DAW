import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { tracks } from './Data/track'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('App', () => {
  it.each(tracks.map((track, index) => ({ track, index })))(
    'renders the selected track from the data set: $track.title',
    ({ track, index }) => {
      const selection = (index + 0.5) / tracks.length
      const playCountSelection = (tracks.length - index - 0.5) / tracks.length
      const expectedPlayCount = Math.floor(playCountSelection * 1000)

      vi.spyOn(Math, 'random')
        .mockReturnValueOnce(selection)
        .mockReturnValueOnce(playCountSelection)

      const { container } = render(<App />)

      expect(
        screen.getByRole('heading', { level: 1, name: track.title }),
      ).toBeTruthy()
      expect(Array.from(container.querySelectorAll('p')).map((paragraph) => paragraph.textContent))
        .toEqual([track.artist, String(track.duration), String(expectedPlayCount)])
    },
  )

  it('selects the first available track when the random value is zero', () => {
    const firstTrack = tracks[0]
    if (!firstTrack) throw new Error('The track data must contain at least one track')

    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { container } = render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: firstTrack.title })).toBeTruthy()
    expect(Array.from(container.querySelectorAll('p')).map((paragraph) => paragraph.textContent))
      .toEqual([firstTrack.artist, String(firstTrack.duration), '0'])
  })

  it('selects the last available track just below the upper random bound', () => {
    const lastTrack = tracks.at(-1)
    if (!lastTrack) throw new Error('The track data must contain at least one track')

    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(1 - 1 / (tracks.length * 2))
      .mockReturnValueOnce(1 - Number.EPSILON)
    const { container } = render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: lastTrack.title })).toBeTruthy()
    expect(Array.from(container.querySelectorAll('p')).map((paragraph) => paragraph.textContent))
      .toEqual([
        lastTrack.artist,
        String(lastTrack.duration),
        String(Math.floor((1 - Number.EPSILON) * 1000)),
      ])
  })
})
