import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactList from '../components/ContactList/ContactList';
import ContactForm from '../components/ContactForm/ContactForm';
import Filter from '../components/Filter/Filter';

import css from '../components/App.module.css';

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) ?? initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};

const contactsState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const key = 'contacts';

const App = () => {
  const [contacts, setContacts] = useLocalStorage(key, contactsState);
  const [filters, setFilters] = useState('');

  const addContact = (name, number) => {
    const dublicate = contacts.find(contact => contact.name === name);
    if (dublicate) {
      alert(`${name} is already in your contact list`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevState => {
      return [...prevState, newContact];
    });
  };
  const deleteContact = contactId => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId);
    });
  };

  const getFilteredContacts = () => {
    const normalizedContact = filters.toLowerCase();

    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedContact);
    });
  };


  const handleChange = event => {
    setFilters(event.target.value);
  };
  return (
    <div className={css.wrapper}>
      <div className={css.contact__form}>
        <h1>PhoneBook</h1>
        <ContactForm onSubmit={addContact} />
      </div>
      <div className={css.contact}>
        <h2>Contacts</h2>
        <Filter onChange={handleChange} filterValue={filters} />
        {contacts.length !== 0 && (
          <ContactList
            deleteContacts={deleteContact}
            filterContacts={getFilteredContacts() }
          />
        )}
      </div>
    </div>
  );
};

export default App;
