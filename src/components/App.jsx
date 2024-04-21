import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { storage } from '../common/storage/storage';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.contacts !== prevState.contacts) {
      this.storeContacts();
    }
  }

  componentDidMount() {
    this.loadContacts();
  }

  handleAddContact = contact => {
    const contactExists = this.state.contacts.some(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (contactExists) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }

    this.setState(() => ({ contacts: [...this.state.contacts, contact] }));
  };

  handleDeleteContact = id => {
    if (!id) {
      return;
    }

    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== id),
    }));
  };

  handleSearch = filter => {
    this.setState({ filter: filter.toLowerCase() });
  };

  getFilteredContacts() {
    let filteredContacts = this.state.contacts;
    const filter = this.state.filter?.trim();

    if (filter) {
      filteredContacts = filteredContacts.filter(item =>
        item.name.toLowerCase().includes(filter)
      );
    }

    return filteredContacts;
  }

  loadContacts() {
    const storedContacts = storage.get('contacts');

    if (storedContacts?.length) {
      this.setState({
        contacts: storedContacts,
      });
    }
  }

  storeContacts() {
    storage.set('contacts', this.state.contacts);
  }

  render() {
    const filteredContacts = this.getFilteredContacts();

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
          <ContactForm onAddContact={this.handleAddContact} />

          <h2>Contacts</h2>
          <Filter onSearch={this.handleSearch} />
          <ContactList
            contacts={filteredContacts}
            onContactDelete={this.handleDeleteContact}
          />
        </div>
      </div>
    );
  }
}
