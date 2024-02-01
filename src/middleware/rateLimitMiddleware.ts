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
        // const count = await dbRateLimitCollections.countDocuments({
        //     IP: req.ip!,
        //     URL: req.originalUrl,
        //     date: { $lt: currentDate, $gte: tenSecondsAgo },
        // })
        //
        // if (count > 5) {
        //     res.sendStatus(429)
        // }
        const document = {
            IP: req.ip!,
            URL: req.baseUrl,
            date: new Date(),
        };
        await dbRateLimitCollections.insertOne(document);
        const filter = {
            IP: req.ip, // Предполагается, что IP сохраняется в req.ip
            URL: req.baseUrl, // Используйте базовый URL или оригинальный URL запроса
            date: { $gte: tenSecondsAgo }, // date >= текущей даты - 10 сек
        };

        // Подсчет документов, удовлетворяющих фильтру
        const count = await dbRateLimitCollections.countDocuments(filter);

        // Проверка на количество запросов за 10 секунд
        if (count >= 5) {
            await dbRateLimitCollections.deleteMany({IP: req.ip})
            res.sendStatus(429);
        }

        // Вставка нового документа в коллекцию
        next()
    } catch (e: any) {
        throw new Error(e)
    }


}