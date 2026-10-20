import { randomUUID } from "crypto";
import { ErrorService } from "../interfaces/error/errorSrvice";
import { User } from "../interfaces/User/user";
import { UserBD } from "../interfaces/User/userBD";
import { users } from "../data/user/user";
import { SuccessService } from "../interfaces/error/success.Service";
import { UpdateService } from "../interfaces/error/update.Service";
import { DeleteService } from "../interfaces/error/delete.Service";
import { isValidUser } from "../validators/user.validator";
import { getConnection } from "../config/database";
import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";


export async function getAllUsers(): Promise<UserBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `Select * from User`;
    const result: IResult<UserBD> = await request.query(queryText);

    return result.recordset;
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