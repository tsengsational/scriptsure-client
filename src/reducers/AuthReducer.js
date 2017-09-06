import {
  DID_LOG_IN
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case DID_LOG_IN:
      return {...state,
        isLoggedIn: true,
        scripts: action.payload.scripts
      }
    default:
      return state;
  }
}
