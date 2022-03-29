const express = require('express');
const router = express.Router();

const validator = require(`libs/validator`);
const member = require(`libs/member`);
const utils = require(`libs/utils`);

const service_schedule = require(`service/schedule/schedule`);

const Message = require(`libs/message`);

const db = require(`libs/db`);

router.use('/category', require('./category'));


module.exports = router;
