import React from 'react'
import {Link} from 'react-router-dom'
const Header = () => (
  <div className="Header">
    <Link to='/'>
      <img src={require('../img/Santa.png')} alt=""/>
      <h2>Secret Santa</h2>
    </Link>
  </div>
)


export default Header
