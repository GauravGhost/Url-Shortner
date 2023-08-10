const express = require('express');

const { Validate, UrlCache } = require('../../middleware')
const { UrlValidation } = require('../../validations');
const { UrlController } = require('../../controllers');



const router = express.Router();


router.post('/', Validate(UrlValidation.create), UrlController.create);
router.get('/:url', UrlCache, UrlController.redirect)

module.exports = router;