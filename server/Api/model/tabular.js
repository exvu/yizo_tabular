
let { BaseError, Code,encrypt} = yizo;
/**
 * 创建/暂停 0
 * 进行中 1
 * 完成为 2
 */
module.exports = class TabularModel extends yizo.Model {

    async list({page,pageSize,creater,needPage}){
        let whereStr=` WHERE creater= ${this.escape(creater)} `;
        let limitStr = ` LIMIT ${page},${(page+1)*pageSize} `;

        let [count=0] = await this.query(sqls.tabular.count+whereStr);
        if(count==0){
            return {
                ...needPage?{count:0}:{},
                list:0
            }
        }
        let data = await this.query(sqls.tabular.list+whereStr+limitStr);
        return {
            ...needPage?{count:0}:{},
            list:data
        };
    }
    async add({title,explanation,endTime,user_id}){

        let {insertId=false} = await this.query(sqls.tabular.add,{title,explanation,end_time:endTime,creater:user_id})
        return insertId;
    }
    /**
     * 修改表单
     */
    async update({id, title, explanation,status}){
        
        let {affectedRows=0} = await this.query(sqls.tabular.update+` where id =${id} `,{title,explanation,status});
        return affectedRows;
    }
    /**
     * 删除表单
     */
    async delete(ids){
        let {affectedRows=0} = await this.query(sqls.tabular.del,ids);
        return affectedRows;
    }
    /**
     * 添加题目
     */
    async addField({tabular_id,title,type,explanation,require,default_value,options}){

        let {insertId=false} = await this.query(sqls.tabular.addField,{
            tabular_id,
            field_name:name,
            field_type:type,
            explanation,require,default:default_value,options
        })
        return insertId;
    }
}