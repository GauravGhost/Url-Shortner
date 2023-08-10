const Joi = require("joi");

const create = {
    body: Joi.object().keys({
        url: Joi.string().uri().required(),
    }),
};



module.exports = {
    create,
};