
import { User } from "../interfaces/User/user";


export function isValidUser(user: User): boolean | string | undefined {

    if(!user){
        return false;
    }
    if (!user.country || !user.email) {
        return false
    }



}

