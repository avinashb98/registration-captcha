require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const registerRoute = require('./src/routes/register');

// mongodb config
require('./config/db');

// Initializing express app
const app = express();

app.use(cors());

// Body Parser Configuration
app.use(bodyParser.json({ // to support JSON-encoded bodies
  limit: '1mb'
}));

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  limit: '1mb',
  extended: true
}));

app.use(bodyParser.urlencoded({ extended: false }));


// Router Initialization
app.get('/api/', (req, res) => {
  res.status(200).json({
    msg: 'Register as a new user'
  });
});

app.use('/api/register/', registerRoute);

module.exports = app;
