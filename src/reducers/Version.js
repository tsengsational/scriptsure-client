import {
  ADD_VERSION,
  CURRENT_VERSION,
} from '../actions/types'

export default function (state = {versions: [], script: {}, currentVersion: {}}, action) {
  switch (action.type) {
    case CURRENT_VERSION:
      return {
        ...state,
        currentVersion: action.payload
      }
    case ADD_VERSION:
      return {
        ...state,
        versions: [
          ...state.versions,
          action.version
        ],
        script: action.script
      }
    default:
      return state;
  }
}
