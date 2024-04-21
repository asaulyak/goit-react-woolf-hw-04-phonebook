import { ContactListItem } from '../ContactListItem/ContactListItem';

export function ContactList({ contacts, onContactDelete }) {
  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          <ContactListItem
            contact={contact}
            onContactDelete={onContactDelete}
          />
        </li>
      ))}
    </ul>
  );
}
