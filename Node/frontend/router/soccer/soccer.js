var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('soccer/soccer');
});
router.get('/category', function(req, res, next) {
    res.render('soccer/category');
});

module.exports = router;