import { method, Api, Number, String } from './api.d';


/**登陆接口 */
interface signIn extends Api {
    name: '/admin/signIn',
    method: method.POST,
    request: {
        params: {
            account: String<6, 12>,
            password: String
        }
    }
    respose: {
        return: {
            aid: String,
            account: String,
            _c: String,
            _d: String,
        }
        header: {
            'access-token': String
        }
    }
    needToken: false
}