import { randomUUID } from "crypto";
import { errorService } from "../interfaces/error/errorSrvice";
import { User } from "../interfaces/User/user";
import { UserBD } from "../interfaces/User/userBD";
import { users } from "../data/user/user";
import { successService } from "../interfaces/error/success.Service";
import { updateService } from "../interfaces/error/update.Service";
import { deleteService } from "../interfaces/error/delete.Service";
import { isValidUser } from "../validators/user.validator";
import { getConnection } from "../config/database";
import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { createSuccessService } from "../interfaces/error/CreateSuccess.Service";


export async function getAllUsers(): Promise<UserBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `Select * from User`;
    const result: IResult<UserBD> = await request.query(queryText);

    return result.recordset;
}
export async function getUserById(idUser: string): Promise<successService<UserBD> | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `Select * from User Where User.id = @id`;

    request.input("id", sql.UniqueIdentifier, idUser);
    const result: IResult<UserBD> = await request.query(queryText);
    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found"
        }
    }
    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    }
}

export async function createUser(user: User): Promise<createSuccessService | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO USER(id,country,email)
    VALUES(@id,@country,@email)`;

    request.input("country", sql.UniqueIdentifier, user.country);
    request.input("email", sql.NVarChar, user.email);

    const result: IResult<number> = await request.query(queryText);

    return { success: true, code: 201, data: result.rowsAffected[0] };

}

export async function updateUser(user: User, idUser: string): Promise<updateService<UserBD> | errorService> {
    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "Invalid data" };
    };

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `UPDATE USER SET
    country=@country,email=@email 
    where user.id=@id`;

    request.input("country", sql.NVarChar, user.country);
    request.input("email", sql.UniqueIdentifier, user.email);
    request.input("id", sql.UniqueIdentifier, idUser);


    const result: IResult<number> = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "User not found"
        }
    }

    return { success: true, code: 200, data: result.rowsAffected[0] };

}

export async function deleteUser(idUser: string): Promise<deleteService | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `DElete from User Where User.id = @id`;
    request.input("id", sql.UniqueIdentifier, idUser);
    const result: IResult<UserBD> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "User not found"
        }
    }
    return {
        success: true,
        code: 204
    }

}