const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/employees', (req, res) => {
  const API_URL = 'https://free-ap-south-1.cosmocloud.io/development/api/employees';
  
  // Extract query parameters
  const { limit = 100, offset = 21 } = req.query;

  const apiUrlWithParams = `${API_URL}?limit=${limit}&offset=${offset}`;

  console.log('Fetching employees from:', apiUrlWithParams);

  request.get({
    url: apiUrlWithParams,
    headers: {
      'projectId': '66ae4acad09e8cc8a8afd371',
      'environmentId': '66ae4acad09e8cc8a8afd372'
    }
  }, (error, response, body) => {
    if (error) {
      console.error('Error making GET request:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
    if (response.statusCode === 200) {
      res.json(JSON.parse(body));
    } else {
      console.error('API Error:', body);
      res.status(response.statusCode).json({ message: 'Error fetching employees', details: body });
    }
  });
});

app.post('/api/employees', (req, res) => {
  const API_URL = 'https://free-ap-south-1.cosmocloud.io/development/api/employees';
  const newEmployee = req.body;

  console.log('Adding new employee:', newEmployee);

  request.post({
    url: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'projectId': '66ae4acad09e8cc8a8afd371',
      'environmentId': '66ae4acad09e8cc8a8afd372'
    },
    body: JSON.stringify(newEmployee)
  }, (error, response, body) => {
    if (error) {
      console.error('Error making POST request:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
    if (response.statusCode === 201) {
      res.status(201).json(JSON.parse(body));
    } else {
      console.error('API Error:', body);
      res.status(response.statusCode).json({ message: 'Error adding employee', details: body });
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
