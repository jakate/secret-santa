import React from 'react'
import {Link} from 'react-router-dom'

const PARTICLE_AMOUNT = 200
const particles = Array.apply(null, Array(PARTICLE_AMOUNT))
  .map((i, index) => {
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
    }
  })

const Welcome = () => (
  <div className="Welcome Page">
    {particles.map((pos, index) => (
      <div
        style={{ left: `${pos.x}%`, top: `${pos.y}%`}}
        key={index}
        className={`particle ${index}`}>
        </div>
    ))}
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
