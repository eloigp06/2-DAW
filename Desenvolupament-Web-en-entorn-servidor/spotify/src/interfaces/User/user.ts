import { countryBD } from "../country/countryBD";

export interface User{
    country: countryBD; //FK
    email: string;
}