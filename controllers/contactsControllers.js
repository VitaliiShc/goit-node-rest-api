import contactsServices from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import controllerWrapper from '../helpers/controllerWrapper.js';

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} = contactsServices;

const getAllContacts = async (req, res, next) => {
  const result = await listContacts();
  res.json(result);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const createContact = async (req, res, next) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export default {
  getAllContacts: controllerWrapper(getAllContacts),
  getOneContact: controllerWrapper(getOneContact),
  deleteContact: controllerWrapper(deleteContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
};
