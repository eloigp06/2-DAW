import { countryBD } from "../country/countryBD"

export interface userBD{
    id: string; //PK
    countryBD: countryBD; //FK
    email: string;
}