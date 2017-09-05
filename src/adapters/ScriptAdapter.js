import BASE_URL from './baseURL'
import axios from 'axios'

export default class ScriptAdapter {

const url = `${BASE_URL}/scripts`

  show(id){
    return axios.get(`${url}/${id}`)
      .then()
  }

}
