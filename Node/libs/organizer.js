const organizer = {};

const mysql = require('mysql');

let sql_creator = async (data, key) => {
    let sql_col = '';
    let sql_val = '';
    let sql_set = '';

    sql_col += "`" + key + "`, ";

    sql_val += "?, ";
    sql_val = mysql.format(sql_val, [ data ]);

    sql_set += "`" + key + "` = ?, ";
    sql_set = mysql.format(sql_set, [ data ]);

    return { sql_col, sql_val, sql_set };
};

organizer.time_additional = {
    create_only: {col: '`created_at`', val: 'UNIX_TIMESTAMP()', set: '`created_at` = UNIX_TIMESTAMP()'},
    create_and_update: {col: '`created_at`, `updated_at`', val: 'UNIX_TIMESTAMP(),UNIX_TIMESTAMP()', set: '`created_at` = UNIX_TIMESTAMP(), `updated_at` = UNIX_TIMESTAMP()'},
    update_only: {col: '`updated_at`', val: 'UNIX_TIMESTAMP()', set: '`updated_at` = UNIX_TIMESTAMP()'},
};

organizer.get_sql = async (data_obj, require_keys, optional_keys, time_additional) => {
    let sql_col = '';
    let sql_val = '';
    let sql_set = '';

    if(require_keys !== undefined) {
        if(require_keys.constructor !== Array) {
            require_keys = require_keys.replace(/\s/g, '').split(',');
        }

        for (let k of require_keys) {
            let sql_piece = await sql_creator(data_obj[k], k);

            sql_col += sql_piece.sql_col;
            sql_val += sql_piece.sql_val;
            sql_set += sql_piece.sql_set;
        }
    }

    if(optional_keys !== undefined){
        if(optional_keys.constructor !== Array) {
            optional_keys = optional_keys.replace(/\s/g, '').split(',');
        }

        for(let k of optional_keys){
            if(data_obj[k] === undefined) continue;

            let sql_piece = await sql_creator(data_obj[k], k);

            sql_col += sql_piece.sql_col;
            sql_val += sql_piece.sql_val;
            sql_set += sql_piece.sql_set;
        }
    }

    if(time_additional !== undefined){
        sql_col += time_additional.col;
        sql_val += time_additional.val;
        sql_set += time_additional.set;
    }

    return { sql_col, sql_val, sql_set };
};

module.exports = organizer;
