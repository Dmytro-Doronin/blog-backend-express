"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessCounterMiddleware = exports.rateLimitMiddleware = void 0;
const dbCollections_1 = require("../db/dbCollections");
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
//         await dbRateLimitCollections.insertOne(document);
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
//
//
//         next()
//     } catch (e: any) {
//         throw new Error(e)
//     }
//
//
// }
const rateLimitMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const logEntry = {
        IP: req.ip,
        URL: req.originalUrl,
        date: new Date(),
    };
    try {
        yield dbCollections_1.dbRateLimitCollections.insertOne(logEntry);
    }
    catch (e) {
        throw new Error(e);
    }
    next();
});
exports.rateLimitMiddleware = rateLimitMiddleware;
const accessCounterMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const tenSecondsAgo = new Date(currentDate.getTime() - 10 * 1000);
    try {
        const count = yield dbCollections_1.dbRateLimitCollections.countDocuments({
            IP: req.ip,
            URL: req.originalUrl,
            date: { $gte: tenSecondsAgo },
        });
        if (count > 5) {
            res.sendStatus(429);
        }
    }
    catch (e) {
        throw new Error(e);
    }
    next();
});
exports.accessCounterMiddleware = accessCounterMiddleware;
