import React, { useState } from 'react'
import {useNavigate} from 'react-router'
import Header from '../components/Header'

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

const getId = () => new Date().getTime() +'-'+ Math.round(Math.random()*1000)

const FormPage = () => {
  const navigate = useNavigate()

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState([])
  const [friendList, setFriendList] = useState([
    { id: getId(), firstName: '', phoneNumber: ''},
  ])

  const addFriend = () => {
    setFriendList([...friendList, {
      id: getId(),
      firstName: '',
      phoneNumber: ''
    }])
  }

  const deleteFriend = (id) => {
    const newList = friendList.filter((friend) => friend.id !== id)
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

  const fixNumbers = (people) => people.map((person) => ({
    firstName: person.firstName,
    phoneNumber: '+' + person.phoneNumber.replace(/\D/g, '')
  }))


  const checkErrors = (numbers) => {
    const issues = numbers.map((person) => {
      // Number should be 10 characters long
      if(person.phoneNumber.length !== 13) {
        return `${person.firstName}'s phone number does not look correct`
      }

      return false
    })
    .filter(item => item)

    return issues
  }

  const startTheShow = () => {
    if(submitted) {
      return
    }

    setErrors([])

    const fixedNumbers = fixNumbers(friendList)
    const issues = checkErrors(fixedNumbers)
    if (issues[0]) {
      setErrors(
        <div>
          {issues.map((item, index) => <p key={index}>{item}</p>)}
          <p>Example of a phone number: +358 10 123 4567</p>
          <p>(If you want to test with a fake number, use this: +358 01 234 5678)</p>
        </div>
      )

      return
    }

    setSubmitted(true)


    fetch(process.env.REACT_APP_CALL_URL, {
      method: 'POST',
      headers: [
        ["Content-Type", "application/json"]
      ],
      body: JSON.stringify({
        friends: fixedNumbers
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.errors) {
        setErrors(data.errors.map(error => (<p>{error}</p>)))
        setSubmitted(false)
      } else {
        navigate('/thank_you');
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
        <Header/>
        <div className="Content">
          <h1>Add your group</h1>
          <div className="Form">
            {friendList.map((friend) => {
              return FriendRow(friend, updateFriend, deleteFriend)
            })}
            <div className="centered">
              <span className="Button Secondary" onClick={addFriend}>+</span>
            </div>
            <div className="Errors">{errors}</div>
          </div>
        </div>
        <div className="Footer">
          <div className="centered pushdown">
            <span className="Button" onClick={startTheShow}>Start!</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormPage
