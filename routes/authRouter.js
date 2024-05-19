import express from 'express';
import usersSchemas from '../schemas/usersSchemas.js';
import mdwrs from '../middlewares/index.js';
import ctrls from '../controllers/index.js';

const { registerSchema, loginSchema, updateSubscriptionSchema } = usersSchemas;

const authRouter = express.Router();

authRouter.post(
  '/register',
  mdwrs.validateBody(registerSchema),
  ctrls.register
);

authRouter.post('/login', mdwrs.validateBody(loginSchema), ctrls.login);

authRouter.get('/current', mdwrs.authenticate, ctrls.getCurrent);

authRouter.patch(
  '/',
  mdwrs.validateBody(updateSubscriptionSchema),
  mdwrs.authenticate,
  ctrls.updateSubscription
);

authRouter.patch(
  '/avatars',
  mdwrs.authenticate,
  mdwrs.upload.single('avatar'),
  ctrls.updateAvatar
);

authRouter.post('/logout', mdwrs.authenticate, ctrls.logout);

export default authRouter;
