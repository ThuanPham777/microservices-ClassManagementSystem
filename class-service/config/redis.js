const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
    host: process.env.CACHE_ENDPOINT,
    port: 6379,
});
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.connect()
  .then(() => {
    console.log('Connected to Redis');
  })
  .catch((err) => {
    console.error('Failed to connect to Redis:', err);
  });

module.exports = redisClient;