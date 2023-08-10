const express = require('express');
const cors = require('cors')
var base62 = require("base62/lib/ascii");
const {ApiError} = require('./utils')
const {StatusCodes} = require('http-status-codes')
const { ServerConfig, Logger, DatabaseConnect, redisDb} = require('./config');
const apiRoutes = require('./routes');
const { ErrorHandler } = require('./middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.use('/', apiRoutes);

app.use((req, res, next) => {
    next(new ApiError(StatusCodes.NOT_FOUND, "Not found"));
})

app.use(ErrorHandler);


app.listen(ServerConfig.PORT, async () => {
    Logger.info(`Server has started in ${ServerConfig.PORT}`, "root", {})
    await DatabaseConnect();
    Logger.info(`Database Connected`, "root", {})
})