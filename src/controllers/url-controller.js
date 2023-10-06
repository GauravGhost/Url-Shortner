const { StatusCodes } = require('http-status-codes')
const { UrlService } = require('../services')
const { successResponse, errorResponse } = require('../utils/response');
const { ApiError } = require('../utils');
const AsyncHandler = require('../utils/asyncHandler');

const urlService = new UrlService();

/**
 * @param {url} req.body
 * @return {shortUrl} 
 */

const create = AsyncHandler(async (req, res) => {
    const response = await urlService.create(req.body.url);

    successResponse.data = response.shortenedUrl;
    return res.status(StatusCodes.OK).json(successResponse);
});

const redirect = AsyncHandler(async (req, res) => {
    const originalUrl = await urlService.redirect(req.params.url);
    successResponse.data = originalUrl;
    return res.satus(StatusCodes.OK).json(successResponse);
})

module.exports = {
    create,
    redirect
}