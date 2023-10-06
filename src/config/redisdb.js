const redis = require('redis');

const { REDIS_URL } = require('./server-config')

const client = redis.createClient({
  url: REDIS_URL,
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      console.log(options);
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
});

client.on("error", function (err) {
  throw err;
});

// (async () => {
//   await client.connect()
// })()

module.exports = client;