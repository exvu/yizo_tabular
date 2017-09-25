
let { BaseError, Code,encrypt} = yizo;
module.exports = class AdminModel extends yizo.Model {
  /**
   * 登录接口
   */
  async signIn({ account, password }) {

    let [data=null] = await this.query(sqls.admin.signIn,account,encrypt.md5(password));
    if(!data){
      throw new BaseError(Code.SIGNIN_ERR);
    }
    if(data['_d']==1){
      throw new BaseError(Code.ACCOUNT_DISABLE);
    }
    return data;
  }
}