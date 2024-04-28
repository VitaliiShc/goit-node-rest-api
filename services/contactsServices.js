import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

const contactsPath = path.join('db', 'contacts.json');

const readData = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const writeData = async (data) => {
  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

const listContacts = async () => {
  const contacts = await readData();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await readData();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;
};

const removeContact = async (contactId) => {
  const contacts = await readData();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (!~idx) {
    return null;
  }
  const removedContact = contacts.splice(idx, 1);
  await writeData(contacts);
  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await readData();
  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);
  await writeData(contacts);
  return newContact;
};

const updateContactById = async (contactId, data) => {
  const contacts = await readData();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (!~idx) {
    return null;
  }
  const updatedContact = { ...contacts[idx], ...data };
  contacts[idx] = { ...contacts[idx], ...data };
  await writeData(contacts);
  return updatedContact;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
