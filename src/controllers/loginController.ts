import {LoginType, RequestWithBody} from "../types/commonBlogTypeAndPosts.types";
import {Response} from "express";
import {usersService} from "../services/users/usersService";
import {jwtService} from "../application/jwtService";

export const loginController = async (req: RequestWithBody<LoginType>, res: Response) => {
    const {loginOrEmail, password} = req.body
    const user = await usersService.checkCredentials(loginOrEmail, password)
    if (!user) {
        res.sendStatus(401)
        console.log('net usera')
        return
    }

    const token = await jwtService.createJWT(user)

    res.status(200).send(token)
    return
    // const result = await userQuery.findUserByLoginOrEmail()
}