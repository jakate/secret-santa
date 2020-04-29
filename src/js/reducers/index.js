import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import ui from './ui'

export default (history) => combineReducers({
  router: connectRouter(history),
  ui: ui
})
