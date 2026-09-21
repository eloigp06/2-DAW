import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { tracks } from "./data/track/track";

const app: Express = express();

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
  return res.json(JSON.stringify(APICONFIG));
});

app.get("/tracks", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
  return res.status(200).json(tracks);
});

app.listen(APICONFIG.port, APICONFIG.host, () => {
  console.log(`Servidor escoltant a http://${APICONFIG.host}:${APICONFIG.port}`);
})