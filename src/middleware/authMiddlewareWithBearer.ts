import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwtService";
import {userQuery} from "../repositories/queryRepositories/userQuery";

const login = 'admin'
const password = 'qwerty'

export const authMiddlewareWithBearer = async (req: Request, res:Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.sendStatus(401)
        return
    }
    if (req.headers.authorization.split( ' ')[0] !== 'Bearer') {
        res.sendStatus(401)
        return
    }
    const token = req.headers.authorization.split(' ')[1]

    const userId = await jwtService.getUserIdByToken(token)

    if(!userId) {
        res.sendStatus(401)
        return
    }
    req.user = await userQuery.findUserById(userId)
    next()

}