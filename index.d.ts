import userDBType from './src/types/commonBlogTypeAndPosts.types'

export declare global {
    namespace Express {
        export interface Request {
            user: userDBType | null
            tokenData: {
                userId: string
                deviceId: string
            }

        }
    }
}