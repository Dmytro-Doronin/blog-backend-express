
import {Router} from "express";
import {
    authController,
    emailResendingController,
    logoutController,
    meController, newPasswordController, passwordRecoveryController,
    refreshTokenController,
    registrationConfirmationController,
    registrationController
} from "../controllers/authController";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {loginValidationModelMiddleware} from "../validation/loginValidationModel";
import {
    authEmailResendingValidationMiddleware, authPasswordRecovery,
    authRegistrationConfirmationValidationMiddleware,
    authRegistrationValidationMiddleware, newPassword, newPasswordMiddleware,
} from "../validation/authValidationModel";
import {authMiddlewareWithBearer} from "../middleware/authMiddlewareWithBearer";
import {verifyTokenMiddleware} from "../middleware/verifyTokenMiddleware";
import {accessCounterMiddleware} from "../middleware/rateLimitMiddleware";

export const authRouter = Router()

// export const registrationLimiter = rateLimit({
//     windowMs: 10 * 1000,
//     limit: 5,
//     message: 'Too many requests from this IP, please try again later.',
// });

authRouter.get('/me', authMiddlewareWithBearer, meController)
authRouter.post('/login', accessCounterMiddleware , loginValidationModelMiddleware(), errorMiddleware, authController)
authRouter.post('/logout',verifyTokenMiddleware, logoutController)
authRouter.post('/new-password', accessCounterMiddleware, newPasswordMiddleware(), errorMiddleware,  newPasswordController)
authRouter.post('/refresh-token', verifyTokenMiddleware, refreshTokenController)
authRouter.post('/password-recovery', accessCounterMiddleware, authPasswordRecovery(), errorMiddleware,  passwordRecoveryController )
authRouter.post('/registration', accessCounterMiddleware , authRegistrationValidationMiddleware(),  errorMiddleware, registrationController)
authRouter.post('/registration-confirmation', accessCounterMiddleware , authRegistrationConfirmationValidationMiddleware(),  errorMiddleware,  registrationConfirmationController)
authRouter.post('/registration-email-resending', accessCounterMiddleware , authEmailResendingValidationMiddleware(),  errorMiddleware,  emailResendingController)