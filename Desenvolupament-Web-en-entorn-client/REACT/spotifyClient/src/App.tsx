import './App.css'
import SongCard from './Components/Songs/SongCard.tsx'
import type { TrackView } from './Components/Songs/Types/TrackView.ts';
import { tracks } from './Data/track.ts';
import type { Track } from './Model/Track.ts';

function App() {


  const totalTracks: number = tracks.length;
  const random: number = Math.floor(Math.random() * totalTracks);
  const track: Track = tracks[random];

  const totalReproduccions: TrackView = {
    ...track,
    "reproduccions": Math.floor(Math.random() * 1000)
  };
  return (
    <>
      <SongCard trackInfo={totalReproduccions} />
    </>
  )
}

export default App
