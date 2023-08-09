const redis = require('redis');
const Logger = require('./logger-config')
const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

client.connect();
client.select(2);
client.on('connect', () => {
    Logger.info(`Reddis client connected`)
});

client.on('error', (err) => {
  console.log(`Something went wrong ${err}`);
});

module.exports = client;