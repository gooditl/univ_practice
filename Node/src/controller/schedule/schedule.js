const express = require('express');
const router = express.Router();

const validator = require(`libs/validator`);
const member = require(`libs/member`);
const utils = require(`libs/utils`);

const service_schedule = require(`service/schedule/schedule`);
const service_schedule_category = require(`service/schedule/category`);

const Message = require(`libs/message`);

const db = require(`libs/db`);

router.use('/category', require('./category'));

router.get('/', async (req, res, next) => {
    const { category_idx, start_date, end_date } = req.query;

    if(category_idx !== undefined){
        const category_info = await service_schedule_category.select_one(category_idx);

        if(category_info.length === 0){
            throw Message.NOT_EXIST('카테고리');
        }
    }

    if(start_date !== undefined){
        await validator.int('start_date', req.query);
    }

    if(end_date !== undefined){
        await validator.int('end_date', req.query);
    }

    if(end_date < start_date){
        throw Message.DETAIL_ERROR('시작일이 종료일보다 미래일 수 없습니다.');
    }

    const {result, total_cnt} = await service_schedule.select(category_idx, start_date, end_date);

    res.json({
        items: result,
        total_cnt
    });
});

router.post('/', async (req, res, next) => {
    const { category_idx } = req.body;

    await validator.str('location, team1, team2, content', req.body);
    await validator.int('category_idx, date, team1_score, team2_score', req.body);
    req.body.date = req.body.date/1000;

    const category_info = await service_schedule_category.select_one(category_idx);

    if(category_info.length === 0){
        throw Message.NOT_EXIST('카테고리');
    }

    req.connector = await db.get_connection();

    const result_insert = await service_schedule.insert(req);

    await db.commit(req.connector);

    res.json({
        schedule_idx: result_insert.insertId
    });
});

router.use('/:schedule_idx(\\d+)', (() => {
    const router = express.Router({
        mergeParams: true
    });

    router.use(async (req, res, next) => {
        const { schedule_idx } = req.params;

        const schedule_info = await service_schedule.select_one(schedule_idx);

        if(schedule_info.length === 0){
            throw Message.NOT_EXIST('일정');
        }

        req.schedule_info = schedule_info[0];

        next();
    });

    router.patch('/', async (req, res, next) => {
        const { category_idx } = req.body;

        await validator.str('location, team1, team2, content', req.body);
        await validator.int('category_idx, date, team1_score, team2_score', req.body);
        req.body.date = req.body.date/1000;

        const category_info = await service_schedule_category.select_one(category_idx);

        if(category_info.length === 0){
            throw Message.NOT_EXIST('카테고리');
        }

        req.connector = await db.get_connection();

        await service_schedule.update(req, req.schedule_info.idx);

        await db.commit(req.connector);

        res.json({
            result: true
        });
    });

    router.delete('/', async (req, res, next) => {
        req.connector = await db.get_connection();

        await service_schedule.delete(req, req.schedule_info.idx);

        await db.commit(req.connector);

        res.json({
            result: true
        });

    });

    return router;
})());


module.exports = router;
