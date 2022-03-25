var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('member/member', { title: 'Express' });
});

router.get('/info', function(req, res, next) {
    res.render('member/info', { title: 'Express' });
});

module.exports = router;