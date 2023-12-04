import {Router} from "express";
import {removeAllDataController} from "../controllers/deleteController";

export const deleteRouter = Router()

deleteRouter.delete('/', removeAllDataController)