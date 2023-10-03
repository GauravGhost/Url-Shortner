const redis = require('redis');
const Logger = require('./logger-config')
const {REDIS_URL} = require('./server-config')
console.log(REDIS_URL)
const client = redis.createClient({
  url: REDIS_URL,
  port: 11352,
});



(async () => {
  await client.connect();
  await client.select(0);
})()

module.exports = client;