const express = require('express');
const router = express.Router();

const validator = require(`libs/validator`);
const member = require(`libs/member`);
const utils = require(`libs/utils`);

const service_schedule_category = require(`service/schedule/category`);

const Message = require(`libs/message`);

const db = require(`libs/db`);

router.get('/', async (req, res, next) => {
    const category_list = await service_schedule_category.select();

    res.json(
        {category_list}
    );
});

router.post('/', async (req, res, next) => {
    await validator.str('name', req.body);

    req.connector = await db.get_connection();

    await service_schedule_category.insert(req);

    await db.commit(req.connector);

    res.json(true);
});

router.use('/:category_idx(\\d+)', (() => {
    let router = express.Router({
        mergeParams: true
    });

    router.use(async (req, res, next) => {
        const { category_idx } = req.params;

        const category_info = await service_schedule_category.select_one(category_idx);

        if(category_info.length === 0){
            throw Message.NOT_EXIST('카테고리');
        }

        req.category_info = category_info[0];

        next();
    });

    router.patch('/', async (req, res, next) => {
        await validator.str('name', req.body);

        req.connector = await db.get_connection();

        await service_schedule_category.update(req, req.category_info.idx);

        await db.commit(req.connector);

        res.json(true);
    });

    router.delete('/', async (req, res, next) => {
        req.connector = await db.get_connection();

        await service_schedule_category.delete(req, req.category_info.idx);

        await db.commit(req.connector);

        res.json(true);
    });


    return router;
})());

module.exports = router;
