const dao_schedule_category = {};
const Message = require(`libs/message`);

const mysql = require('mysql');
const db = require(`libs/db`);

let sql;

dao_schedule_category.select = async () => {
    sql = "SELECT idx, name " +
        "FROM soccer_schedule_category " +
        "ORDER BY name ";

    return await db.query(sql);
};

dao_schedule_category.select_one = async (idx) => {
    sql = "SELECT idx, name " +
        "FROM soccer_schedule_category " +
        "WHERE idx = ? ";
    sql = mysql.format(sql, [ idx ]);

    return await db.query(sql);
};

dao_schedule_category.insert = async (req) => {
    const { sql_col, sql_val } = req.organized_sql;

    sql = "INSERT INTO soccer_schedule_category " +
        "(" + sql_col + ") " +
        "VALUES(" + sql_val + ") ";

    return await db.run(req.connector, sql);
};

dao_schedule_category.update = async (req, idx) => {
    const { sql_set } = req.organized_sql;

    sql = "UPDATE soccer_schedule_category " +
        "SET " + sql_set + " " +
        "WHERE idx = ? ";
    sql = mysql.format(sql, [ idx ]);

    return await db.run(req.connector, sql);
};

dao_schedule_category.delete = async (req, idx) => {
    sql = "DELETE FROM  soccer_schedule_category " +
        "WHERE idx = ? ";
    sql = mysql.format(sql, [ idx ]);

    return await db.run(req.connector, sql);
};


module.exports = dao_schedule_category;
