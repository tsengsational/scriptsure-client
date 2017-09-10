import { BASE_URL } from './baseURL'

const url = `${BASE_URL}/scripts`

export default class ScriptsAdapter {

  static show(id){
    return fetch(`${url}/${id}`, {
      headers: headers()
    })
      .then(response => response.json())
  }

  static create(scriptParams){
    return fetch(`${url}`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(scriptParams)
    })
      .then(response => response.json())
  }

  static destroy(id){
    return fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: headers()
    })
      .then(response => response.json())
  }

} // end class

function headers () {
  return {
    "content-type": "application/json",
    "accept": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("jwt")
  }
}
