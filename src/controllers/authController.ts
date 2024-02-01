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
import {userMapper} from "../utils/mapper";
import {securityDevicesService} from "../services/securityDevices/securityDevices";


export const authController = async (req: RequestWithBody<LoginType>, res: Response) => {
    const {loginOrEmail, password} = req.body
    const ip = req.ip
    const title = req.headers['User-Agent']
    let title2

    if (typeof title !== "string" || typeof title !== undefined) {
        title2 = title?.[0]
    } else {
        title2 = title
    }

    const user = await usersService.checkCredentials(loginOrEmail, password)
    if (!user) {
        res.sendStatus(401)
        return
    }

    const accessToken = await jwtService.createJWTAccessToken(user)
    const refreshToken = await jwtService.createJWTRefreshToken(user)

    await securityDevicesService.createDevice(refreshToken, ip, title2)

    res.cookie('refreshToken', refreshToken, {httpOnly: true,secure: true})

    res.status(200).send(accessToken)
    return
    // const result = await userQuery.findUserByLoginOrEmail()
}

export const registrationController = async (req: RequestWithBody<UsersInputModelType>, res: Response) => {

    const {login, email, password} = req.body

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
    const userId = req.user.id
    const login = req.user.accountData.login
    const email = req.user.accountData.email

    res.status(200).send({email, login, userId})
    return
}

export const refreshTokenController = async (req: Request, res: Response) => {
    const refreshTokenFromRequest = req.cookies.refreshToken
    // const user = req.user
    const userId = req.userId
    const deviceId = req.deviceId
    const user = await userQuery.findUserById(userId)

    await jwtService.putTokenToTheBlackList(refreshTokenFromRequest)
    const accessToken = await jwtService.createJWTAccessToken(userMapper(user!))
    const refreshToken = await jwtService.createJWTRefreshToken(userMapper(user!), deviceId)

    const result = await securityDevicesService.changeDevicesData(refreshToken)

    if (!result) {
        res.sendStatus(404)
        return
    }

    res.cookie('refreshToken', refreshToken, {httpOnly: true,secure: true})
    res.status(200).send(accessToken)
    return
}

export const logoutController = async (req: Request, res: Response) => {
    const refreshTokenFromRequest = req.cookies.refreshToken

    const deviceId = req.deviceId

    await securityDevicesService.deleteDevice(deviceId)
    await jwtService.putTokenToTheBlackList(refreshTokenFromRequest)

    res.sendStatus(204)
    return
}