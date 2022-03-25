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


let apis = ['member'];

for(let api of apis){
    router.use('/' + api, require('./' + api + '/' + api));
}


module.exports = router;