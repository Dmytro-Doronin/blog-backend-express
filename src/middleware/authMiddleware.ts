import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwtService";
import {userQuery} from "../repositories/queryRepositories/userQuery";

const login = 'admin'
const password = 'qwerty'

export const authMiddleware = async (req: Request, res:Response, next: NextFunction) => {

    // const auth = req.headers['authorization']
    //
    // if (!auth) {
    //     res.sendStatus(401)
    //     return
    // }
    //
    // const [basic, token] = auth.split(" ")
    //
    // if (basic !== 'Basic') {
    //     res.sendStatus(401)
    //     return
    // }
    //
    //
    // const decodedData = Buffer.from(token, "base64").toString()
    //
    // const [decodedLogin, decodedPassword] = decodedData.split(':')
    //
    // if (decodedLogin !== login || decodedPassword !== password) {
    //     res.sendStatus(401)
    //     return
    // }
    //
    // return next()

    if (!req.headers.authorization) {
        res.sendStatus(401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]

    const userId = await jwtService.getUserIdByToken(token)

    if(!userId) {
        res.send(401)
        return
    }

    req.user = await userQuery.findUserById(userId)
    next()

}