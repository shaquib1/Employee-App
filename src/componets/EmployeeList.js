import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/employees');
        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(errorDetails);
        }
        const result = await response.json();
        setEmployees(result.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError('Failed to load employees');
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/api/employees/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Log the status code and response text for debugging
      const errorDetails = await response.text();
      throw new Error(`Failed to delete employee: ${response.status} ${response.statusText} - ${errorDetails}`);
    }

    // If the response is successful, update the state to remove the employee
    setEmployees(employees.filter(employee => employee._id !== id));
  } catch (error) {
    console.error('Error deleting employee:', error);
    setError('Failed to delete employee');
  }
};

  return (
    <div>
      <h1>Employee List</h1>
      {error && <p>{error}</p>}
      {employees.length === 0 ? (
        <p>No Employees in the system</p>
      ) : (
        <ul>
          {employees.map(employee => (
            <li key={employee._id}>
              <Link to={`/employees/${employee._id}`}>{employee.name} ({employee._id})</Link>
              <button onClick={() => handleDelete(employee._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/add-employee">Add Employee</Link>
    </div>
  );
};

export default EmployeeList;


