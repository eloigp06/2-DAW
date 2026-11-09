import './App.css'
import { useEffect, useState } from 'react';
import SongCard from './Components/Songs/SongCard.tsx'
import type { TrackView } from './Components/Songs/Types/TrackView.ts';
import { users } from './Data/user.ts';
import type { Like } from './Components/Songs/Types/Like.ts';
import PlayCard from './Components/Playing/PlayCard.tsx';
import ListSongs from './Components/Songs/ListSongs.tsx';
import { ENV } from './Config/env.ts';
import type { GetTrack } from './ApiManagments/Tracks/Interfaces/Track.ts';
import type { AddHistory } from './ApiManagments/History/Intrefaces/HistoryCreate.ts';


function App() {
  const [tracks, setTracks] = useState<GetTrack[]>([]);
  const [volume, setVolume] = useState<number>(10);
  const [escolta, setIsEscoltan] = useState(false);
  const [user] = useState(() => users[Math.floor(Math.random() * users.length)]);
  const [now, setNow] = useState(() => new Date());
  const data = now.toLocaleString('ca-ES');
  const [playingTitle, setIsPlaying] = useState<string | null>(null);

  async function carregarDadesTrack() {
    const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
    const listTrack: GetTrack[] = await resposta.json() as GetTrack[];
    setTracks(listTrack);
  }

  useEffect(
    () => {
      carregarDadesTrack();
    }, []
  );

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

  async function incrementReproduction() {
    const tr = (prev: TrackView): TrackView => {
      setIsEscoltan(true);
      return {
        ...prev,
        "reproduccions": prev.reproduccions + 1
      }
    }
    const newHistory:AddHistory = {
      user: "9ABFE5E0-3D0E-496E-BA03-626AB321C805",
      track: tracks[1].id
    }

    const response: Response = await fetch(
      "http://localhost:3000/tracks/user/history", {
        method: "POST",
        headers: {
          "Content-type": "aplycation/json"
        },
        body: JSON.stringify(newHistory)
      })
      if(!response.ok){
        return false
      }
      const result = await response.json();
      console.log(result)
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

  function playNoPlay() {
    incrementReproduction();
    setIsPlaying(track.title);
  }

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
      <main>
        {
          tracks.length > 0 ?
            <table>
              <thead>
                <title>ListSong</title>
              </thead>
              <tbody>
                <ListSongs tracks={tracks} />
              </tbody>
            </table>
            : <p>No tracks avalible</p>
        }

        <aside>

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
          </header>

          <SongCard
            trackInfo={track}
            play={playNoPlay}
            like={() => gestionarLikes()}
            reset={() => resetLikesAndReproduccions()}
          />
          <hr />
          <PlayCard
            volupeUp={() => VolumenUp()}
            volumeDown={() => VolumenDown()}
            volume={volume}
            escolta={escolta}
            title={track.title}
            playingTitle={playingTitle}
            stop={() => setIsPlaying(null)}

          />
        </aside>

      </main>

    </>

  )

}
export default App


