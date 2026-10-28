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

  function incrementReproduction() {
    const tr = (prev: TrackView): TrackView => {
      return {
        ...prev,
        "reproduccions": prev.reproduccions + 1
      }
    }
    setTrack(tr);
  }

  const data = now.toLocaleString('ca-ES');


  function handleClickRandom() {
    const random = Math.floor(Math.random() * tracks.length);

    const trackRandom = (): TrackView => {
      return {
        ...tracks[random],
        "likes": {
          "like": true,
          "totalLikes": 100
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

  return (
    <>
      <header>
        <h1>SPOTIFY</h1>
        <p>Usuari: {user.name}</p>
        <p>Data: {data}</p>
        <button type="button" onClick={() => setNow(new Date())}>Actualitza data</button>
        <button type="button" onClick={handleClickRandom}>Random</button>
      </header>
      <SongCard trackInfo={track} play={() => incrementReproduction()} like={() => gestionarLikes()} reset={() => resetLikesAndReproduccions()} />
    </>
  )
}
export default App
