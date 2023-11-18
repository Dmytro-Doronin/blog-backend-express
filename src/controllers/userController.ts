import {Request, Response} from "express";
import {db} from "../db";
export const getAllUserController = (req: Request, res: Response) => {

    const usersInDb = db.users

    if (!usersInDb) {
        return res.status(404).json({message: 'Users not found'})
    }

    return res.status(200).json(usersInDb)
}