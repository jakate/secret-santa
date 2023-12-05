import React from 'react'
import Routes from './Routes'

const PARTICLE_AMOUNT = 200
const particles = Array.apply(null, Array(PARTICLE_AMOUNT))
  .map((i, index) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  }))

const App = () => (
  <div>
    {particles.map((pos, index) => (
      <div
        style={{ left: `${pos.x}%`, top: `${pos.y}%`}}
        key={index}
        className={`particle ${index}`}>
        </div>
    ))}
    <Routes />
  </div>
)

export default App
