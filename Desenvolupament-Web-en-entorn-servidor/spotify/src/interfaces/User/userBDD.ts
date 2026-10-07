import { countryBDD } from "../country/countryBDD"

export interface userBDD{
    id: string; //PK
    countryBDD: countryBDD; //FK
    email: string;
}