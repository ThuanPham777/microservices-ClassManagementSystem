const app = require('./app');
const serverless = require('serverless-http');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports.handler = serverless(app); 