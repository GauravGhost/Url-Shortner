const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    PORT: process.env.PORT,
    ENV: process.env.ENV,
    MONGODB_URL :process.env.MONGODB_URL,
    WORKER_ID: process.env.WORKER_ID,
    REDIS_URL: process.env.REDIS_URL
}