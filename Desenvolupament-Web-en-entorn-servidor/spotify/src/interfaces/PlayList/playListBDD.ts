import { userBDD } from "../User/userBDD"

export interface playListBDD{
    id: string; //PK
    user: userBDD; //FK
    title: string;
}