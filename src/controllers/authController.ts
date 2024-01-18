import {
    LoginType,
    RegistrationConfirmationInputType, RegistrationEmailResending,
    RequestWithBody,
    UsersInputModelType
} from "../types/commonBlogTypeAndPosts.types";
import {Response} from "express";
import {usersService} from "../services/users/usersService";
import {jwtService} from "../application/jwtService";
import {authService} from "../services/auth/authService";

export const authController = async (req: RequestWithBody<LoginType>, res: Response) => {
    const {loginOrEmail, password} = req.body
    const user = await usersService.checkCredentials(loginOrEmail, password)
    if (!user) {
        res.sendStatus(401)
        return
    }

    const token = await jwtService.createJWT(user)

    res.status(200).send(token)
    return
    // const result = await userQuery.findUserByLoginOrEmail()
}

export const registrationController = async (req: RequestWithBody<UsersInputModelType>, res: Response) => {
    const {login, email, password} = req.body

    const checkUser = await authService.checkAuthCredentials(login, password)

    if (checkUser) {
        res.sendStatus(400)
        return
    }


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
}

export const registrationEmailResendingController = async (req: RequestWithBody<RegistrationEmailResending>, res: Response) => {
    const {email} = req.body

    const result = await authService.confirmEmail(email)

    // const confirm = await authService.confirmEmail(code)
    //
    // if (!confirm) {
    //     res.sendStatus(400)
    //     return
    // }
    //
    // res.sendStatus(204)
}