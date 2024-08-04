import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({ line1: '', city: '', country: '', zip_code: '' });
  const [contacts, setContacts] = useState([{ contact_method: '', value: '' }]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddContact = () => {
    setContacts([...contacts, { contact_method: '', value: '' }]);
  };

  const handleContactChange = (index, field, value) => {
    const newContacts = contacts.slice();
    newContacts[index] = { ...newContacts[index], [field]: value };
    setContacts(newContacts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEmployee = {
      name,
      address,
      contacts
    };

    fetch('http://localhost:3001/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => navigate('/'))
      .catch(error => {
        console.error('Error adding employee:', error);
        setError('Failed to add employee');
      });
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Address Line 1:
          <input type="text" value={address.line1} onChange={e => setAddress({ ...address, line1: e.target.value })} required />
        </label>
        <br />
        <label>
          City:
          <input type="text" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} required />
        </label>
        <br />
        <label>
          Country:
          <input type="text" value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} required />
        </label>
        <br />
        <label>
          Zip Code:
          <input type="text" value={address.zip_code} onChange={e => setAddress({ ...address, zip_code: e.target.value })} required />
        </label>
        <br />
        <label>Contacts:</label>
        <br />
        {contacts.map((contact, index) => (
          <div key={index}>
            <select
              value={contact.contact_method}
              onChange={e => handleContactChange(index, 'contact_method', e.target.value)}
              required
            >
              <option value="">Select method</option>
              <option value="EMAIL">Email</option>
              <option value="PHONE">Phone</option>
            </select>
            <input
              type="text"
              value={contact.value}
              onChange={e => handleContactChange(index, 'value', e.target.value)}
              required
            />
            <br />
          </div>
        ))}
        <button type="button" onClick={handleAddContact}>Add Contact</button>
        <br />
        <button type="submit">Add Employee</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddEmployee;
