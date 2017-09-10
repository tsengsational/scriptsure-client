import {
  ADD_SCRIPT,
  GET_SCRIPT_VERSIONS
} from '../actions/types'

export default function (state = {
  id: 0,
  title: '',
  subtitle: '',
  latest: {},
  versions: []
}, action) {
  switch (action.type) {
    case ADD_SCRIPT:
      console.log(action.payload)
      return {
        ...state,
        id: action.payload.id,
        title: action.payload.title,
        subtitle: action.payload.subtitle,
      }
    case GET_SCRIPT_VERSIONS:
      console.log(action)
      return {
        ...state,
        id: action.payload.script.id,
        title: action.payload.script.title,
        subtitle: action.payload.script.subtitle,
        latest: action.payload.latest,
        versions: action.payload.versions
      }
    default:
      return state;
  }
}
