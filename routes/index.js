import express from 'express';
import contactsRouter from './contactsRouter.js';
import authRouter from './authRouter.js';

const router = express.Router();

router.use('/api', contactsRouter);
router.use('/users', authRouter);

export default router;
