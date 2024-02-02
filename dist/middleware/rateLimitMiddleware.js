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
exports.accessCounterMiddleware = void 0;
const dbCollections_1 = require("../db/dbCollections");
const accessCounterMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const tenSecondsAgo = new Date(currentDate.getTime() - 10 * 1000);
    console.log(req.baseUrl);
    console.log(req.ip);
    try {
        const document = {
            IP: req.ip,
            URL: req.baseUrl,
            date: currentDate,
        };
        const filter = {
            IP: req.ip,
            URL: req.baseUrl,
            date: { $gte: tenSecondsAgo },
        };
        const count = yield dbCollections_1.dbRateLimitCollections.countDocuments(filter);
        if (count >= 5) {
            res.sendStatus(429);
        }
        yield dbCollections_1.dbRateLimitCollections.insertOne(document);
        next();
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.accessCounterMiddleware = accessCounterMiddleware;
