import './App.css'
import SongCard from './Components/Songs/SongCard.tsx'
import  { tracks } from './Data/track.ts';
import type { Track } from './Model/Track.ts';

function App() {


  const totalTracks: number = tracks.length;
  const random: number = Math.floor(Math.random() * totalTracks);
  const track: Track = tracks[random];
  return (
    <>
      <SongCard track={track} />
    </>
  )
}

export default App
