import {Request, Response, NextFunction} from 'express'
import {jwtService} from "../application/jwtService";
import {deviceQuery} from "../repositories/queryRepositories/deviceQuery";

export const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const refreshTokenFromCookie = req.cookies.refreshToken

    if (!refreshTokenFromCookie) {
        res.sendStatus(401)
        return
    }

    const decodedToken = await jwtService.verifyToken(refreshTokenFromCookie)
    console.log(decodedToken)
    if (!decodedToken) {
        res.sendStatus(401)
        return
    }
    // const result = await deviceQuery.getDeviceByActiveDataAndUserId(decodedToken.lastActiveDate, decodedToken.deviceId)
    //
    // if (result === false) {
    //     res.sendStatus(401)
    //     return
    // }
    const tokenInBlackList = await jwtService.isTokenBlacklisted(refreshTokenFromCookie)

    if (tokenInBlackList) {
        res.sendStatus(401)
        return
    }

    req.userId = decodedToken.userId
    req.deviceId = decodedToken.deviceId
    debugger
    return next()

}