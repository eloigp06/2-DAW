
import { ErrorService } from "../interfaces/error/errorSrvice";
import { DeleteService } from "../Services/delete.Service";
import { SuccessService } from "../Services/success.Service";
import { UpdateService } from "../Services/update.Service";
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
    const result: SuccessService<UserBD> | ErrorService = createUser(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    users.push((result as SuccessService<UserBD>).data);
    return res.status(result.code).json(result);
}

export function getPutUserController(req: Request, res: Response): Response {
    const result: UpdateService<UserBD> | ErrorService = updateUser(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    const index: number = (result as UpdateService<UserBD>).index;
    users[index] = (result as UpdateService<UserBD>).data;
    return res.status(result.code).json(result);
}

export function getDeleteUserController(req: Request, res: Response): Response {
      const result: DeleteService | ErrorService = deleteUser(req.params.id as string);
    
      if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
      }
    
      const index: number = (result as DeleteService).index;
    
      users.splice(index, 1);
    
      return res.status(result.code).json(result);
}