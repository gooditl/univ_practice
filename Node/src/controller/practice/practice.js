const express = require('express');
const router = express.Router();
const validator = require(`libs/validator`);

router.get('/', async (req, res, next) => {
    await validator.int('number1, number2', req.query);
    await validator.str('cal_type', req.query);

    const { number1, number2, cal_type } = req.query;

    let result;

    if(cal_type === 'minus'){
        result = number1 - number2;
    }else if(cal_type === 'plus'){
        result = number1 + number2;
    }else if(cal_type === 'division'){
        result = number1 / number2;
    }else if(cal_type === 'multiply'){
        result = number1 * number2;
    }

    res.json({
        result
    });
});

router.post('/random', async (req, res, next) => {
    const { max_number } = req.body;

    await validator.int('max_number', req.body);

    const random_number = parseInt(Math.random()*max_number)+1;


    res.json({
        random_number
    })
});



module.exports = router;
