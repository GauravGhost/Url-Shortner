const base62 = require("base62/lib/ascii");
const { StatusCodes } = require("http-status-codes");

const {UrlRepository} = require('../repositories');
const {IdGenerator, ApiError} = require('../utils')

const {ServerConfig} = require('../config');
const client = require('../config/redisdb')

const urlRepository = new UrlRepository();

class UrlService {
    async create(url){

        const isExist = await urlRepository.getByUrl(url);
        if(isExist){
            return isExist;
        };

        const idGenerator = new IdGenerator(ServerConfig.WORKER_ID);
        const snowflakeId = idGenerator.generate();
        const shortenedUrl = base62.encode(snowflakeId);
        const originalUrl = url;
        
        const response = await urlRepository.create({
            snowflakeId,
            shortenedUrl,
            originalUrl
        });

        return response;
    }

    async redirect(url){
        const id = base62.decode(url).toString();
        const response = await urlRepository.getBySnowflakeId(id);
        if(!response){
            throw new ApiError(StatusCodes.BAD_REQUEST, "Bad Request");
        }
        client.set(id, response.originalUrl);
        client.expire(id, 86400);
        return response.originalUrl;
    }
}

module.exports = UrlService;