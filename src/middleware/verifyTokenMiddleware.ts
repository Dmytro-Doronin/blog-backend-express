import {Request, Response, NextFunction} from 'express'
import {jwtService} from "../application/jwtService";

export const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const refreshTokenFromCookie = req.cookies.refreshToken

    if (!refreshTokenFromCookie) {
        res.sendStatus(401)
        return
    }

    const decodedToken = await jwtService.verifyToken(refreshTokenFromCookie)

    if (!decodedToken) {
        res.sendStatus(401)
        return
    }

    const tokenInBlackList = await jwtService.isTokenBlacklisted(refreshTokenFromCookie)

    if (tokenInBlackList) {
        res.sendStatus(401)
        return
    }

    req.userId = decodedToken.userId
    return next()

}