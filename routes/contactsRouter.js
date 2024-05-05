import express from 'express';
import validateBody from '../helpers/validateBody.js';
import contactsSchemas from '../schemas/contactsSchemas.js';
import ContactsControllers from '../controllers/contactsControllers.js';
import isValidId from '../helpers/isValidId.js';

const jsonParser = express.json();

const { createContactSchema, updateContactSchema, updateStatusSchema } =
  contactsSchemas;

const {
  getAllContacts,
  createContact,
  getOneContact,
  updateContact,
  deleteContact,
} = ContactsControllers;

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);
contactsRouter.post(
  '/',
  jsonParser,
  validateBody(createContactSchema),
  createContact
);
contactsRouter.get('/:id', isValidId, getOneContact);
contactsRouter.put(
  '/:id',
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  updateContact
);
contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  jsonParser,
  validateBody(updateStatusSchema),
  updateContact
);
contactsRouter.delete('/:id', isValidId, deleteContact);

export default contactsRouter;
