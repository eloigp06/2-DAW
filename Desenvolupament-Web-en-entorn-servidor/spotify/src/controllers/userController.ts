
import { errorService } from "../interfaces/error/errorSrvice";
import { successService } from "../interfaces/error/success.Service";
import { updateService } from "../interfaces/error/update.Service";
import { deleteService } from "../interfaces/error/delete.Service";
import { SelectSuccessService } from "../interfaces/error/Selectsuccess.Service";
import { Response, Request } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../Services/user.Service";
import { UserBD } from "../interfaces/User/userBD";
import { users } from "../data/user/user";

export function getAllUsersController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllUsers())
}

export function getUserByIdController(req: Request, res: Response): Response {
    const findsUser: UserBD | undefined = getUserById(req.params.id as string);
    if (!findsUser) {
        return res.status(404).json({ message: "Artist not found" })
    }
    return res.status(200).json(findsUser);
}

export function getPostUserController(req: Request, res: Response): Response {
    const result: successService<UserBD> | errorService = createUser(req.body);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    users.push((result as successService<UserBD>).data);
    return res.status(result.code).json(result);
}

export function getPutUserController(req: Request, res: Response): Response {
    const result: updateService<UserBD> | errorService = updateUser(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    const index: number = (result as updateService<UserBD>).index;
    users[index] = (result as updateService<UserBD>).data;
    return res.status(result.code).json(result);
}

export function getDeleteUserController(req: Request, res: Response): Response {
      const result: deleteService | errorService = deleteUser(req.params.id as string);
    
      if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
      }
    
      const index: number = (result as deleteService).index;
    
      users.splice(index, 1);
    
      return res.status(result.code).json(result);
}