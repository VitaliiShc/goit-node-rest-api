import express from 'express';
import contactsSchemas from '../schemas/contactsSchemas.js';
import mdwrs from '../middlewares/index.js';
import ctrls from '../controllers/index.js';

const { createContactSchema, updateContactSchema, updateContactStatusSchema } =
  contactsSchemas;

const contactsRouter = express.Router();
contactsRouter.use(mdwrs.authenticate);

contactsRouter.get('/', ctrls.getAllContacts);

contactsRouter.post(
  '/',
  mdwrs.validateBody(createContactSchema),
  ctrls.createContact
);

contactsRouter.get('/:id', mdwrs.isValidId, ctrls.getOneContact);

contactsRouter.put(
  '/:id',
  mdwrs.isValidId,
  mdwrs.validateBody(updateContactSchema),
  ctrls.updateContact
);

contactsRouter.patch(
  '/:id/favorite',
  mdwrs.isValidId,
  mdwrs.validateBody(updateContactStatusSchema),
  ctrls.updateContact
);

contactsRouter.delete('/:id', mdwrs.isValidId, ctrls.deleteContact);

export default contactsRouter;
