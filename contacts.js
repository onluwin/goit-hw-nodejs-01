const { nanoid } = require("nanoid");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const buffer = await fs.readFile(contactsPath);
  return JSON.parse(buffer);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactById = allContacts.find((item) => item.id === contactId);
  return contactById || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();

  const index = allContacts.findIndex((item) => item.id === contactId);
  const [deletedContact] = allContacts.splice(index, 1);

  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return index === -1 ? null : deletedContact;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();

  const newContact = { id: nanoid(), name, email, phone };
  allContacts.push(newContact);

  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
