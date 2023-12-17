import * as express from "express";
import {deleteAllDataUtil} from "../repositories/deleteAllData";

export const removeAllDataController = async (req: express.Request, res: express.Response) => {

    await deleteAllDataUtil.deleteAllData()

    res.sendStatus(204)
    return
}