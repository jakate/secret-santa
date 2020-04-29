import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const Welcome = () => {
  return (
    <div className="Welcome Page">
      <div className="Container">
        <img src={require('../../img/SantaInCircle.png')} />
        <h1>Secret Santa</h1>
        <Link to='/start' className="Button">Let's go!</Link>
      </div>
    </div>
  )
}

export default Welcome
