import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { trackRouter } from "./routes/trackRouter";
import { artistRouter } from "./routes/artistRouter";
import { userRouter } from "./routes/userRouter";
import { countryRouter } from "./routes/countyRouter";
import { historyRouter } from "./routes/historyRouter";
import { playListRouter } from "./routes/playListRouter";
import { albumRouter } from "./routes/albumRouter";
import { albumTracksRouter } from "./routes/albumTracksRouter";
import { playListTracksRouter } from "./routes/playListTracksRouter";


export const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
  return res.json(JSON.stringify(APICONFIG));
});

app.use("/tracks", trackRouter);

app.use("/artists", artistRouter);

app.use("/users", userRouter);

app.use("/countryes", countryRouter);

app.use("/histoyes", historyRouter);

app.use("/playLists", playListRouter);

app.use("/albums", albumRouter);

app.use("/albumTracks", albumTracksRouter);

app.use("/playListTracks", playListTracksRouter);

