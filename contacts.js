const fsProm = require("node:fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fsProm.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log("error :", error);
  }
}

async function getContactById(contactId) {
  try {
    const contact = await listContacts().then((res) =>
      res.find((el) => el.id == contactId)
    );
    return contact;
  } catch (error) {
    console.log("error :", error);
  }
}

async function removeContact(contactId) {
  try {
    const prevArr = await listContacts().then((res) => res);
    const filtered = JSON.stringify(
      prevArr.filter((el) => el.id != contactId),
      undefined,
      2
    );
    await fsProm.writeFile(contactsPath, filtered);
  } catch (error) {
    console.log("error :", error);
  }
}

async function addContact(name, email, phone) {
  try {
    const prevArr = await listContacts().then((res) => res);

    const newContact = {
      id: prevArr.length + 1,
      name,
      email,
      phone,
    };

    const updatedArr = JSON.stringify([...prevArr, newContact], undefined, 2);
    await fsProm.writeFile(contactsPath, updatedArr);
  } catch (error) {
    console.log("error :", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
