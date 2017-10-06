
let { BaseError, Code, encrypt } = yizo;
module.exports = class UserModel extends yizo.Model {
  /**
   * 获取基本信息
   */
  async info(id) {
    let [data] = await this.query(sqls.user.getUserInfo + ' WHERE id = ? ', id);
    return data;
  }
  /**
   * 修改密码
   */
  async updatePwd({id,password,newPassword}){
    
    //获取用户信息
    let [data ] = await this.query(sqls.user.getUserInfo + ' WHERE id = ? and password=?', id,encrypt.md5(password));
    if(!data){
        throw new BaseError(Code.PASSWORD_ERR);
    }
    let { affectedRows = 0 } = await this.query(sqls.user.update + ' WHERE password = ? ', {password: encrypt.md5(newPassword)}, encrypt.md5(password));

    return affectedRows>0;
  }
  /**
   * 登录接口
   */
  async signIn({ account, password }) {

    let [data = null] = await this.query(sqls.user.signIn, account, encrypt.md5(password));
    if (!data) {
      throw new BaseError(Code.SIGNIN_ERR);
    }
    if (data['_d'] == 1) {
      throw new BaseError(Code.ACCOUNT_DISABLE);
    }
    return data;
  }
  /**
   * 注册
   */
  async signUp({ account, password }) {

    let [data = null] = await this.query(sqls.user.getUserInfo + ' WHERE account = ? ', account);
    if (data) {
      throw new BaseError(Code.ACCOUNT_EXISTS);
    }
    let { affectedRows = 0 } = await this.query(sqls.user.add, { account, password: encrypt.md5(password), nick_name: account });

    return affectedRows > 0;
  }
}