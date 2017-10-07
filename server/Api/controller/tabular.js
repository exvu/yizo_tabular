let { BaseError, Code } = yizo;
let TabularModel = require("../model/tabular")
module.exports = class TabularController extends yizo.Controller {

    /**
     * 获取所有表单
     * @param {*} param0 
     */
    async list({ page = 1, pageSize = 5, needPage = false, creater }) {
        let model = new TabularModel();

        let data = { page: page - 1, pageSize, needPage };
        if (this.reqUser.type = "user") {
            data['creater'] = this.reqUser.id;
        } else {
            creater && (
                data['creater'] = creater
            );
        }
        let result = await model.list(data);
        return this.json(result);
    }
    /**
     * 获取基本信息
     */
    async info({ id }) {
        let model = new TabularModel();
        let data = await model.info(id);
        return this.json(data);
    }
    /**
     * 添加表单
     * @param {*} param0 
     */
    async add({ title, explanation, endTime }) {
        let model = new TabularModel();
        let data = await model.add({ title, explanation, endTime, user_id: this.reqUser.id });
        return this.json(data);
    }
    /**
     * 修改表单
     */
    async update({ id, title, explanation, status }) {
        let model = new TabularModel();
        let result = await model.update({ id, title, explanation, status });
        return this.json(result);
    }
    /**
     * 删除表单
     */
    async delete({ ids }) {
        let model = new TabularModel();
        ids = (ids + '').split(',');
        let result = await model.delete(ids);
        return this.json(result);
    }
    /**
     * 添加字段
     */
    async addField({ id: tabular_id, field_name, field_type, explanation, required = 0, default_value, options }) {

        let model = new TabularModel();
        let result = await model.addField({ tabular_id, field_name, field_type, explanation, required, default_value, options });
        return this.json(result);

    }
    /**
     * 修改字段
     */
    async updateField({ tid, fid, field_name, field_type, explanation, required = 0, default_value, options }) {
        let model = new TabularModel();
        let result = await model.updateField({ tid, fid, field_name, field_type, explanation, required, default_value, options });
        return this.json(result);
    }
    /**
     * 字段排序
     */
    async sortField({ id, field_id, type = 'down' }) {
        let model = new TabularModel();
        let result = await model.sortField({ id, field_id, type });
        return this.json(result);
    }
    /**
     * 删除字段
     */
    async deleteField({ tid, ids }) {
        //转换为数组
        ids = (ids + '').split(',');
        let model = new TabularModel();
        let result = await model.deleteField(tid, ids);
        return this.json(result);
    }
    /**
     * 答题
     */
    async answer({id,data}){

        let ip = this.request.headers['x-forwarded-for'] ||
        this.request.connection.remoteAddress ||
        this.request.socket.remoteAddress ||
        this.request.connection.socket.remoteAddress;
        let model = new TabularModel();
        let result = await model.answer(id, ip,data);
        return this.json(result)
    }
    async data({id}){

        let model = new TabularModel();
        let data = await model.data(id);
        return this.json(data)
    }
}