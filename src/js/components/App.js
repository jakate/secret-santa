import { hot } from 'react-hot-loader/root'
import React, {useState, useEffect} from 'react'
import Routes from './Routes'

const App = () => {
  return (
    <div>
      <Routes />
    </div>
  )
}

export default hot(App)
