import React, { useState } from 'react';
import './style.css'
function ContactForm() {
  const [contacts, setContacts] = useState([]); // initializing the state for contacts
  const [newContact, setNewContact] = useState({}); // initializing the state for new contact
  const [search, setSearch] = useState(''); // initializing the state for the search term
  const [filteredContacts, setFilteredContacts] = useState([]); //initializing the state for filtered contacts
  const [sortAsc, setSortAsc] = useState(true); //initializing the state for sorting order

  // function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setContacts([...contacts, newContact]); // adding new contact to the existing contacts
    setNewContact({}); // resetting the new contact state
    setFilteredContacts([...contacts, newContact]); // adding new contact to the filtered contacts
  }

  // function to handle input changes
  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  }

  // function to handle the search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFilteredContacts(contacts.filter
      (contact =>
        contact.ville.toLowerCase().includes(e.target.value.toLowerCase())
      ));
    }
    
  // function to handle contact deletion
  const handleDelete = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
    setFilteredContacts(updatedContacts);
  }

  // function to handle sorting
  const handleSort = () => {
    setSortAsc(!sortAsc);
    const sortedContacts = [...contacts].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return sortAsc ? -1 : 1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return sortAsc ? 1 : -1;
      }
      return 0;
    });
    setContacts(sortedContacts);
    setFilteredContacts(sortedContacts);
  }

  return (
    <div>
      <h1><u>Application de Gestion des Contacts</u></h1>
      <div className='dive1'>
      <form>
          <input type="text" name="search" className='recherch' placeholder="Rechercher..." onChange={handleSearch} value={search} />
          
          <button type="button" className='button_Trier' onClick={handleSort}>Trier La List</button>
        </form><br /><br />
        </div>
        
      <div className='dive2'>
      <form onSubmit={handleSubmit}  >
        <input type="text" name="name" className='name_contact' placeholder="Entrer vorte nom" required onChange={handleChange} value={newContact.name || ''} />
        <input type="text" name="ville" className='ville_contact' placeholder="Entrer vorte Ville" required onChange={handleChange} value={newContact.ville || ''} />
        <input type="tel" name="phone" className='phone_contact' placeholder="Entrer vorte numéro téléphone" required onChange={handleChange} value={newContact.phone || ''} />
        <button type="submit" className='button_Ajo'>Ajouter Contacts</button>
         </form>
         
         </div>

      <div className='rr'>
        {filteredContacts.length > 0
          ? filteredContacts.map((contact, index) => (
            <ul key={index}>
              <li className='list' >
                <p>{contact.name}</p>   
                <p>{contact.ville}</p> 
                <p>{contact.phone}</p> 
                <button type="button" onClick={() => handleDelete(index)} className='sup_button'>Supprimer</button>
              </li>

            </ul>
          ))
          : contacts.map((contact, index) => (
            <ul key={index}>
              <li>
              <p>{contact.name}</p>
              <p>{contact.name}</p>
              <p>{contact.name}</p>
              <button type="button" onClick={() => handleDelete(index)}>Supperimer</button>
              </li>
            </ul>
          ))
          
        }
      </div>
      
    </div>
  );
}

export default ContactForm;
