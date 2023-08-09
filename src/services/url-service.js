const base62 = require("base62/lib/ascii");

const {UrlRepository} = require('../repositories');
const {IdGenerator} = require('../utils')
const {ServerConfig} = require('../config')
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
}

module.exports = UrlService;