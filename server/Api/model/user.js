
let { BaseError, Code,encrypt} = yizo;
module.exports = class UserModel extends yizo.Model {
  /**
   * 登录接口
   */
  async signIn({ account, password }) {

    let [data=null] = await this.query(sqls.user.signIn,account,encrypt.md5(password));
    if(!data){
      throw new BaseError(Code.SIGNIN_ERR);
    }
    if(data['_d']==1){
      throw new BaseError(Code.ACCOUNT_DISABLE);
    }
    return data;
  }
  /**
   * 注册
   */
  async signUp({ account, password }){

    let [data=null] = await this.query(sqls.user.getUserInfo,account);
    if(data){
      throw new BaseError(Code.ACCOUNT_EXISTS);
    }
    let {affectedRows=0} = await this.query(sqls.user.add,{account,password:encrypt.md5(password),nick_name:account});

    return affectedRows>0;
  }
}