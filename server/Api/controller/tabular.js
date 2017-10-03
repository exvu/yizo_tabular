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
    async update({id, title, explanation,status}){
        let model = new TabularModel();
        let result = await model.update({ id,title, explanation,status});
        return this.json(result);
    }
    /**
     * 删除表单
     */
    async delete({ids}){
        let model = new TabularModel();
        ids = ids.split(',');
        let result = await model.delete(ids);
        return this.json(result);
    }
    /**
     * 添加题目
     */
    async addField({tabular_id,name,type,explanation,require,default_value,options}){

        let model  = new TabularModel();
        let result = await model.addField({tabular_id,name,type,explanation,require,default_value,options});
        return this.json(result);

    }
}