import ctrlWrapper from '../helpers/ctrlWrapper.js';
import authControllers from './authControllers.js';
import userControllers from './userControllers.js';
import contactsControllers from './contactsControllers.js';

export default {
  // auth controllers
  register: ctrlWrapper(authControllers.register),
  login: ctrlWrapper(authControllers.login),
  logout: ctrlWrapper(authControllers.logout),

  // user controllers
  getCurrent: ctrlWrapper(userControllers.getCurrent),
  updateSubscription: ctrlWrapper(userControllers.updateSubscription),
  updateAvatar: ctrlWrapper(userControllers.updateAvatar),

  // contact controllers
  getAllContacts: ctrlWrapper(contactsControllers.getAllContacts),
  createContact: ctrlWrapper(contactsControllers.createContact),
  getOneContact: ctrlWrapper(contactsControllers.getOneContact),
  updateContact: ctrlWrapper(contactsControllers.updateContact),
  deleteContact: ctrlWrapper(contactsControllers.deleteContact),
};
