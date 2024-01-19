
import {Router} from "express";
import {
    authController, emailResendingController,
    registrationConfirmationController,
    registrationController
} from "../controllers/authController";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {loginValidationModelMiddleware} from "../validation/loginValidationModel";
import {
    authRegistrationConfirmationValidationMiddleware,
    authRegistrationValidationMiddleware
} from "../validation/authValidationModel";
export const authRouter = Router()

authRouter.post('/login', loginValidationModelMiddleware(), errorMiddleware, authController)
authRouter.post('/registration', authRegistrationValidationMiddleware, errorMiddleware, registrationController)
authRouter.post('/registration-confirmation', authRegistrationConfirmationValidationMiddleware(), errorMiddleware,  registrationConfirmationController)
authRouter.post('/registration-email-resending', authRegistrationConfirmationValidationMiddleware(), errorMiddleware,  emailResendingController)