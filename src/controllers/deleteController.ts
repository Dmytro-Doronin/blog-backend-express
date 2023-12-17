import * as express from "express";
import {deleteAllDataMutation} from "../repositories/mutationRepositories/deleteAllData";

export const removeAllDataController = async (req: express.Request, res: express.Response) => {

    await deleteAllDataMutation.deleteAllDataFromDb()

    res.sendStatus(204)
    return
}