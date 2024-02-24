
import {Router} from "express";
import { AuthController } from "../controllers/authController";
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
import {container} from "../compositionRoot";

export const authRouter = Router()


const authControllerInstance = container.resolve(AuthController)

authRouter.get(
    '/me',
    authMiddlewareWithBearer,
    authControllerInstance.meController.bind(authControllerInstance)
)
authRouter.post(
    '/login',
    accessCounterMiddleware ,
    loginValidationModelMiddleware(),
    errorMiddleware,
    authControllerInstance.authController.bind(authControllerInstance)
)
authRouter.post(
    '/logout',
    verifyTokenMiddleware,
    authControllerInstance.logoutController.bind(authControllerInstance)
)
authRouter.post(
    '/new-password',
    accessCounterMiddleware,
    newPasswordMiddleware(),
    errorMiddleware,
    authControllerInstance.newPasswordController.bind(authControllerInstance)
)
authRouter.post(
    '/refresh-token',
    verifyTokenMiddleware,
    authControllerInstance.refreshTokenController.bind(authControllerInstance)
)
authRouter.post(
    '/password-recovery',
    accessCounterMiddleware,
    authPasswordRecovery(),
    errorMiddleware,
    authControllerInstance.passwordRecoveryController.bind(authControllerInstance)
)
authRouter.post(
    '/registration',
    accessCounterMiddleware ,
    authRegistrationValidationMiddleware(),
    errorMiddleware,
    authControllerInstance.registrationController.bind(authControllerInstance)
)
authRouter.post(
    '/registration-confirmation',
    accessCounterMiddleware ,
    authRegistrationConfirmationValidationMiddleware(),
    errorMiddleware,
    authControllerInstance.registrationConfirmationController.bind(authControllerInstance)
)
authRouter.post(
    '/registration-email-resending',
    accessCounterMiddleware ,
    authEmailResendingValidationMiddleware(),
    errorMiddleware,
    authControllerInstance.emailResendingController.bind(authControllerInstance)
)