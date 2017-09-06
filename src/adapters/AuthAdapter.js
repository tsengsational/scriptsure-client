import { BASE_URL } from './baseURL'

export default class Auth {
  static login (loginParams) {
    return fetch(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static currentUser () {
    return fetch(`${BASE_URL}/current_user`, {
      headers: {"Authorization": "Bearer " + localStorage.getItem("jwt")}
    }).then(res => res.json())
  }

  static me () {
    return fetch(`${BASE_URL}/me`, {
      headers: {"Authorization": "Bearer " + localStorage.getItem("jwt")}
    }).then(res => res.json())
  }
} // end Auth class

function headers () {
  return {
    "content-type": "application/json",
    "accept": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("jwt")
  }
}
