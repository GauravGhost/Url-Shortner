const redis = require('redis');
const Logger = require('./logger-config')

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});



(async () => {
  await client.connect();
  await client.select(2);
})()

module.exports = client;