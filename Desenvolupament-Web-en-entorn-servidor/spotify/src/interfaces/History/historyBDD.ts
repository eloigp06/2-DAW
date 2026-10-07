import { TrackBD } from "../track/trackBD"
import { userBDD } from "../User/userBDD"

export interface historyBDD {
    id: string; //PK
    user: userBDD; //FK
    track: TrackBD; //FK
    data: string;
}