import {userDBType, UserViewModel} from "../types/commonBlogTypeAndPosts.types";
import jwt from 'jsonwebtoken'
import {setting} from "../variables";

export const jwtService = {
    async createJWTAccessToken (user: UserViewModel) {
       const token = jwt.sign({userId: user.id}, setting.JWT_SECRET, {expiresIn: '10s'})

        return {
            accessToken: token
        }
    },
    async createJWTRefreshToken (user: UserViewModel) {
        const token = jwt.sign({userId: user.id}, setting.JWT_SECRET, {expiresIn: '20s'})

        return token

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
    }
}