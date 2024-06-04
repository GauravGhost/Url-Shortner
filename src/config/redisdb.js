const redis = require('redis');

const { REDIS_HOST, REDIS_PORT } = require('./server-config')

const client = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`
  /*
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('Retry time exhausted');
    }
    if (options.attempt > 10) {
      return new Error('Max attempts reached');
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  }
  */
});

client.on("error", function (err) {
  throw err;
});

// (async () => {
//   await client.connect()
// })()

module.exports = client;
