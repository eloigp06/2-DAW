import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { tracks } from "./data/track/track";
import { TrackBD } from "./interfaces/track/trackBD";
import { ArtistBD } from "./interfaces/artist/artistBD";
import { artists } from "./data/artist/artists";
import { countryBD } from "./interfaces/country/countryBD";
import { countryes } from "./data/country/country";
import { createTrack, deleteTrack, getAllTracks, getTrackById, updateTrack } from "./data/Services/trackService";
import { ErrorService } from "./interfaces/error/errorSrvice";
import { SuccessService } from "./data/Services/successService";
import { UpdateService } from "./data/Services/updateService";
import { DeleteService } from "./data/Services/deleteService";
import { createArtist, deleteArtist, getAllArtist, getArtistkById, updateArtist } from "./data/Services/artistService";
import { createCountrye, getAllCountryes, updateCountry } from "./data/Services/countryService";


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

  const result: SuccessService<TrackBD> | ErrorService = createTrack(req.body);

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message })
  }
  tracks.push((result as SuccessService<TrackBD>).data);
  return res.status(result.code).json(result);
});

app.put("/tracks/:id", (req: Request, res: Response) => {


  const result: UpdateService<TrackBD> | ErrorService = updateTrack(req.body, req.params.id as string);

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message })
  }

  const index: number = (result as UpdateService<TrackBD>).index;
  tracks[index] = (result as UpdateService<TrackBD>).data;
  return res.status(result.code).json(result);
});

app.delete("/tracks/:id", (req: Request, res: Response) => {
  const result: DeleteService | ErrorService = deleteTrack(req.params.id as string);

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message })
  }

  const index: number = (result as DeleteService).index;

  tracks.splice(index, 1);

  return res.status(result.code).json(result);
});



app.get("/artists", (_req: Request, res: Response) => {
  return res.status(200).json(getAllArtist());
});

app.get("/artists/:id", (req: Request, res: Response) => {
  const findsArtist: ArtistBD | undefined = getArtistkById(req.params.id as string)
  if (!findsArtist) {
    return res.status(404).json({ message: "Artist not found" });
  }
  return res.status(200).json(findsArtist);
});

app.post("/artists", (req: Request, res: Response) => {
  const result: SuccessService<ArtistBD> | ErrorService = createArtist(req.body);


  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message })
  }


  artists.push((result as SuccessService<ArtistBD>).data);
  return res.status(result.code).json(result);
});

app.put("/artists/:id", (req: Request, res: Response) => {

  const result: UpdateService<ArtistBD> | ErrorService = updateArtist(req.body, req.params.id as string);

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message })
  }

  const index: number = (result as UpdateService<ArtistBD>).index;
  artists[index] = (result as UpdateService<ArtistBD>).data;
  return res.status(result.code).json(result);
});

app.delete("/artists/:id", (req: Request, res: Response) => {
  const result: DeleteService | ErrorService = deleteArtist(req.params.id as string);

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message })
  }

  const index: number = (result as DeleteService).index;

  artists.splice(index, 1);

  return res.status(result.code).json(result);
});



app.get("/countryes", (_req: Request, res: Response) => {
  return res.status(200).json(getAllCountryes());
});

app.post("/countryes", (req: Request, res: Response) => {
  const result: SuccessService<countryBD> | ErrorService = createCountrye(req.body);

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message })
  }


  countryes.push((result as SuccessService<countryBD>).data);
  return res.status(result.code).json(result);
});

app.put("/countryes/:id", (req: Request, res: Response) => {

  const result: UpdateService<countryBD> | ErrorService = updateCountry(req.body, req.params.id as string);

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message })
  }

  const index: number = (result as UpdateService<countryBD>).index;
  countryes[index] = (result as UpdateService<countryBD>).data;
  return res.status(result.code).json(result);
});



app.get("/users", (_req: Request, res: Response) => {
  return res.status(200).json(getAllArtist());
});

app.get("/users/:id", (req: Request, res: Response) => {
  const findsArtist: ArtistBD | undefined = getArtistkById(req.params.id as string)
  if (!findsArtist) {
    return res.status(404).json({ message: "Artist not found" });
  }
  return res.status(200).json(findsArtist);
});

app.post("/users", (req: Request, res: Response) => {
  const result: SuccessService<ArtistBD> | ErrorService = createArtist(req.body);


  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message })
  }


  artists.push((result as SuccessService<ArtistBD>).data);
  return res.status(result.code).json(result);
});

app.put("/users/:id", (req: Request, res: Response) => {

  const result: UpdateService<ArtistBD> | ErrorService = updateArtist(req.body, req.params.id as string);

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message })
  }

  const index: number = (result as UpdateService<ArtistBD>).index;
  artists[index] = (result as UpdateService<ArtistBD>).data;
  return res.status(result.code).json(result);
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const result: DeleteService | ErrorService = deleteArtist(req.params.id as string);

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message })
  }

  const index: number = (result as DeleteService).index;

  artists.splice(index, 1);

  return res.status(result.code).json(result);
});

app.listen(APICONFIG.port, APICONFIG.host, () => {
  console.log(`Servidor escoltant a http://${APICONFIG.host}:${APICONFIG.port}`);
})