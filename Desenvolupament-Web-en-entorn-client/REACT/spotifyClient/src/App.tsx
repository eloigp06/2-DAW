import './App.css'
import { useState } from 'react';
import SongCard from './Components/Songs/SongCard.tsx'
import type { TrackView } from './Components/Songs/Types/TrackView.ts';
import { tracks } from './Data/track.ts';
import { users } from './Data/user.ts';


function App() {

  const [track, setTrack] = useState<TrackView>(
    {
      ...tracks[Math.floor(Math.random() * tracks.length)],
      "reproduccions": Math.floor(Math.random() * 1000),
      "likes": Math.floor(Math.random() * 5000)
    }
  );

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


  const trackWR: TrackView = {
    ...track,
    "reproduccions": Math.floor(Math.random() * 10000),
    "likes": 10
  };


  function handleClickRandom() {
    const tr = (prev: TrackView): TrackView => {
      return {
        ...tracks[(Math.floor(Math.random() * tracks.length))],
        "reproduccions": Math.floor(Math.random() * 10000),
        "likes": Math.floor(Math.random() * 3000)
      }
    }
    setTrack(tr);
  };
  return (
    <>
      <header>
        <h1>SPOTIFY</h1>
        <p>Usuari: {user.name}</p>
        <p>Data: {data}</p>
        <button type="button" onClick={() => setNow(new Date())}>Actualitza la data</button>
        <button type="button" onClick={handleClickRandom}></button>
      </header>
      <SongCard trackInfo={trackWR} play={() => incrementReproduction()} />

      <p><button type="button" onClick={handleClickRandom}></button></p>
    </>
  )

}
export default App
