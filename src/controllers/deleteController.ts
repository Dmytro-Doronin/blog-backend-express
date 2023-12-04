import * as express from "express";
import {blogDB} from "../db/db";

export const removeAllDataController = (req: express.Request, res: express.Response) => {

    blogDB.blogs.length = 0
    blogDB.posts = []

    res.sendStatus(204)
    return
}