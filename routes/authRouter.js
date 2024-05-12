import express from 'express';
import validateBody from '../middlewares/validateBody.js';
import usersSchemas from '../schemas/usersSchemas.js';
import ctrl from '../controllers/authControllers.js';
import authenticate from '../middlewares/authenticate.js';

const { registerSchema, loginSchema, updateSubscriptionSchema } = usersSchemas;

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), ctrl.register);

authRouter.post('/login', validateBody(loginSchema), ctrl.login);

authRouter.get('/current', authenticate, ctrl.getCurrent);

authRouter.patch(
  '/',
  validateBody(updateSubscriptionSchema),
  authenticate,
  ctrl.updateSubscription
);

authRouter.post('/logout', authenticate, ctrl.logout);

export default authRouter;
