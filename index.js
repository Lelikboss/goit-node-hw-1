const chalk = require('chalk');
const { Command } = require('commander');
const {listContacts, addContact, getContactById, removeContact} = require('./contact')

const program = new Command();
program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await listContacts()
      console.table(contacts)
      break;

    case 'get':
      const contactById = await getContactById(id)
      if(contactById){
          console.log(chalk.bgGrey.yellow(' Contact found '));
          console.log(contactById);
          return
      } 
          console.log(chalk.redBright(' Contact not found '));
      break;

    case 'add':
      const contact = await addContact(name, email, phone)
      console.log(chalk.bgGreen.black(' Add new contact '));
      console.log(contact);
      break;

    case 'remove':
      const deleteContact = await removeContact(id);
      if (deleteContact) {
      console.log(chalk.bgYellow.black(' Contact deleted '));
      console.log(deleteContact);
      }
      else {
        console.log(chalk.redBright('Contact not found'));
      }
      break;

    default:
      console.warn(chalk.red('\x1B[31m Unknown action type!'));
  }
}

invokeAction(argv).then(()=> console.log(chalk.bgBlueBright.black(' Action completed ')));