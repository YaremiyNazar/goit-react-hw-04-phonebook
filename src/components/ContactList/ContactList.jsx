
import PropTypes from 'prop-types';
import ContactItem from '../ContactItem/ContactItem';
import css from "../ContactList/ContactList.module.css"

const ContactList = ({ filterContacts, deleteContacts }) => {
  return (
    <ul className={css.contact__list}>
      {filterContacts.map(({id,name,number}) => (
        <ContactItem
          name={name}
          number={number}
          id={id}
          key={id}
          deleteContacts={deleteContacts}
        />
      ))}
    </ul>
  );
};
ContactList.propTypes = {
  filterContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContacts: PropTypes.func.isRequired,
};
export default ContactList;
