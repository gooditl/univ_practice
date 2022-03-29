const dao_schedule = {};
const Message = require(`libs/message`);

const mysql = require('mysql');
const db = require(`libs/db`);

let sql;

const base_sql = "SELECT s.idx, s.category_idx, c.name category_name, " +
    "s.date*1000 date, s.location, s.team1, s.team1_score, s.team2, s.team2_score, " +
    "s.content_record_url, s.video_record_url, s.compare_capability, s.content, s.created_at*1000 created_at " +
    "FROM soccer_schedule s " +
    "LEFT JOIN soccer_schedule_category c ON c.idx = s.category_idx ";

dao_schedule.select = async (category_idx, start_date, end_date) => {
    let where_sql = "WHERE s.idx != '' ";

    if(category_idx !== undefined){
        where_sql += "AND c.idx = ? ";
        where_sql = mysql.format(where_sql, [ category_idx ]);
    }

    if(start_date !== undefined){
        where_sql += "AND s.date >= ? ";
        where_sql = mysql.format(where_sql, [ start_date/1000 ]);
    }

    if(end_date !== undefined){
        where_sql += "AND s.date <= ? ";
        where_sql = mysql.format(where_sql, [ end_date/1000 ]);
    }

    sql = base_sql + where_sql + "ORDER BY date ";

    const result = await db.query(sql);

    sql = "SELECT count(*) cnt FROM (" + base_sql + where_sql + ") a ";

    const result_cnt = await db.query(sql);

    return { result, total_cnt: result_cnt[0].cnt };
};


dao_schedule.select_one = async (idx) => {
    sql = base_sql + "WHERE s.idx = ? ";
    sql = mysql.format(sql, [ idx ]);

    return await db.query(sql);
};

dao_schedule.insert = async (req,) => {
    const { sql_col, sql_val } = req.organized_sql;

    sql = "INSERT INTO soccer_schedule " +
        "(" + sql_col + ") " +
        "VALUES(" + sql_val + ")";

    return await db.run(req.connector, sql);
};


dao_schedule.update = async (req, idx) => {
    const  { sql_set } = req.organized_sql;

    sql = "UPDATE soccer_schedule " +
        "SET " + sql_set + " " +
        "WHERE idx = ? ";
    sql = mysql.format(sql, [ idx ]);

    return await db.run(req.connector, sql);
};


dao_schedule.delete = async (req, idx) => {
    sql = "DELETE FROM soccer_schedule " +
        "WHERE idx = ? ";
    sql = mysql.format(sql, [ idx ]);

    return await db.run(req.connector, sql);
};

module.exports = dao_schedule;
