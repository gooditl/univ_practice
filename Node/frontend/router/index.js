var express = require('express');
var router = express.Router();

router.use((req, res, next) => {

    next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
    const title = '메인 페이지';

    res.render('index', {title});
});

router.use('/member', require('./member/member'));
router.use('/soccer', require('./soccer/soccer'));
router.use('/practice', require('./practice/practice'));
router.use('/lotto', require('./lotto/lotto'));
router.use('/book', require('./book/book'));



module.exports = router;