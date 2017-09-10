import { BASE_URL } from './baseURL'
import axios from 'axios'

const url = `${BASE_URL}/versions`

export default class VersionsAdapter {

  static show(id){
    return axios.get(`${url}/${id}`)
      .then(json => console.log(json))
  }

  static create(versionParams){
    return fetch(`${url}/`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(versionParams)
    })
      .then(response => response.json())
  }

  static destroy(id){
    return fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: headers()
    })
      .then(response => response.json())
  }

}

function headers () {
  return {
    "content-type": "application/json",
    "accept": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("jwt")
  }
}
