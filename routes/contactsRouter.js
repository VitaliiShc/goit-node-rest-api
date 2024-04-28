import express from 'express';
import validateBody from '../helpers/validateBody.js';
import contactsSchemas from '../schemas/contactsSchemas.js';
import contactsControllers from '../controllers/contactsControllers.js';

const { createContactSchema, updateContactSchema } = contactsSchemas;

const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = contactsControllers;

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);

contactsRouter.get('/:id', getOneContact);

contactsRouter.delete('/:id', deleteContact);

contactsRouter.post('/', validateBody(createContactSchema), createContact);

contactsRouter.put('/:id', validateBody(updateContactSchema), updateContact);

export default contactsRouter;
