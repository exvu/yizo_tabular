
import { Api } from '../api'
import api from '../../config/api'
export default {
    signIn: Api.post('/user/signIn'),
    signUp: Api.post('/user/signUp')
}