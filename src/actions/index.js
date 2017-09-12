import Auth from '../adapters/AuthAdapter'
import VersionsAdapter from '../adapters/VersionsAdapter'
import ScriptsAdapter from '../adapters/ScriptsAdapter'
import {
  DID_LOG_IN,
  DID_LOG_OUT,
  ADD_VERSION,
  ADD_SCRIPT,
  GET_SCRIPT_VERSIONS,
  CURRENT_VERSION,
  SET_CHARACTERS
} from './types.js'

export function login (loginParams, history) {
    return function(dispatch) {
      return Auth.login(loginParams)
      .then( user => {
        if (!user.error) {
          dispatch(didLogIn(user))
          localStorage.setItem('jwt', user.jwt )
          history.push('/dashboard')
        }
      }) // end then
    }
  } // end login

export function logout(history) {
  return function(dispatch){
    localStorage.removeItem('jwt')
    dispatch(didLogOut())
    history.push('/')}
  }

export function currentUser(){
  console.log('inside currentUser top level')
  return function(dispatch){
    console.log('inside currentUser second level')
    return Auth.currentUser()
      .then( json => {
        dispatch(didLogIn(json))
        console.log('got current user')
      })
      .catch(err => console.log(err))
  }
}

export function saveVersion(versionParams) {
  return function(dispatch) {
    return VersionsAdapter.create(versionParams)
      .then(data => {
        dispatch(addVersion(data.payload))
        console.log(data)
        alert("Your script has been saved.")
      })
  }
}

export function newScript(scriptParams) {
  return function(dispatch) {
    return ScriptsAdapter.create(scriptParams)
      .then(data => {
        console.log(data)
        dispatch(addScript(data))
        currentUser()(dispatch)
      })
  }
}

export function deleteScript(id) {
  console.log('deleting script')
  return function(dispatch) {
    return ScriptsAdapter.destroy(id)
      .then(()=> currentUser()(dispatch) )
  }
}


export function getVersions(id) {
  console.log('getting versions')
  return function(dispatch) {
    return ScriptsAdapter.show(id)
      .then(data => {
        console.log(data)
        dispatch(getScriptVersions(data))
        currentUser()(dispatch)
        return data
      })
  }
}

export function deleteVersion(id){
  console.log('deletingVersion')
  return function(dispatch) {
    return VersionsAdapter.destroy(id)
      .then((data) => {
        const script_id = data.script_id
        currentUser()(dispatch)
        getVersions(script_id)(dispatch)
      })
  }
}

export function setCurrentVersion(version){
  console.log('setting current version')
  return function (dispatch) {
    console.log('set current version')
    return dispatch(currentVersion(version))
  }
}

export function getCharacters(characters){
  console.log('getting current characters')
  return function (dispatch) {
    console.log('setting current characters')
    return dispatch(setCharacters(characters))
  }
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

export function addVersion (data){
  return {
    type: ADD_VERSION,
    payload: data
  }
}

export function addScript (data){
  return {
    type: ADD_SCRIPT,
    payload: data
  }
}

export function getScriptVersions (data) {
  return {
    type: GET_SCRIPT_VERSIONS,
    payload: data
  }
}

export function currentVersion (data) {
  return {
    type: CURRENT_VERSION,
    payload: data
  }
}

export function setCharacters (data) {
  return {
    type: SET_CHARACTERS,
    payload: data
  }
}
