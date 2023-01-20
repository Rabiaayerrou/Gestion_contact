import React, { useState } from 'react';
import './style.css'
function ContactForm() {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({});
    const [search, setSearch] = useState('');
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [sortAsc, setSortAsc] = useState(true);


    const handleSubmit = (e) => {
        e.preventDefault();
        setContacts([...contacts, newContact]);
        setNewContact({});
        setFilteredContacts([...contacts, newContact]);
    }


    const handleChange = (e) => {
        setNewContact({ ...newContact, [e.target.name]: e.target.value });
    }


    const handleSearch = (e) => {
        setSearch(e.target.value);
        setFilteredContacts(contacts.filter
            (contact =>
                contact.ville.toLowerCase().includes(e.target.value.toLowerCase())
            ));
    }


    const handleDelete = (index) => {
        const updatedContacts = [...contacts];
        updatedContacts.splice(index, 1);
        setContacts(updatedContacts);
        setFilteredContacts(updatedContacts);
    }


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
                                {contact.name} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                                {contact.ville} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                                {contact.phone}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                                <button type="button" onClick={() => handleDelete(index)} className='sup_button'>Supprimer</button>
                            </li>

                        </ul>
                    ))
                    : contacts.map((contact, index) => (
                        <ul key={index}>
                            <li>
                                {contact.name}
                                {contact.ville}
                                {contact.phone}
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
