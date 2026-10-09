import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { tracks } from "./data/track/track";
import { TrackBD } from "./interfaces/track/trackBD";
import { ArtistBD } from "./interfaces/artist/artistBD";
import { artists } from "./data/artist/artists";
import { countryBD } from "./interfaces/country/countryBD";
import { countryes } from "./data/country/country";
import { createTrack, deleteTrack, getAllTracks, getTrackById, updateTrack } from "./Services/trackService";
import { ErrorService } from "./interfaces/error/errorSrvice";
import { SuccessService } from "./Services/successService";
import { UpdateService } from "./Services/updateService";
import { DeleteService } from "./Services/deleteService";
import { createArtist, deleteArtist, getAllArtist, getArtistkById, updateArtist } from "./Services/artistService";
import { createCountrye, getAllCountryes, updateCountry } from "./Services/countryService";
import { getAllTracksController, getDeleteTrackController, getPostTrackController, getPutTrackController, getTrackByIdController } from "./controllers/trackController";
import { trackRouter } from "./routes/trackRouter";
import { artistRouter } from "./routes/artistRouter";


const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
  return res.json(JSON.stringify(APICONFIG));
});

app.use("/tracks", trackRouter);

app.use("/artists", artistRouter)






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