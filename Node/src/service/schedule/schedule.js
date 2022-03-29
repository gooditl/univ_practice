const service_schedule = {};
const Message = require(`libs/message`);

const mysql = require('mysql');
const db = require(`libs/db`);
const organizer = require(`libs/organizer`);

const dao_schedule = require(`dao/schedule/schedule`);

let sql;

service_schedule.select = async (category_idx, start_date, end_date) => {
    return await dao_schedule.select(category_idx, start_date, end_date);
};

service_schedule.select_one = async (idx) => {
    return await dao_schedule.select_one(idx);
};

service_schedule.insert = async (req) => {
    req.organized_sql = await organizer.get_sql(
        req.body,
        'category_idx, date, location, team1, team1_score, team2, team2_score, content',
        'content_record_url, video_record_url, compare_capability',
        organizer.time_additional.create_and_update
        );

    const result_insert = await dao_schedule.insert(req);

    if(result_insert.affectedRows !== 1){
        throw Message.SERVER_ERROR;
    }

    return result_insert;
};

service_schedule.update = async (req, idx) => {
    req.organized_sql = await organizer.get_sql(
        req.body,
        'category_idx, date, location, team1, team1_score, team2, team2_score, content',
        'content_record_url, video_record_url, compare_capability',
        organizer.time_additional.update_only
    );

    const result_update = await dao_schedule.update(req, idx);

    if(result_update.affectedRows !== 1){
        throw Message.SERVER_ERROR;
    }

    return result_update;
};

service_schedule.delete = async (req, idx) => {
    const result_delete = await dao_schedule.delete(req, idx);

    if(result_delete.affectedRows !== 1){
        throw Message.SERVER_ERROR;
    }

    return result_delete;
};

module.exports = service_schedule;
