require('dotenv').config();
const express = require('express');
const cors = require('cors');
const classRoutes = require('./routes/classRoute');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/classes', classRoutes);
module.exports = app;
