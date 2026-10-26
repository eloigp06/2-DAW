import './App.css'
import { useState } from 'react';
import Header from './Components/Header/HeaderCard.tsx'
import SongCard from './Components/Songs/SongCard.tsx'
import type { TrackView } from './Components/Songs/Types/TrackView.ts';
import { tracks } from './Data/track.ts';
import type { Track } from './Model/Track.ts';
import { users } from './Data/user.ts';

function App() {

  const year: string = new Date().getFullYear().toString();
const month: string = (new Date().getMonth() + 1).toString();
const day: string = new Date().getDate().toString();

  const [randomUser] = useState(() => users[Math.floor(Math.random() * users.length)]);

  const totalTracks: number = tracks.length;
  const random: number = Math.floor(Math.random() * totalTracks);
  const track: Track = tracks[random];



  const trackRW: TrackView = {
    ...track,
    "reproduccions": Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 1000)
  };
  return (
    <>
      <SongCard trackInfo={trackRW} />
      <Header headerInfo={{ user: randomUser.name, data: `${day}/${month}/${year}` }} />

    </>
  )



}

export default App
