require('dotenv').config()

const cors = require('cors')({ origin: "*" });
const fs = require('fs');
const twilio = require('twilio')

const { initializeApp } = require('firebase-admin/app')

const { setGlobalOptions } = require('firebase-functions/v2');
const { onRequest } = require('firebase-functions/v2/https');
const { defineString } = require('firebase-functions/params');
const { shuffle } = require('lodash');

setGlobalOptions({ region: "europe-west3", maxInstances: 3 });

const ACCOUNT_SID = defineString('TWILIO_ACCOUNT_SID')
const PHONE_NUMBER = defineString('TWILIO_PHONE_NUMBER')
const AUTH_TOKEN = defineString('TWILIO_AUTH_TOKEN')
const TWILIO_ALLOWED_NUMBERS = defineString('TWILIO_ALLOWED_NUMBERS')

const CHECK_ALLOWED_NUMBERS = false

const TEST_NUMBER = '+358012345678'

const NATO_APLHABET = {
  A: "Alpha",
  B: "Bravo",
  C: "Charlie",
  D: "Delta",
  E: "Echo",
  F: "Foxtrot",
  G: "Golf",
  H: "Hotel",
  I: "India",
  J: "Juliett",
  K: "Kilo",
  L: "Lima",
  M: "Mike",
  N: "November",
  O: "Oscar",
  P: "Papa",
  Q: "Quebec",
  R: "Romeo",
  S: "Sierra",
  T: "Tango",
  U: "Uniform",
  V: "Victor",
  W: "Whiskey",
  X: "X-ray",
  Y: "Yankee",
  Z: "Zulu",
}

initializeApp()

/*
const VOICE_STYLSE = [
  'horror',
  'military',
  'santa',
  'template',
  'creepy_kid',
]
*/

const SELECTED_STYLE = 'santa'

const makeTwilioCall = (name, callTo, targetName) => {
  const accountSid = ACCOUNT_SID.value()
  const authToken = AUTH_TOKEN.value()
  const phoneNumber = PHONE_NUMBER.value()
  const client = twilio(accountSid, authToken);

  // eslint-disable-next-line consistent-return
  fs.readFile(`./call_${SELECTED_STYLE}.xml`, (err, data) => {
    if (err) {
      console.log(err)
      return;
    }

    const nameLetters = targetName.toUpperCase().split('')
    const nameSpelled = nameLetters.join('<break strength="x-weak" time="50ms"/>')
    const natoName = nameLetters.map((letter) => NATO_APLHABET[letter] || '').join(',')

    const speakStr = data.toString()
    .replaceAll('NAME_OF_TARGET',targetName)
    .replaceAll('SPELLED_NAME', nameSpelled)
    .replaceAll('NAME_OF_RECEIVER', name)
    .replaceAll('NATO_NAME', natoName)

    console.log(speakStr)

    client.calls
      .create({
        twiml: speakStr,
        to: callTo,
        from: phoneNumber
      })
      .then((call) => {
        res.send(call.sid);
        return true;
      })
      .catch((error) => {
        res.send(error);
        return true;
      });
  })
}


exports.start = onRequest(
  { cors: [/secret-santa-bfeba\.web\.app$/, "localhost"] },
  (req, res) => {

    const friendlist = req.body.friends

    if (!friendlist) {
      return res.status(200).send({
        errors: ['Fill the form please']
      })
    }

    //const friendlist = JSON.parse(req.body).friends
    if (friendlist.length < 3) {
      return res.status(200).send({
        errors: ['Not enought friends :(']
      })
    }

    if(CHECK_ALLOWED_NUMBERS) {
      const allowedNumbers = TWILIO_ALLOWED_NUMBERS.value().split(',').concat([TEST_NUMBER])
      const notAllowedToStart = friendlist.find((friend) => !allowedNumbers.includes(friend.phoneNumber))
      if (notAllowedToStart) {
        return res.status(200).send({
          errors: ['Secret santa app is for limited use only. Unfortunately some of phone numbers you\'ve added do not exists in the allowed numbers list']
        })
      }
    }

    const shuffledList = shuffle(friendlist)
    const finalList = shuffledList.map((friend, index) => ({
      ...friend,
      target: shuffledList[index+1] || shuffledList[0]
    }))

    console.log(finalList)
    finalList.forEach(({name, phoneNumber, target}) => {
      console.log('now I will call', name)
      console.log('number', phoneNumber)
      console.log('and tell that his/her target is', target.name)
      if (phoneNumber === TEST_NUMBER) {
        console.log('  Fake number, dont make a real call')
      } else {
        makeTwilioCall(name, phoneNumber, target.name)
      }
      console.log('-------------')
    })

    return res.status(200).send({
      errors: null,
      message: 'Calling'
    })
  }
);
