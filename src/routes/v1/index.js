const express = require('express');

const { Validate } = require('../../middleware')
const { InfoController } = require('../../controllers');
const { InfoValidation } = require('../../validations');

const UrlRouter = require('./url-router');

const router = express.Router();


router.get('/info', Validate(InfoValidation.info), InfoController.info);
router.use('/', UrlRouter);

module.exports = router;