import { combineReducers } from 'redux'
import ScriptReducer from './ScriptReducer'
import AuthReducer from './AuthReducer'

const Reducers = combineReducers({
  ScriptReducer,
  AuthReducer
})

export default Reducers
