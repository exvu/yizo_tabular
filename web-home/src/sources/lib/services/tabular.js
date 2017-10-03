
import { Api } from '../api'
import api from '../../config/api'
export default {
    add: Api.post('/tabular/add'),
    list:Api.get('/tabular'),
    update:Api.put('/tabular/:id'),
    info:Api.get("/tabular/:id"),
    sortField:Api.put("/tabular/field/sort/:id"),
    deleteField:Api.delete("/tabular/field")
}