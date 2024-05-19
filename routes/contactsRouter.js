import express from 'express';
import validateBody from '../middlewares/validateBody.js';
import contactsSchemas from '../schemas/contactsSchemas.js';
import ctrl from '../controllers/index.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';

const { createContactSchema, updateContactSchema, updateContactStatusSchema } =
  contactsSchemas;

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get('/', ctrl.getAllContacts);

contactsRouter.post('/', validateBody(createContactSchema), ctrl.createContact);

contactsRouter.get('/:id', isValidId, ctrl.getOneContact);

contactsRouter.put(
  '/:id',
  isValidId,
  validateBody(updateContactSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  validateBody(updateContactStatusSchema),
  ctrl.updateContact
);

contactsRouter.delete('/:id', isValidId, ctrl.deleteContact);

export default contactsRouter;
