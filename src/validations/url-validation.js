const Joi = require("joi");

const create = {
    body: Joi.object().keys({
        url: Joi.string().required(),
    }),
};

module.exports = {
    create,
};