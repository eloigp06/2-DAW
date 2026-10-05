import { countryBDD } from "../Country/countryBDD"

export interface userBDD{
    Id: string; //PK
    countryBDD: countryBDD; //FK
    email: string;
}