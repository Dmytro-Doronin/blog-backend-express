import {Request, Response, NextFunction} from 'express'
import { rateLimit } from 'express-rate-limit'
import {dbRateLimitCollections} from "../db/dbCollections";

export const accessCounterMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const currentDate = new Date();
    const tenSecondsAgo = new Date(currentDate.getTime() - 10 * 1000);

    console.log(req.baseUrl)
    console.log(req.ip)
    try {

        const document = {
            IP: req.ip!,
            URL: req.baseUrl,
            date: currentDate,
        };


        const filter = {
            IP: req.ip,
            URL: req.baseUrl,
            date: { $gte: tenSecondsAgo },
        };

        const count = await dbRateLimitCollections.countDocuments(filter);

        if (count >= 5) {
            res.sendStatus(429);
        }
        await dbRateLimitCollections.insertOne(document);

        next()
    } catch (e: any) {
        throw new Error(e)
    }


}