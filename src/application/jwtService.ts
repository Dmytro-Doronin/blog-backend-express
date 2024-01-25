import {userDBType, UserViewModel} from "../types/commonBlogTypeAndPosts.types";
import jwt from 'jsonwebtoken'
import {setting} from "../variables";
import {blackListMutation} from "../repositories/mutationRepositories/blackListMutation";
import {blackListQuery} from "../repositories/queryRepositories/blackListQuery";

export const jwtService = {
    async createJWTAccessToken (user: UserViewModel) {
       const token = jwt.sign({userId: user.id}, setting.JWT_SECRET, {expiresIn: '10s'})

        return {
            accessToken: token
        }
    },
    async createJWTRefreshToken (user: UserViewModel) {
        const refreshToken = jwt.sign({userId: user.id}, setting.JWT_SECRET, {expiresIn: '20s'})

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
            await blackListMutation.putTokenInBlackList(token)
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
    }
}