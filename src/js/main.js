// React
import React from 'react'
import ReactDOM from 'react-dom'

// Redux
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import createRootReducer from './reducers'

// Routing
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history'

import App from './components/App'

import '../scss/main.scss'

const history = createHashHistory()
const initialState = {}

const store = createStore(
  createRootReducer(history),
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
)

class Wrapper extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    )
  }
}

ReactDOM.render(
  <Wrapper />,
  document.getElementById('react')
)

