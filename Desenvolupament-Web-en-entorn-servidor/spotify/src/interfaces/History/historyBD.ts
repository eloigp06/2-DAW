import { TrackBD } from "../track/trackBD"
import { UserBD } from "../User/userBD"

export interface historyBD {
    id: string; //PK
    user: UserBD; //FK
    track: TrackBD; //FK
    data: string;
}