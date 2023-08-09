const express = require('express');

const { Validate } = require('../../middleware')
const { UrlValidation } = require('../../validations');
const { UrlController } = require('../../controllers');


const router = express.Router();


router.post('/', Validate(UrlValidation.create), UrlController.create);

module.exports = router;