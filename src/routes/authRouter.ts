
import {Router} from "express";
import {
    authController, emailResendingController, logoutController, meController, refreshTokenController,
    registrationConfirmationController,
    registrationController
} from "../controllers/authController";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {loginValidationModelMiddleware} from "../validation/loginValidationModel";
import {
    authEmailResendingValidationMiddleware,
    authRegistrationConfirmationValidationMiddleware,
    authRegistrationValidationMiddleware
} from "../validation/authValidationModel";
import {authMiddlewareWithBearer} from "../middleware/authMiddlewareWithBearer";
import {verifyTokenMiddleware} from "../middleware/verifyTokenMiddleware";
import {rateLimitMiddleware} from "../middleware/rateLimitMiddleware";
export const authRouter = Router()

authRouter.get('/me', authMiddlewareWithBearer, meController)
authRouter.post('/login', loginValidationModelMiddleware(),rateLimitMiddleware, errorMiddleware, authController)
authRouter.post('/logout',verifyTokenMiddleware, logoutController)
authRouter.post('/refresh-token',verifyTokenMiddleware, refreshTokenController)
authRouter.post('/registration', authRegistrationValidationMiddleware(), rateLimitMiddleware, errorMiddleware, registrationController)
authRouter.post('/registration-confirmation', authRegistrationConfirmationValidationMiddleware(), rateLimitMiddleware, errorMiddleware,  registrationConfirmationController)
authRouter.post('/registration-email-resending', authEmailResendingValidationMiddleware(), rateLimitMiddleware, errorMiddleware,  emailResendingController)