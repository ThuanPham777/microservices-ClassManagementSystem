require('dotenv').config();
const express = require('express');
const cors = require('cors');
const gradeRoutes = require('./routes/gradeRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/grades', gradeRoutes);

module.exports = app;
