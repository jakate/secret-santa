import React, { useState } from 'react'

const ThankYou = (props) => {
  return (
    <div className="ThankYou Page">
      <div className="Container">
        <div className="Header">
          <img src={require('../../img/Santa.png')} />
          <h2>Secret Santa</h2>
        </div>
        <h1>Merry Christmas!</h1>
        <p>Keep your phone at hand, phone calls are coming soon 🎅</p>
      </div>
    </div>
  )
}

export default ThankYou
