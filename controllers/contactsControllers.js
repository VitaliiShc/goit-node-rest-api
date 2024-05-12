import Contact from '../models/contactModel.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const filter =
    req.query.favorite === '' ? { owner, favorite: true } : { owner };
  const contacts = await Contact.find(filter, '-createdAt -updatedAt -owner');
  const total = contacts.length;
  const skip = (page - 1) * limit;
  const pages = Math.ceil(total / limit);
  const response = contacts.splice(skip, limit);
  const YourPlaceInContactBook =
    req.query.favorite === ''
      ? `Page ${page} of ${pages}. Total ${total} FAVORITE contacts.`
      : `Page ${page} of ${pages}. Total ${total} contacts.`;
  res.send({
    'Your Place In Your ContactBook': YourPlaceInContactBook,
    contacts: response,
  });
};

const createContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).send({
    id: result._id,
    name: result.name,
    email: result.email,
    phone: result.phone,
    favorite: result.favorite,
  });
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: id, owner });
  if (!result) {
    throw HttpError(404);
  }
  res.send({
    id: result._id,
    name: result.name,
    email: result.email,
    phone: result.phone,
    favorite: result.favorite,
  });
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.send({
    id: result._id,
    name: result.name,
    email: result.email,
    phone: result.phone,
    favorite: result.favorite,
  });
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: id, owner });
  if (!result) {
    throw HttpError(404);
  }
  res.send({
    id: result._id,
    name: result.name,
    email: result.email,
    phone: result.phone,
    favorite: result.favorite,
  });
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  createContact: ctrlWrapper(createContact),
  getOneContact: ctrlWrapper(getOneContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
