
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

        let [count = 0] = await this.query(sqls.tabular.count + whereStr);
        if (count == 0) {
            return {
                ...needPage ? { count: 0 } : {},
                list: 0
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

        let { insertId = false } = await this.query(sqls.tabular.add, { title, explanation, end_time: endTime, creater: user_id })
        return insertId;
    }
    /**
     * 修改表单
     */
    async update({ id, title, explanation, status }) {

        let { affectedRows = 0 } = await this.query(sqls.tabular.update + ` where id =${id} `, { title, explanation, status });
        return affectedRows;
    }
    /**
     * 删除表单
     */
    async delete(ids) {
        let { affectedRows = 0 } = await this.query(sqls.tabular.del, ids);
        return affectedRows;
    }
    /**
     * 添加字段
     */
    async addField({ tabular_id, title, type, explanation, require, default_value, options }) {

        let { insertId = false } = await this.query(sqls.tabular.addField, {
            tabular_id,
            field_name: name,
            field_type: type,
            explanation, require, default: default_value, options
        })
        return insertId;
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
    async deleteField(ids){
        let {affectedRows=0} = await this.query(sqls.tabular.deleteField,ids)
        return affectedRows>0;
    }
}