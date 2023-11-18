import {Router} from 'express'
import {getAllUserController} from "../controllers/userController";

export const router = Router()

router.get('/users', getAllUserController)

