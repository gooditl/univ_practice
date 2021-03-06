const service_schedule_category = {};
const Message = require(`libs/message`);

const mysql = require('mysql');
const db = require(`libs/db`);
const organizer = require(`libs/organizer`);

const dao_schedule_category = require(`dao/schedule/category`);

service_schedule_category.select = async () => {
    return await dao_schedule_category.select();
};

service_schedule_category.select_one = async (idx) => {
    return await dao_schedule_category.select_one(idx);
};

service_schedule_category.insert = async (req) => {
    const { name } = req.body;
    const data_obj = {name};

    req.organized_sql = await organizer.get_sql(
        data_obj, Object.keys(data_obj),
        undefined, organizer.time_additional.create_and_update
    );

    const result_insert = await dao_schedule_category.insert(req);

    if(result_insert.affectedRows !== 1){
        throw Message.SERVER_ERROR;
    }

    return result_insert;
};

service_schedule_category.update = async (req, category_idx) => {
    const { name } = req.body;
    const data_obj = {name};

    req.organized_sql = await organizer.get_sql(
        data_obj, Object.keys(data_obj),
        undefined, organizer.time_additional.update_only
    );

    const result_update = await dao_schedule_category.update(req, category_idx);

    if(result_update.affectedRows !== 1){
        throw Message.SERVER_ERROR;
    }

    return result_update;
};

service_schedule_category.delete = async (req, category_idx) => {
    const result_delete = await dao_schedule_category.delete(req, category_idx);

    if(result_delete.affectedRows !== 1){
        throw Message.SERVER_ERROR;
    }

    return result_delete;
};


module.exports = service_schedule_category;
