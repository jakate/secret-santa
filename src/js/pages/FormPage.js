import React, { useState } from 'react'

const FriendRow = (friend, updateFriend, deleteFriend) => {
  return (
    <div className="FriendRow" key={friend.id}>
      <div>
        <input
          type="text"
          value={friend.firstName}
          placeholder="First name"
          onChange={(e) => {
            updateFriend(friend.id, 'firstName', e.target.value)
          }}/>
      </div>
      <div>
        <input
          type="text"
          value={friend.phoneNumber}
          placeholder="Phone number"
          onChange={(e) => {
            updateFriend(friend.id, 'phoneNumber', e.target.value)
          }}/>
      </div>
      <div>
        <span className="Button Faded" onClick={() => {
          deleteFriend(friend.id)
        }}>-</span>
      </div>
    </div>
  )
}

const getId = () => {
  return new Date().getTime() +'-'+ Math.round(Math.random()*1000)
}

const FormPage = (props) => {
  const [errors, setErrors] = useState([])
  const [friendList, setFriendList] = useState([
    { id: getId(), firstName: '', phoneNumber: ''}
  ])

  const addFriend = () => {
    const newList = friendList.concat([{
      id: getId(),
      firstName: '',
      phoneNumber: ''
    }])
    setFriendList(newList)
  }

  const deleteFriend = (id) => {
    const newList = friendList.filter((friend) => {
      return friend.id !== id
    })
    setFriendList(newList)
  }

  const updateFriend = (id, key, val) => {
    const newList = friendList.map((friend) => {
      if(friend.id === id) {
        friend[key] = val
      }
      return friend
    })

    setFriendList(newList)
  }

  const startTheShow = () => {
    setErrors([])

    const url = 'https://europe-west3-secret-santa-bfeba.cloudfunctions.net/start'
    //const url = 'http://localhost:5001/secret-santa-bfeba/europe-west3/start'

    fetch(url, {
      method: 'POST',
      headers: [
        ["Content-Type", "application/json"]
      ],
      body: JSON.stringify({
        friends: friendList
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.errors) {
        setErrors(data.errors)
      } else {
        props.history.push('/thank_you')
      }
      return "ok"
    })
    .catch(err => {
      console.log('err')
      console.log(err)
    })
  }

  return (
    <div className="FormPage Page">
      <div className="Container">
        <div className="Header">
          <img src={require('../../img/Santa.png')} />
          <h2>Secret Santa</h2>
        </div>
        <h1>Add your group</h1>
        <div className="GenericForm MultilineForm">
          {friendList.map((friend) => {
            return FriendRow(friend, updateFriend, deleteFriend)
          })}
          <div className="centered">
            <span className="Button Secondary" onClick={addFriend}>+</span>
          </div>
          <div className="centered pushdown">
            <span className="Button" onClick={startTheShow}>Start!</span>
          </div>
          <div className="Errors">{errors}</div>
        </div>
      </div>
    </div>
  )
}

export default FormPage
