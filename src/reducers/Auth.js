import {
  DID_LOG_IN,
  DID_LOG_OUT,
} from '../actions/types'

export default function (state = {
  user: {
            username: '',
            first_name: '',
            last_name: '',
            email: ''
          },
          scripts: [],
          isLoggedIn: false
}, action) {
  switch (action.type) {
    case DID_LOG_IN:
      return {...state,
        isLoggedIn: true,
        scripts: action.payload.scripts,
        user: action.payload.user
      }
    case DID_LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        scripts: []
      }
    default:
      return state;
  }
}
