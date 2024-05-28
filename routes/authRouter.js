import express from 'express';
import usersSchemas from '../schemas/usersSchemas.js';
import mdwrs from '../middlewares/index.js';
import ctrls from '../controllers/index.js';

const {
  registerSchema,
  loginSchema,
  resendVerifyEmailSchema,
  updateSubscriptionSchema,
} = usersSchemas;

const authRouter = express.Router();

// User registration
authRouter.post(
  '/register',
  mdwrs.validateBody(registerSchema),
  ctrls.register
);

// Verification of user's email address
authRouter.get('/verify/:verificationToken', ctrls.emailVerification);

// Resent a verification email
authRouter.post(
  '/verify',
  mdwrs.validateBody(resendVerifyEmailSchema),
  ctrls.resendVerifyEmail
);

// User login
authRouter.post('/login', mdwrs.validateBody(loginSchema), ctrls.login);

// Show user's info
authRouter.get('/current', mdwrs.authenticate, ctrls.getCurrent);

// Change user's subscription status
authRouter.patch(
  '/',
  mdwrs.validateBody(updateSubscriptionSchema),
  mdwrs.authenticate,
  ctrls.updateSubscription
);

// Change user's avatar
authRouter.patch(
  '/avatars',
  mdwrs.authenticate,
  mdwrs.upload.single('avatar'),
  ctrls.updateAvatar
);

// User logout
authRouter.post('/logout', mdwrs.authenticate, ctrls.logout);

export default authRouter;
