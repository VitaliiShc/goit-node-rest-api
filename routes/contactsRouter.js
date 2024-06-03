import express from 'express';
import contactsSchemas from '../schemas/contactsSchemas.js';
import mdwrs from '../middlewares/index.js';
import ctrls from '../controllers/index.js';

const { createContactSchema, updateContactSchema, updateContactStatusSchema } =
  contactsSchemas;

const contactsRouter = express.Router();
contactsRouter.use(mdwrs.authenticate);

// Show all contacts
contactsRouter.get('/', ctrls.getAllContacts);

// Create a contact
contactsRouter.post(
  '/',
  mdwrs.validateBody(createContactSchema),
  ctrls.createContact
);

// Show a contact's data by id
contactsRouter.get('/:id', mdwrs.isValidId, ctrls.getOneContact);

// Change a contact's data by id
contactsRouter.put(
  '/:id',
  mdwrs.isValidId,
  mdwrs.validateBody(updateContactSchema),
  ctrls.updateContact
);

// Change a contact's favorite status by id
contactsRouter.patch(
  '/:id/favorite',
  mdwrs.isValidId,
  mdwrs.validateBody(updateContactStatusSchema),
  ctrls.updateContact
);

// Delete a contact by id
contactsRouter.delete('/:id', mdwrs.isValidId, ctrls.deleteContact);

export default contactsRouter;
