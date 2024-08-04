const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = 3009;

// Middleware
app.use(cors());
app.use(express.json());

// DELETE endpoint for employee
app.delete('/api/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  const API_URL = `https://free-ap-south-1.cosmocloud.io/development/api/employees/${employeeId}`;

  request.delete({
    url: API_URL,
    headers: {
      'projectId': '66ae4acad09e8cc8a8afd371',
      'environmentId': '66ae4acad09e8cc8a8afd372'
    }
  }, (error, response, body) => {
    if (error) {
      console.error('Error making DELETE request:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
    if (response.statusCode === 200) {
      res.status(200).json({ message: 'Employee deleted successfully' });
    } else {
      console.error('API Error:', body);
      res.status(response.statusCode).json({ message: 'Error deleting employee', details: body });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
