import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { tracks } from "./data/track/track";
import { TrackBD } from "./interfaces/track/trackBD";
import { Track } from "./interfaces/track/track";
import { isValidTrack } from "./validators/track.validator";
import { randomUUID } from "crypto";
import { Artist } from "./interfaces/artist/artist";
import { ArtistBD } from "./interfaces/artist/artistBD";
import { artists } from "./data/artist/artists";
import { getCanonicalCountry, isValidArtist } from "./validators/artist.validator";


const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
  return res.json(JSON.stringify(APICONFIG));
});



app.get("/tracks", (_req: Request, res: Response) => {
  return res.status(200).json(tracks);
});



app.get("/tracks/:id", (req: Request, res: Response) => {
  const idTrack: string = req.params.id as string;

  const track: TrackBD[] = tracks.filter(
    (t: TrackBD) => { return t.id === idTrack }
  );

  if (track.length === 0) {
    return res.status(404).json({ message: `Track ${idTrack} not found` })
  }
  return res.status(200).json(track);
});



app.get("/artists", (_req: Request, res: Response) => {
  return res.status(200).json(artists);
});



app.get("/artists/:id", (req: Request, res: Response) => {
  const idArtist: string = req.params.id as string;
  const artist: ArtistBD[] = artists.filter(
    (a: ArtistBD) => { return a.id === idArtist }
  );
  if (artist.length === 0) {
    return res.status(404).json({ message: `Artist ${idArtist} not found` });
  }
  return res.status(200).json(artist[0]);
});



app.post("/tracks", (req: Request, res: Response) => {
  const track: Track = req.body;
  if (!isValidTrack(track)) {
    return res.status(400).json({ message: "Invalid data" })
  }
  const uuid: string = randomUUID();

  const trackRecord: TrackBD = {
    id: uuid,
    title: track.title.trim().replace(/\s+/g, " "),
    artist: track.artist.replace(/\s+/g, " "),
    duration: track.duration
  };
  tracks.push(trackRecord);
  return res.status(201).json(trackRecord);
});



app.put("/tracks/:id", (req: Request, res: Response) => {
  const idTrack: string = req.params.id as string;
  const trackIndex: number = tracks.findIndex((track: TrackBD) => track.id === idTrack);
  if (trackIndex === -1) {
    return res.status(404).json({ message: `Track not found` });
  }

  const track: Track = req.body;
  if (!isValidTrack(track)) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const updatedTrack: TrackBD = {
    id: idTrack,
    title: track.title.trim().replace(/\s+/g, " "),
    artist: track.artist.trim().replace(/\s+/g, " "),
    duration: track.duration
  };

  tracks[trackIndex] = updatedTrack;

  return res.status(204).json(updatedTrack);
});



app.delete("/tracks/:id", (req: Request, res: Response) => {
  const idTrack: string = req.params.id as string;
  const trackIndex: number = tracks.findIndex((track: TrackBD) => track.id === idTrack);
  if (trackIndex === -1) {
    return res.status(404).json({ message: "Track not found" });
  }

  tracks.splice(trackIndex, 1);

  return res.status(204).json({ message: "Track eliminated" });
});



app.post("/artists", (req: Request, res: Response) => {
  const artist: Artist = req.body;

  if (!isValidArtist(artist)) {
    return res.status(400).json({ message: "Resposta no valida" })
  }

  const idartista: string = randomUUID()
  const artistkRecord: ArtistBD = {
    id: idartista,
    artist: artist.artist.trim().replace(/\s+/g, " "),
    realName: artist.realName.replace(/\s+/g, " "),
    pais: getCanonicalCountry(artist.pais)
  };

  artists.push(artistkRecord);
  return res.status(201).json(artistkRecord);
});


app.listen(APICONFIG.port, APICONFIG.host, () => {
  console.log(`Servidor escoltant a http://${APICONFIG.host}:${APICONFIG.port}`);
})