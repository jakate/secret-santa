import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="Welcome Page">
    <div className="Container">
      <img src={require('../img/SantaInCircle.png')} alt=""/>
      <h1>Not found!</h1>
      <Link to='/' className="Button">Go to home page</Link>
    </div>
  </div>
)


export default NotFound
