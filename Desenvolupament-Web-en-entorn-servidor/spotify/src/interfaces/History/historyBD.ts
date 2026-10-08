import { TrackBD } from "../track/trackBD"
import { userBD } from "../User/userBD"

export interface historyBD {
    id: string; //PK
    user: userBD; //FK
    track: TrackBD; //FK
    data: string;
}