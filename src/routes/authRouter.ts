
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
import {rateLimit} from "express-rate-limit";

export const authRouter = Router()

export const registrationLimiter = rateLimit({
    windowMs: 10 * 1000,
    limit: 5,
    message: 'Too many requests from this IP, please try again later.',
});

authRouter.get('/me', authMiddlewareWithBearer, meController)
authRouter.post('/login', registrationLimiter, loginValidationModelMiddleware(), errorMiddleware, authController)
authRouter.post('/logout',verifyTokenMiddleware, logoutController)
authRouter.post('/refresh-token', verifyTokenMiddleware, refreshTokenController)
authRouter.post('/registration', registrationLimiter, authRegistrationValidationMiddleware(),  errorMiddleware, registrationController)
authRouter.post('/registration-confirmation', registrationLimiter, authRegistrationConfirmationValidationMiddleware(),  errorMiddleware,  registrationConfirmationController)
authRouter.post('/registration-email-resending', registrationLimiter, authEmailResendingValidationMiddleware(),  errorMiddleware,  emailResendingController)