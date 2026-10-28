import './App.css'
import { useState } from 'react';
import SongCard from './Components/Songs/SongCard.tsx'
import type { TrackView } from './Components/Songs/Types/TrackView.ts';
import { tracks } from './Data/track.ts';
import { users } from './Data/user.ts';
import type { Like } from './Components/Songs/Types/Like.ts';


function App() {

  const [track, setTrack] = useState<TrackView>(() =>
  ({
    ...tracks[Math.floor(Math.random() * tracks.length)],
    "reproduccions": Math.floor(Math.random() * 1000),
    "likes": {
      "like": false,
      "totalLikes": 0
    }
  }
  ));

  const [user] = useState(() => users[Math.floor(Math.random() * users.length)]);
  const [now, setNow] = useState(() => new Date());
  const data = now.toLocaleString('ca-ES');

  function incrementReproduction() {
    const tr = (prev: TrackView): TrackView => {
      return {
        ...prev,
        "reproduccions": prev.reproduccions + 1
      }
    }
    setTrack(tr);
  }

  function handleClickRandom() {
    const random = Math.floor(Math.random() * tracks.length);

    const trackRandom = (): TrackView => {
      return {
        ...tracks[random],
        "likes": {
          "like": true,
          "totalLikes": Math.floor(Math.random() * 10000)
        },
        "reproduccions": Math.floor(Math.random() * 10000)

      }
    }
    setTrack(trackRandom);
  }

  function gestionarLikes() {
    const tr = (prev: TrackView): TrackView => {

      let increment: number = 1;
      if (prev.likes.like) {
        increment = -1;
      }
      const likeObj: Like = {
        like: !prev.likes.like,
        totalLikes: prev.likes.totalLikes + increment
      }

      return {
        ...prev,
        "likes": likeObj
      }
    }
    setTrack(tr);
  }

  function resetLikesAndReproduccions() {
    const tr = (prev: TrackView): TrackView => {
      return {
        ...prev,
        reproduccions: 0,
        likes: {
          like: false,
          totalLikes: 0,
        }
      }
    };
    setTrack(tr)
  }

  const [volume, setVolume] = useState<number>(10);

  function VolumenDown() {
    if (volume > 0) {
      setVolume(volume - 1);
    }
  }

  function VolumenUp() {
    if (volume < 100) {
      setVolume(volume + 1);
    }
  }

  return (
    <>
      <header className="app-header">
        <h1>SPOTIFY</h1>

        <div className="info">
          <p>Usuari: {user.name}</p>
          <p>Data: {data}</p>
        </div>

        <div className="controls">
          <button type="button" onClick={() => setNow(new Date())}>
            Actualitza data
          </button>
          <button type="button" onClick={handleClickRandom}>
            Random
          </button>
        </div>

        <div className="volume">
          <button onClick={() => VolumenDown()} disabled={volume === 0}>-</button>
          <span>Volum: {volume}</span>
          <button onClick={() => VolumenUp()} disabled={volume === 100}>+</button>
        </div>
      </header>

      <SongCard
        trackInfo={track}
        play={() => incrementReproduction()}
        like={() => gestionarLikes()}
        reset={() => resetLikesAndReproduccions()}
      />
    </>
  )

}
export default App
