import { countryBD } from "../country/countryBD";

export interface User{
    country: string; //FK
    email: string;
}