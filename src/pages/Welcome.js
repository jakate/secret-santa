import React from 'react'
import {Link} from 'react-router-dom'

const Welcome = () => (
  <div className="Welcome Page">
    <div className="Container">
      <div className="Content">
        <img src={require('../img/SantaInCircle.png')} alt=""/>
        <h1>Secret Santa</h1>
        <Link to='/start' className="Button">Let's go!</Link>
      </div>
    </div>
  </div>
)


export default Welcome
