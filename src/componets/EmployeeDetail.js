import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EmployeeDetail = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/employees/${id}`);
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error fetching employee: ${response.status} ${response.statusText}. Response: ${errorText}`);
          throw new Error('Failed to fetch employee details');
        }
        const result = await response.json();
        console.log('Employee data:', result); 
        setEmployee(result);
      } catch (error) {
        console.error('Error fetching employee:', error);
        setError('Failed to load employee details');
      }
    };

    fetchEmployee();
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!employee) return <p>Loading...</p>;

  return (
    <div>
      <h1>Employee Details</h1>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Employee ID:</strong> {employee._id}</p>
      <p><strong>Address:</strong> {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zip_code}</p>
      <p><strong>Contacts:</strong></p>
      <ul>
        {employee.contacts && employee.contacts.length > 0 ? (
          employee.contacts.map((contact, index) => (
            <li key={index}>{contact.contact_method}: {contact.value}</li>
          ))
        ) : (
          <li>No contacts available</li>
        )}
      </ul>
      <Link to="/">Back to Employee List</Link>
    </div>
  );
};

export default EmployeeDetail;
