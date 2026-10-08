import { userBD } from "../User/userBD"

export interface playListBD{
    id: string; //PK
    user: userBD; //FK
    title: string;
}