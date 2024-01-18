import {userDBType, UserViewModel} from "../types/commonBlogTypeAndPosts.types";
import jwt from 'jsonwebtoken'
import {setting} from "../variables";

export const jwtService = {
    async createJWT (user: UserViewModel) {
       const token = jwt.sign({userId: user.id}, setting.JWT_SECRET, {expiresIn: '1h'})

        return {
            accessToken: token
        }
    },

    async getUserIdByToken (token: string) {
        
        try {
            const result: any = jwt.verify(token, setting.JWT_SECRET)
            return result.userId
        } catch (e) {
            return null
        }
    }
}