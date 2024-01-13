import {
    ParamsType,
    RequestWithBody, RequestWithParams, RequestWithQuery,
    ResponseWithData,
    UsersInputModelType, UsersOutputModelType,
    UserViewModel
} from "../types/commonBlogTypeAndPosts.types";
import {usersService} from "../services/users/usersService";
import {UsersQueryInputModel} from "../types/users/queryUsers.types";
import {userQuery} from "../repositories/queryRepositories/userQuery";
import {Response} from "express";

export const createUserController = async (req: RequestWithBody<UsersInputModelType>, res: ResponseWithData<UserViewModel>) => {
    const {login, email, password} = req.body

    const user = await usersService.createUser({login, password, email})

    if (!user) {
        return res.sendStatus(400)
    }

    return res.status(201).send(user)
}

export const getAllUsersController = async (req: RequestWithQuery<UsersQueryInputModel>, res: ResponseWithData<UsersOutputModelType>) => {
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
        searchLoginTerm: req.query.searchLoginTerm,
        searchEmailTerm: req.query.searchEmailTerm
    }

    const users = await userQuery.getAllUsers(sortData)

    return res.status(200).send(users)
}

export const deleteUserByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {
    const result = await usersService.deleteUserById(req.params.id)

    if (result === null) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204)
}
