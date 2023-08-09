const {StatusCodes} = require('http-status-codes')

const CrudRepository = require('./crud-repository')
const {Url} = require('../models')
const {ApiError} = require('../utils')

class UrlRepository extends CrudRepository{
    constructor(){
        super(Url);
    }

    async getByUrl(url) {
        try {
            const result = await this.model.findOne({originalUrl: url});
            return result;
        } catch (error) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching data using url in crud repository");
        }
    }
}

module.exports = UrlRepository;