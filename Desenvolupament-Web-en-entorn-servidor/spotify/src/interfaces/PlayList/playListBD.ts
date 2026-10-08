import { UserBD } from "../User/userBD"

export interface playListBD{
    id: string; //PK
    user: UserBD; //FK
    title: string;
}