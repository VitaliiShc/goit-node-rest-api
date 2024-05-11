import express from 'express';
import validateBody from '../middlewares/validateBody.js';
import contactsSchemas from '../schemas/contactsSchemas.js';
import ctrl from '../controllers/contactsControllers.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';

const { createContactSchema, updateContactSchema, updateContactStatusSchema } =
  contactsSchemas;

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get('/contacts', ctrl.getAllContacts);

contactsRouter.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrl.createContact
);

contactsRouter.get('/contacts/:id', isValidId, ctrl.getOneContact);

contactsRouter.put(
  '/contacts/:id',
  isValidId,
  validateBody(updateContactSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  '/contacts/:id/favorite',
  isValidId,
  validateBody(updateContactStatusSchema),
  ctrl.updateContact
);

contactsRouter.delete('/contacts/:id', isValidId, ctrl.deleteContact);

export default contactsRouter;
