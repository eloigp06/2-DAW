import { userBDD } from "../User/userBDD"

export interface playListBDD{
    Id: string; //PK
    user: userBDD; //FK
    title: string;
}