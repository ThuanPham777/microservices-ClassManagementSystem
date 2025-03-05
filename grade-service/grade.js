const app = require('./app');
const serverless = require('serverless-http');
const { runConsumer } = require('./Kafka/Kafka');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
runConsumer().catch(err => console.error('Error starting consumer:', err));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports.handler = serverless(app); 