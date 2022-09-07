// mengimport core module yang dibutuhkan
const fs = require('fs');
var validator = require('validator');
// const readline = require('readline');

// jika tidak ada folder data maka buat foldernya
if (!fs.existsSync('./data')) {
  fs.mkdirSync('data');
}

// jika tidak ada file contacts.json dalam folder data maka buat filenya
if (!fs.existsSync('./data/contacts.json')) {
  fs.writeFileSync('data/contacts.json', '[]');
}

const loadContact = () => {
  const file = fs.readFileSync('data/contacts.json', 'utf-8'); //membaca file contacts dari folder data
  const contacts = JSON.parse(file); //memparsing data contacts ke object
  return contacts;
};

// membuat fungsi menyimpan contacts
const saveContacts = (name, email, nomorhp) => {
  const contact = { name, email, nomorhp }; //menyimpan object dari parameter fungsi ke variabel contact
  const contacts = loadContact();
  const duplicate = contacts.find((contact) => contact.name === name);
  //cek apakah nama duplikat
  if (duplicate) {
    console.log('Contact name is already recorded. Use another contact name');
    return false;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log('Invalid email contact');
      return false;
    }
  }

  // cek mobile phone
  if (!validator.isMobilePhone(nomorhp, 'id-ID')) {
    console.log('Invalid Phone number contact');
    return false;
  }

  contacts.push(contact); //menambahkan data contact baru ke variable contacts
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); //menulis data contacts ke file contacts.json
  console.log('Terima kasih sudah memasukkan data!'); //memberitahu bahwa data contact telah dimasukkan
};

// fungsi untuk menampilkan data contact
const listContact = () => {
  const contacts = loadContact();

  if (contacts[0] === undefined) {
    console.log('--- No Data yet ---');
    return false;
  }

  console.log('Contact List:');
  contacts.forEach((contact, i) => {
    if (contact.email) {
      console.log(`${i + 1}. ${contact.name} - ${contact.email} - ${contact.nomorhp}`);
    } else {
      console.log(`${i + 1}. ${contact.name} - ${contact.nomorhp}`);
    }
  });
};

// membuat fungsi detail kontak
const detailContact = (name) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());

  if (!contact) {
    console.log('contact not found');
    return false;
  }

  console.log(contact.name);
  if (contact.email) {
    console.log(contact.email);
  }
  console.log(contact.nomorhp);
};

// mengekspor fungsi-fungsi
module.exports = { saveContacts, listContact, detailContact };
