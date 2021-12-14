const fs = require('fs/promises')
const path = require('path')
const {readContent} = require('./readContent')

const removeContact = async (contactId) => {
    const contacts = await readContent()
    const contactFindIndex = await contacts.findIndex((contact) => contact.id === contactId);
    if (contactFindIndex > -1) {
        const contactRemove = await contacts.splice(contactFindIndex, 1);
        await fs.writeFile(
        path.join(__dirname, '../../db/contacts.json'), 
        JSON.stringify(contacts)
        );
        return contactRemove;
    }
}

module.exports = {
    removeContact
}