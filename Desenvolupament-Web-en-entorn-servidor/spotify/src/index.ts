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
import { createCountrye, getAllCountryes, updateCountry } from "./Services/country.Service";
import { trackRouter } from "./routes/trackRouter";
import { artistRouter } from "./routes/artistRouter";
import { userRouter } from "./routes/userRouter";
import { countryRouter } from "./routes/countyRouter";


const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
  return res.json(JSON.stringify(APICONFIG));
});

app.use("/tracks", trackRouter);

app.use("/artists", artistRouter)

app.use("/users", userRouter);

app.use("/countryes", countryRouter)



app.listen(APICONFIG.port, APICONFIG.host, () => {
  console.log(`Servidor escoltant a http://${APICONFIG.host}:${APICONFIG.port}`);
})