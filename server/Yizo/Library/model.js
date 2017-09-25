let Mysql = require("../Db/mysql");
let { BaseError } = require('../Library/error')
let { Code } = require("../Code/code");

module.exports = class Model extends Mysql {

    constructor(table) {
        super();
    }
    /**
     * 覆盖msyql方法
     * @param {*} sql
     * @param {*} options
     */
    async query(sql, ...options) {
        sql = sql.replace(/\s+/g,' ');
        try {
            //进行字段映射
            let result = await super.query({
                sql,
                // nestTables:'_',
                values: options
            });
            return result;
        } catch (e) {
            console.log(e);
            throw new BaseError(Code.SQL_ERR,e.message);
        }

    }
}