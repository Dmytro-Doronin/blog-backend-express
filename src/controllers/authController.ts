import {
    AuthEmail,
    LoginType, NewPasswordType,
    RegistrationConfirmationInputType,
    RequestWithBody,
    UsersInputModelType
} from "../types/commonBlogTypeAndPosts.types";
import {Request,Response} from "express";
import {jwtService} from "../application/jwtService";
import {AuthService} from "../services/auth/authService";
import {userQuery} from "../repositories/queryRepositories/userQuery";
import {userMapper} from "../utils/mapper";
import {securityDevicesService} from "../services/securityDevices/securityDevices";
import {inject, injectable} from "inversify";

@injectable()
export class AuthController {

    constructor(@inject(AuthService) protected authService: AuthService) {}

    async authController  (req: RequestWithBody<LoginType>, res: Response) {
        const {loginOrEmail, password} = req.body
        const ip = req.ip
        const title = req.headers['User-Agent']
        let title2

        if (typeof title !== "string" || typeof title !== undefined) {
            title2 = title?.[0]
        } else {
            title2 = title
        }

        const user = await this.authService.checkAuthCredentials(loginOrEmail, password)
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

    async registrationController  (req: RequestWithBody<UsersInputModelType>, res: Response) {

        const {login, email, password} = req.body

        await this.authService.createUser({login, email, password})

        res.sendStatus(204)
        return
    }

    async registrationConfirmationController (req: RequestWithBody<RegistrationConfirmationInputType>, res: Response) {
        const {code} = req.body

        const confirm = await this.authService.confirmEmail(code)

        if (!confirm) {
            res.sendStatus(400)
            return
        }

        res.sendStatus(204)
        return
    }

    async newPasswordController (req: RequestWithBody<NewPasswordType>, res: Response) {
        const {recoveryCode, newPassword} = req.body

        // const confirm = await authService.confirmEmail(code)

        const result = await this.authService.newPassword(recoveryCode, newPassword)

        if (!result) {
            res.sendStatus(400)
            return
        }

        res.sendStatus(204)
        return
    }

    async emailResendingController  (req: RequestWithBody<AuthEmail>, res: Response) {
        const {email} = req.body


        const result = await this.authService.resendEmail(email)

        if (!result) {
            res.sendStatus(400)
            return
        }

        res.sendStatus(204);
        return
    }

    async passwordRecoveryController  (req: RequestWithBody<AuthEmail>, res: Response) {
        const {email} = req.body


        const result = await this.authService.recoveryPassword(email)

        if (!result) {
            res.sendStatus(400)
            return
        }

        res.sendStatus(204);
        return
    }

    async meController (req: Request, res: Response) {
        const userId = req.user.id
        const login = req.user.accountData.login
        const email = req.user.accountData.email

        res.status(200).send({email, login, userId})
        return
    }

    async refreshTokenController  (req: Request, res: Response) {
        const userId = req.userId
        const deviceId = req.deviceId

        const user = await userQuery.findUserById(userId)
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

    async logoutController  (req: Request, res: Response) {
        const refreshTokenFromRequest = req.cookies.refreshToken

        const deviceId = req.deviceId

        await securityDevicesService.deleteDevice(deviceId)
        // await jwtService.putTokenToTheBlackList(refreshTokenFromRequest)

        res.sendStatus(204)
        return
    }
}
