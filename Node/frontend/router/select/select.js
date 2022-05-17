var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('select/select');
});

module.exports = router;