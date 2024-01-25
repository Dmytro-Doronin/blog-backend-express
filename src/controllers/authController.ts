import {
    LoginType,
    RegistrationConfirmationInputType, RegistrationEmailResending,
    RequestWithBody,
    UsersInputModelType
} from "../types/commonBlogTypeAndPosts.types";
import {Request,Response} from "express";
import {usersService} from "../services/users/usersService";
import {jwtService} from "../application/jwtService";
import {authService} from "../services/auth/authService";
import {userQuery} from "../repositories/queryRepositories/userQuery";
import {cookie} from "express-validator";
import {userMapper} from "../utils/maper";

export const authController = async (req: RequestWithBody<LoginType>, res: Response) => {
    const {loginOrEmail, password} = req.body
    const user = await usersService.checkCredentials(loginOrEmail, password)
    if (!user) {
        res.sendStatus(401)
        return
    }

    const accessToken = await jwtService.createJWTAccessToken(user)
    const refreshToken = await jwtService.createJWTRefreshToken(user)

    res.cookie('refreshToken', refreshToken, {httpOnly: true,secure: true})

    res.status(200).send(accessToken)
    return
    // const result = await userQuery.findUserByLoginOrEmail()
}

export const registrationController = async (req: RequestWithBody<UsersInputModelType>, res: Response) => {

    const {login, email, password} = req.body

    // const checkUserEmail = await authService.checkAuthCredentials(email, password)
    // const checkUserLogin = await authService.checkAuthCredentials(login, password)
    //
    //
    // if (checkUserEmail || checkUserLogin) {
    //     res.sendStatus(400)
    //     return
    // }

    await authService.createUser({login, email, password})

    res.sendStatus(204)
    return

}

export const registrationConfirmationController = async (req: RequestWithBody<RegistrationConfirmationInputType>, res: Response) => {
    const {code} = req.body

    const confirm = await authService.confirmEmail(code)

    if (!confirm) {
        res.sendStatus(400)
        return
    }

    res.sendStatus(204)
    return
}

export const emailResendingController = async (req: RequestWithBody<RegistrationEmailResending>, res: Response) => {
    const {email} = req.body

    const result = await authService.resendEmail(email)

    if (!result) {
        res.sendStatus(400)
        return
    }

    res.sendStatus(204)
    return
}

export const meController = async (req: Request, res: Response)=> {
    const refreshTokenFromRequest = req.cookies.refreshToken
    const userId = req.user.id
    const login = req.user.accountData.login
    const email = req.user.accountData.email

    if (!refreshTokenFromRequest) {
        res.sendStatus(401)
        return
    }

    // const decodedToken = await jwtService.verifyToken(refreshTokenFromRequest)
    //
    // if (!decodedToken) {
    //     res.sendStatus(401)
    //     return
    // }
    //
    // const tokenInBlackList = await jwtService.isTokenBlacklisted(refreshTokenFromRequest)
    //
    // if (tokenInBlackList) {
    //     res.sendStatus(401)
    //     return
    // }

    res.status(200).send({email, login, userId})
    return
}

export const refreshTokenController = async (req: Request, res: Response) => {
    const refreshTokenFromRequest = req.cookies.refreshToken
    // const user = req.user
    const userId = req.userId
    const user = await userQuery.findUserById(userId)
    // if (!refreshTokenFromRequest) {
    //     res.sendStatus(401)
    //     return
    // }
    //
    // const decodedToken = await jwtService.verifyToken(refreshTokenFromRequest)
    //
    // if (!decodedToken) {
    //     res.sendStatus(401)
    //     return
    // }
    //
    // const tokenInBlackList = await jwtService.isTokenBlacklisted(refreshTokenFromRequest)
    //
    // if (tokenInBlackList) {
    //     res.sendStatus(401)
    //     return
    // }
    await jwtService.putTokenToTheBlackList(refreshTokenFromRequest)
    const accessToken = await jwtService.createJWTAccessToken(userMapper(user!))
    const refreshToken = await jwtService.createJWTRefreshToken(userMapper(user!))

    res.cookie('refreshToken', refreshToken, {httpOnly: true,secure: true})
    res.status(200).send(accessToken)
    return
}

export const logoutController = async (req: Request, res: Response) => {
    const refreshTokenFromRequest = req.cookies.refreshToken

    // if (!refreshTokenFromRequest) {
    //     res.sendStatus(401)
    //     return
    // }
    //
    // const decodedToken = await jwtService.verifyToken(refreshTokenFromRequest)
    //
    // if (!decodedToken) {
    //     res.sendStatus(401)
    //     return
    // }

    await jwtService.putTokenToTheBlackList(refreshTokenFromRequest)

    res.sendStatus(204)
    return
}