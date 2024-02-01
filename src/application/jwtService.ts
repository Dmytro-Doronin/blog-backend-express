import {userDBType, UserViewModel} from "../types/commonBlogTypeAndPosts.types";
import jwt from 'jsonwebtoken'
import {setting} from "../variables";
import {blackListMutation} from "../repositories/mutationRepositories/blackListMutation";
import {blackListQuery} from "../repositories/queryRepositories/blackListQuery";
const { v4: uuidv4 } = require('uuid');
export const jwtService = {
    async createJWTAccessToken (user: UserViewModel) {
       const token = jwt.sign({userId: user.id}, setting.JWT_SECRET, {expiresIn: '1h'})

        return {
            accessToken: token
        }
    },
    async createJWTRefreshToken (user: UserViewModel, deviceId: string = uuidv4()) {
        const currentDate = new Date()
        const currentDateStr = currentDate.toISOString()
        const refreshToken = jwt.sign({
            userId: user.id,
            lastActiveDate: currentDateStr,
            expireDate: new Date(currentDate.getTime() + 20 * 1000).toISOString(),
            deviceId: deviceId

        },setting.JWT_SECRET, {expiresIn: '1h'})

        return refreshToken

    },
    async getUserIdByToken (token: string) {
        
        try {
            const result: any = jwt.verify(token, setting.JWT_SECRET)
            return result.userId
        } catch (e) {
            return false
        }
    },

    async verifyToken (token: string) {
        try {
            const result: any = jwt.verify(token, setting.JWT_SECRET)
            return result
        } catch (e) {
            return false
        }
    },

    async isTokenBlacklisted (token: string) {
        const result = await blackListQuery.checkTokenInBlackList(token)

        if (!result) {
            return null
        }

        return true
    },

    async putTokenToTheBlackList (token: string) {
        await blackListMutation.putTokenInBlackList(token)
    },

}