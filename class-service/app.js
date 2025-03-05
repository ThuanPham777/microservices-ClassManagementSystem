require('dotenv').config();
const express = require('express');
const cors = require('cors');
const classRoutes = require('./routes/classRoute');
const { runConsumer } = require('./Kafka/kafka');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/classes', classRoutes);
runConsumer().catch(err => console.error('Error starting consumer:', err));
module.exports = app;
