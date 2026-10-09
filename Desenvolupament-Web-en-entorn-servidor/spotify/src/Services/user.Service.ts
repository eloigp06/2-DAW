import { randomUUID } from "crypto";
import { ErrorService } from "../interfaces/error/errorSrvice";
import { User } from "../interfaces/User/user";
import { UserBD } from "../interfaces/User/userBD";
import { users } from "../data/user/user";
import { SuccessService } from "./success.Service";
import { UpdateService } from "./update.Service";
import { DeleteService } from "./delete.Service";
import { isValidUser } from "../validators/user.validator";


export function getAllUsers(): UserBD[] {
    return users;
}

export function getUserById(idUser: string): UserBD | undefined {

    return users.find((u: UserBD) => { return u.id === idUser });
}

export function createUser(user: User): SuccessService<UserBD> | ErrorService {


    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const idUser: string = randomUUID()
    const UserRecord: UserBD = {
        id: idUser,
        country: user.country.trim().replace(/\s+/g, " "),
        email: user.email.trim().replace(/\s+/g, " "),

    };

    return { success: true, code: 201, data: UserRecord };


}

export function updateUser(user: User, idUser: string): UpdateService<UserBD> | ErrorService {
    const index: number = users.findIndex((user: UserBD) => user.id === idUser);

    if (index === -1) {
        return { success: false, code: 404, message: "Country not found" };
    }

    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const updateUser: UserBD = {
        id: idUser,
        country: user.country.replace(/\s+/g, " "),
        email: user.email.trim().replace(/\s+/g, " "),
    };

    return { success: true, code: 200, index: index, data: updateUser }

}

export function deleteUser(idUser: string): DeleteService | ErrorService {
    const index: number = users.findIndex((user: UserBD) => user.id === idUser);

    if (index === -1) {
        return { success: false, code: 404, message: " User not found " }
    }

    return { success: true, code: 404, index: index }

}