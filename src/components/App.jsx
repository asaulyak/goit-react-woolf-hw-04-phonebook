import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { storage } from '../common/storage/storage';

export const App = () => {
  const [contacts, setContacts] = useState(() => storage.get('contacts') || []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts) {
      storage.set('contacts', contacts);
    }
  }, [contacts]);

  const handleAddContact = contact => {
    const contactExists = contacts.some(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (contactExists) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }

    setContacts([...contacts, contact]);
  };

  const handleDeleteContact = id => {
    if (!id) {
      return;
    }

    setContacts(prev => prev.filter(item => item.id !== id));
  };

  const handleSearch = term => {
    setFilter(term);
  };

  const getFilteredContacts = () => {
    let filteredContacts = contacts || [];
    const filterClean = filter?.trim();

    if (filterClean) {
      filteredContacts = filteredContacts.filter(item =>
        item.name.toLowerCase().includes(filterClean)
      );
    }

    return filteredContacts;
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={handleAddContact} />

        <h2>Contacts</h2>
        <Filter onSearch={handleSearch} />
        <ContactList
          contacts={getFilteredContacts()}
          onContactDelete={handleDeleteContact}
        />
      </div>
    </div>
  );
};
