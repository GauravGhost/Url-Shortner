const client = require('../config/redisdb')
const { ApiError, Response, AsyncHandler } = require('../utils');
const { StatusCodes } = require('http-status-codes')
const base62 = require('base62')

const urlCache = AsyncHandler(async (req, res, next) => {
    const id = (base62.decode(req.params.url)).toString();

    if (await client.exists(id)) {
        client.expire(id, 86400);
        const originalUrl = await client.get(id);
        Response.successResponse.data = originalUrl;
        return res.status(StatusCodes.OK).json(Response.successResponse);
    }
    next();
});


module.exports = urlCache;