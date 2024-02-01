import {Request, Response, NextFunction} from 'express'
import { rateLimit } from 'express-rate-limit'
import {dbRateLimitCollections} from "../db/dbCollections";
export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const logEntry = {
        IP: req.ip!,
        URL: req.originalUrl,
        date: new Date(),
    }
    
    try {
        await dbRateLimitCollections.insertOne(logEntry)
    } catch (e: any) {
        throw new Error(e)
    }

    next()
}

export const accessCounterMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const currentDate = new Date();
    const tenSecondsAgo = new Date(currentDate.getTime() - 10 * 1000);

    try {
        const count = await dbRateLimitCollections.countDocuments({
            IP: req.ip,
            URL: req.originalUrl,
            date: { $gte: tenSecondsAgo },
        })

        if (count > 5) {
            res.sendStatus(429)

        }

    } catch (e: any) {
        throw new Error(e)
    }

    next()
}