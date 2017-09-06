import Auth from '../adapters/AuthAdapter'
import {
  DID_LOG_IN,
  DID_LOG_OUT
} from './types.js'

export function login (loginParams, history) {
    return function(dispatch) {
      return Auth.login(loginParams)
      .then( user => {
        if (!user.error) {
          dispatch(didLogIn(user))
          localStorage.setItem('jwt', user.jwt )
          history.push('/')
        }
      }) // end then
    }
  } // end login

export function logout(history) {
      localStorage.removeItem('jwt')
      dispatch(didLogOut())
      { auth: { isLoggedIn: false, user:{}}}
      this.setState(, ()=>{history.push('/')})
    }


// Dispatch actions:

export function didLogIn(data){
  return {
    type: DID_LOG_IN,
    payload: data
  }
}

export function didLogOut (data){
  return {
    type: DID_LOG_OUT,
    payload: data
  }
}
