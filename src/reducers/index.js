import { combineReducers } from 'redux'
import Script from './Script'
import Auth from './Auth'
import Version from './Version'

const Reducers = combineReducers({
  Script,
  Auth,
  Version
})

export default Reducers
