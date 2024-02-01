import {Request, Response, NextFunction} from 'express'
import { rateLimit } from 'express-rate-limit'
export const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const registrationLimiter = rateLimit({
        windowMs: 10 * 1000, // 10 секунд
        limit: 5, // Максимальное количество запросов
        message: 'Too many requests from this IP, please try again later.',
    });

    return registrationLimiter
}