import {Request, Response, NextFunction} from 'express'
import { rateLimit } from 'express-rate-limit'
import {dbRateLimitCollections} from "../db/dbCollections";

// export const accessCounterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//
//     const currentDate = new Date();
//     const tenSecondsAgo = new Date(currentDate.getTime() - 10 * 1000);
//
//     console.log(req.baseUrl)
//     console.log(req.ip)
//     try {
//
//         const document = {
//             IP: req.ip!,
//             URL: req.baseUrl,
//             date: currentDate,
//         };
//
//
//         const filter = {
//             IP: req.ip,
//             URL: req.baseUrl,
//             date: { $gte: tenSecondsAgo },
//         };
//
//         const count = await dbRateLimitCollections.countDocuments(filter);
//
//         if (count >= 5) {
//             res.sendStatus(429);
//         }
//         await dbRateLimitCollections.insertOne(document);
//
//         next()
//     } catch (e: any) {
//         throw new Error(e)
//     }
//
//
// }


export const accessCounterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentDate = new Date();
        const tenSecondsAgo = new Date(currentDate.getTime() - 10 * 1000);

        const clientIP = req.ip

        const document = {
            IP: clientIP,
            URL: req.originalUrl,
            date: currentDate,
        };


        const filter = {
            IP: clientIP,
            URL: req.originalUrl,
            date: { $gte: tenSecondsAgo },
        };


        const count = await dbRateLimitCollections.countDocuments(filter);


        if (count >= 5) {
            res.sendStatus(429);
        } else {
            await dbRateLimitCollections.insertOne(document);
            next();
        }

    } catch (error) {
        console.error('Error in accessCounterMiddleware:', error);
        res.sendStatus(500);
    }
};


// export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//     const logEntry = {
//         IP: req.ip!,
//         URL: req.originalUrl,
//         date: new Date(),
//     }
//
//     try {
//         await dbRateLimitCollections.insertOne(logEntry)
//     } catch (e: any) {
//         throw new Error(e)
//     }
//
//     next()
// }
//
// export const accessCounterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//
//     const currentDate = new Date();
//     const tenSecondsAgo = new Date(currentDate.getTime() - 10 * 1000);
//
//     try {
//         const count = await dbRateLimitCollections.countDocuments({
//             IP: req.ip,
//             URL: req.originalUrl,
//             date: { $gte: tenSecondsAgo },
//         })
//
//         if (count > 5) {
//             res.sendStatus(429)
//         }
//
//     } catch (e: any) {
//         throw new Error(e)
//     }
//
//     next()
// }