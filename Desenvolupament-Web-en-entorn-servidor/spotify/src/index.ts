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
import { COUNTRIES } from "./interfaces/artist/artist.constant";
import { countryBDD } from "./interfaces/country/countryBDD";
import { isValidCountry } from "./validators/country.validator";
import { countryes } from "./data/country/country";
import { Country } from "./interfaces/country/country";
import { createTrack, getAllTracks, getTrackById } from "./data/Services/trackService";
import { ErrorService } from "./interfaces/error/errorSrvice";
import { SuccessService } from "./data/Services/successService";


const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
  return res.json(JSON.stringify(APICONFIG));
});


app.get("/tracks", (_req: Request, res: Response) => {
  return res.status(200).json(getAllTracks());
});

app.get("/tracks/:id", (req: Request, res: Response) => {

  const finsdTrack: TrackBD | undefined = getTrackById(req.params.id as string);
  if (!finsdTrack) {
    return res.status(404).json({ message: "Track not found" })
  }
  return res.status(200).json(finsdTrack);
});

app.post("/tracks", (req: Request, res: Response) => {

  const result: SuccessService<TrackBD> | ErrorService  = createTrack(req.body);

  if(!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message})
  }
  tracks.push((result as SuccessService<TrackBD>).data);
  return res.status(result.code).json(result);
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
    country: getCanonicalCountry(artist.country)
  };

  artists.push(artistkRecord);
  return res.status(201).json(artistkRecord);
});



app.get("/countryes", (_req: Request, res: Response) => {
  return res.status(200).json(countryes);
});

app.post("/countryes", (req: Request, res: Response) => {
  const country: Country = req.body;

  if (!isValidCountry(country)) {
    return res.status(400).json({ message: "Resposta no valida" })
  }

  const idCountry: string = randomUUID()
  const CountryRecord: countryBDD = {
    id: idCountry,
    name: country.name.replace(/\s+/g, " ")
  };

  countryes.push(CountryRecord);
  return res.status(201).json(CountryRecord);
});

app.put("/countryes/:id", (req: Request, res: Response) => {
  // const idCountry: string = req.params.id as string;
  // const countryIndex: number = tracks.findIndex((country: countryBDD) => country.name === idCountry);
  // if (countryIndex === -1) {
  //   return res.status(404).json({ message: `Track not found` });
  // }

  // const country: Country = req.body;
  // if (!isValidTrack(country)) {
  //   return res.status(400).json({ message: "Invalid data" });
  // }

  // const updateCountry: countryBDD = {
  //   id: idCountry,
  //   name: country.name.replace(/\s+/g, " ")
  // };

  // countryes[countryIndex] = updateCountry;

  // return res.status(204).json(updateCountry);
});

app.listen(APICONFIG.port, APICONFIG.host, () => {
  console.log(`Servidor escoltant a http://${APICONFIG.host}:${APICONFIG.port}`);
})