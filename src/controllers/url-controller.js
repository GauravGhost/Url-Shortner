const { StatusCodes } = require('http-status-codes')
const { UrlService } = require('../services')
const { successResponse, errorResponse } = require('../utils/response');
const { ApiError } = require('../utils');
const AsyncHandler = require('../utils/asyncHandler');

const urlService = new UrlService();
/**
 * @param {bool} req.query.error
 */

const create = AsyncHandler(async (req, res) => {
    const response = await urlService.create(req.body.url);
    console.log(response);
    successResponse.data = response
    return res.status(StatusCodes.OK).json(successResponse);
})

module.exports = {
    create
}