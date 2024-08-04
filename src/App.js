import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import EmployeeList from './EmployeeList';
// import EmployeeDetail from './EmployeeDetail';
// import AddEmployee from './AddEmployee';
import EmployeeList from './componets/EmployeeList';
import EmployeeDetail from './componets/EmployeeDetail';
import AddEmployee from './componets/AddEmployee';

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import EmployeeList from './EmployeeList';
// import EmployeeDetail from './EmployeeDetail';
// import AddEmployee from './AddEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
