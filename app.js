const { saveContacts, listContact, detailContact } = require('./contacts');
const yargs = require('yargs');

// menambahkan data contact
yargs.command({
  command: 'add',
  describe: 'add new contact',
  builder: {
    name: {
      describe: 'Contact Name',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'contact email',
      demandOption: false,
      type: 'string',
    },
    mobile: {
      describe: 'Contact mobile phone number',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    saveContacts(argv.name, argv.email, argv.mobile);
  },
});

// menampilkan daftar contact
yargs.command({
  command: 'list',
  describe: 'see contact list',
  handler() {
    listContact();
  },
});

// menampilkan detail contact
yargs.command({
  command: 'detail',
  describe: 'see contact detail base on name',
  builder: {
    name: {
      describe: 'Contact Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    detailContact(argv.name);
  },
});

yargs.parse();
