import Contact from '../models/contactModel.js';
import HttpError from '../helpers/HttpError.js';
import controllerWrapper from '../helpers/controllerWrapper.js';

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find({}, '-createdAt -updatedAt');
  res.send(result);
};

const createContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).send(result);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id, '-createdAt -updatedAt');
  if (!result) {
    throw HttpError(404);
  }
  res.send(result);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
    select: '-createdAt -updatedAt',
  });
  if (!result) {
    throw HttpError(404);
  }
  res.send(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id, {
    select: '-createdAt -updatedAt',
  });
  if (!result) {
    throw HttpError(404);
  }
  res.send(result);
};

export default {
  getAllContacts: controllerWrapper(getAllContacts),
  createContact: controllerWrapper(createContact),
  getOneContact: controllerWrapper(getOneContact),
  updateContact: controllerWrapper(updateContact),
  deleteContact: controllerWrapper(deleteContact),
};
