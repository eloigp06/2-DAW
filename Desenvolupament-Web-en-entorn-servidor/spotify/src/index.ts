import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { ArtistBD } from "./interfaces/artist/artistBD";
import { artists } from "./data/artist/artists";
import { countryBD } from "./interfaces/country/countryBD";
import { countryes } from "./data/country/country";
import { ErrorService } from "./interfaces/error/errorSrvice";
import { SuccessService } from "./Services/success.Service";
import { UpdateService } from "./Services/update.Service";
import { DeleteService } from "./Services/delete.Service";
import { createArtist, deleteArtist, getAllArtist, getArtistkById, updateArtist } from "./Services/artist.Service";
import { createCountrye, getAllCountryes, updateCountry } from "./Services/country.Service";
import { trackRouter } from "./routes/trackRouter";
import { artistRouter } from "./routes/artistRouter";
import { userRouter } from "./routes/userRouter";


const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
  return res.json(JSON.stringify(APICONFIG));
});

app.use("/tracks", trackRouter);

app.use("/artists", artistRouter)

app.use("/users", userRouter);




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


app.listen(APICONFIG.port, APICONFIG.host, () => {
  console.log(`Servidor escoltant a http://${APICONFIG.host}:${APICONFIG.port}`);
})