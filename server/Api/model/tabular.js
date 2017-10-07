
let { BaseError, Code, encrypt } = yizo;
/**
 * 创建/暂停 0
 * 进行中 1
 * 完成为 2
 */
module.exports = class TabularModel extends yizo.Model {

    async list({ page, pageSize, creater, needPage }) {
        let whereStr = ` WHERE creater= ${this.escape(creater)} `;
        let limitStr = ` LIMIT ${page},${(page + 1) * pageSize} `;

        let [{ count = 0 } = {}] = await this.query(sqls.tabular.count + whereStr);
        if (count == 0) {
            return {
                ...needPage ? { count: 0 } : {},
                list: []
            }
        }
        let data = await this.query(sqls.tabular.list + whereStr + limitStr);
        return {
            ...needPage ? { count: 0 } : {},
            list: data
        };
    }
    /**
     * 获取基本信息
     * @param {*} param0 
     */
    async info(id) {

        //获取信息
        let [tabular = null] = await this.query(sqls.tabular.list + ` WHERE id=${this.escape(id)} `);
        if (!tabular) {
            throw new BaseError(Code.NOT_FOUND_ERR);
        }
        tabular['fields'] = await this.query(sqls.tabular.fieldsList + ` WHERE tabular_id = ${this.escape(id)} ORDER BY sort_id`);
        return tabular;
    }
    async add({ title, explanation, endTime, user_id }) {
        let id = encrypt.md5(new Date() + Math.random() * 1000);
        let { affectedRows = 0 } = await this.query(sqls.tabular.add, { id, title, explanation, end_time: endTime, creater: user_id })
        return affectedRows > 0 ? id : false;
    }
    /**
     * 修改表单
     */
    async update({ id, title, explanation, status }) {

        let { affectedRows = 0 } = await this.query(sqls.tabular.update + ` where id =${this.escape(id)} `, { title, explanation, status });
        return affectedRows;
    }
    /**
     * 删除表单
     */
    async delete(ids) {

        await this.startTrans();
        let { affectedRows: affectedRows1 = 0 } = await this.query(sqls.tabular.deleteField + ' where tabular_id in (?)', ids);
        let { affectedRows: affectedRows2 = 0 } = await this.query(sqls.tabular.del, ids);
        if (affectedRows1 >= 0 && affectedRows2 > 0) {
            await this.commit();
            return true;
        }
        await this.rollback();
        return false;
    }
    /**
     * 添加字段
     */
    async addField({ tabular_id, field_name, field_type, explanation, required, default_value, options }) {


        //获取条数
        let [{ count = 0 } = {}] = await this.query(sqls.tabular.fieldCount + ` WHERE tabular_id=${this.escape(tabular_id)}`);
        let id = encrypt.md5(new Date() + Math.random() * 1000);
        let { affectedRows = 0 } = await this.query(sqls.tabular.addField, {
            id,
            tabular_id,
            field_name,
            field_type,
            sort_id: count + 1,
            explanation, required, default_value, options
        })
        return affectedRows > 0 ? id : false;
    }
    /**
     * 修改字段
     */
    async updateField({ tid, fid, field_name, field_type, explanation, required, default_value, options }) {


        let { affectedRows } = await this.query(sqls.tabular.updateField + ` WHERE id=${this.escape(fid)}`, {
            tabular_id: tid,
            field_name,
            field_type,
            explanation,
            required,
            default_value,
            options
        })
        return affectedRows > 0;
    }
    /**
     * 字段排序呢
     */
    async sortField({ id, field_id, type }) {


        //获取条数
        let [{ count = 0 } = {}] = await this.query(sqls.tabular.fieldCount + ` WHERE tabular_id=${this.escape(id)} `);
        //获取前后记录数据
        let [{ sorts } = {}] = await this.query(
            `select group_concat(id  ORDER BY sort_id) as sorts from tabular_field where tabular_id=${this.escape(id)}`
        );
        //将字段id拼接的字符串转换为数组
        sorts = sorts.toString("utf-8").split(',');
        //获取当前字段的位置
        let current_sort = sorts.indexOf(field_id + '');
        if (type == "up" && current_sort == 0 || (type == "down" && current_sort == sorts.length - 1)) {
            return false;
        }
        //获取需要交换的字段位置
        let new_sort = type == "up" ? current_sort - 1 : current_sort + 1;
        let swap_id = sorts[new_sort];
        //开启事务
        await this.startTrans();
        let { affectedRows = 0 } = await this.query(
            `UPDATE tabular_field
            SET sort_id = CASE
              WHEN id= ?
                THEN ?
              WHEN id= ?
                THEN ?
              END
            WHERE id in(?);
            `, field_id, new_sort + 1, swap_id, current_sort + 1, [field_id, swap_id]
        )
        if (!affectedRows || affectedRows !== 2) {
            await this.rollback();
            return false;
        }
        await this.commit();
        return true;
    }
    /**
     * 删除字段
     */
    async deleteField(tid, ids) {
        try {
            //开启事务
            await this.startTrans();
            //删除字段
            let { affectedRows: affectedRows1 = 0 } = await this.query(sqls.tabular.deleteField + ' where id in (?)', ids);
            //排序字段
            //获取前后记录数据
            let [{ sorts } = {}] = await this.query(
                `select group_concat(id  ORDER BY sort_id) as sorts from tabular_field where tabular_id=${this.escape(tid)}`
            );
            sorts = sorts.toString("utf-8").split(',');
            console.log(affectedRows1, sorts)
            if (affectedRows1 == 0 || (sorts && sorts.length == 0)) {
                await this.commit();
                return true;
            }
            let whenthenStr = '';
            //拼接sql语句
            for (let i = 0; i < sorts.length; i++) {
                whenthenStr += ` when id = ${sorts[i]} then ${i + 1} `;
            }
            let { affectedRows: affectedRows2 = 0 } = await this.query(
                `UPDATE tabular_field SET sort_id = CASE ` + whenthenStr + `END WHERE id in(?) and tabular_id = ?;`, sorts, tid
            )
            if (affectedRows1 > 0 && affectedRows2 > 0) {
                await this.commit();
                return true;
            }
            await this.rollback();
            return false;
        } catch (e) {
            console.log(e);
            await this.rollback();
            return false;
        }
    }
    /**
     * 答题
     */
    async answer(id, ip, data) {

        let fields = await this.query(sqls.tabular.fieldsList + ` WHERE tabular_id = ${this.escape(id)} ORDER BY sort_id`);
        let str = [];
        for (let i = 0; i < fields.length; i++) {
            if (!(fields[i]['id'] in data)) {
                throw new BaseError(PARAMS_ERR)
            }
            str.push(`(${this.escape(encrypt.md5(new Date())) + ',' + this.escape(id) + ',' + this.escape(fields[i]['id']) + ',' + this.escape(data[fields[i]['id']]) + ',' + this.escape(ip)})`);
        }
        let { affectedRows } = await this.query(sqls.tabular.addFieldItem + str.join(','));

        return affectedRows > 0;
    }

    async data(id) {

        let fields = await this.query(sqls.tabular.fieldsList + ` WHERE tabular_id = ${this.escape(id)} ORDER BY sort_id`);
        let strArr = [];
        for (let i = 0; i < fields.length; i++) {
            strArr.push(`MAX(IF(field_id = '${fields[i]['id']}', value, null)) AS ${fields[i]['id']}`)
        }
        let data = await this.query(`SELECT
                user_id,
                ${strArr.join(',')},
                add_ip
            FROM tabular_item
            where tabular_id=${this.escape(id)} GROUP BY user_id  order by id`);
        return {
            fields, data
        }
    }
}