import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { tracks } from "./data/track/track";
import { Track } from "./interfaces/track/track";

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

  const track: Track[] = tracks.filter(
    (t: Track) => { return t.id === idTrack }
  );
  if (track.length === 0) {
    return res.status(404).json({ message: `Track ${idTrack} not found` })
  }
  return res.status(200).json(track);
});

/** Posibles gets
 * 
 * 
 * saber totes les llistes de reproducció d'un usuari
 * 
 * /usuari/id:/playlist
 * Les últimes cançons que ha escoltat 
 * 
 * /usuari/:id/historial/latest
 * 
 * Les últimes cançons afegides a l'aplicació
 * 
 * /songs/uploaded/latest
 * 
 * Totels les cançons d'una playlist d'un usuari
 * 
 * /users/:id/playlist/idplayList/songs
 * 
 * El meu perfil
 * 
 * /usauris/:id/profile
 * 
 * El perfil d'un altre usuari
 * 
 * /usauris/:id/profile
 * 
 * Música més reproduïda 
 * 
 * /songs/popular
 * 
 * més reproduïda d'un artista
 * 
 * /artist/:id/songs/popular
 */

app.post("/tracks", (req: Request, res: Response) => {
  return res.status(201).json(req.body);

});

app.listen(APICONFIG.port, APICONFIG.host, () => {
  console.log(`Servidor escoltant a http://${APICONFIG.host}:${APICONFIG.port}`);
})