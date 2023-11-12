require('dotenv').config()

const cors = require('cors')({ origin: "*" });
const fs = require('fs');
const secretStanta = require('./secret_santa')
const twilio = require('twilio')

const { initializeApp } = require('firebase-admin/app')

const { setGlobalOptions } = require('firebase-functions/v2');
const { onRequest } = require('firebase-functions/v2/https');
const { defineString } = require('firebase-functions/params');

setGlobalOptions({ region: "europe-west3", maxInstances: 3 });

const ACCOUNT_SID = defineString('TWILIO_ACCOUNT_SID')
const PHONE_NUMBER = defineString('TWILIO_PHONE_NUMBER')
const AUTH_TOKEN = defineString('TWILIO_AUTH_TOKEN')
const TWILIO_ALLOWED_NUMBERS = defineString('TWILIO_ALLOWED_NUMBERS')

const TEST_NUMBER = '+358012345678'

initializeApp()

const makeTwilioCall = (name, callTo, targetName) => {
  const accountSid = ACCOUNT_SID.value()
  const authToken = AUTH_TOKEN.value()
  const phoneNumber = PHONE_NUMBER.value()
  const client = twilio(accountSid, authToken);

  // eslint-disable-next-line consistent-return
  fs.readFile('./call_template.xml', (err, data) => {
    if (err) {
      console.log(err)
      return;
    }

    const nameSpelled = targetName.toUpperCase().split('').join('<break strength="x-weak" time="50ms"/>')

    const speakStr = data.toString()
    .replaceAll('NAME_OF_TARGET',targetName)
    .replace('SPELLED_NAME', nameSpelled)
    .replace('NAME_OF_RECEIVER', name)

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

    const allowedNumbers = TWILIO_ALLOWED_NUMBERS.value().split(',').concat([TEST_NUMBER])
    const notAllowedToStart = friendlist.find((friend) => !allowedNumbers.includes(friend.phoneNumber))
    if (notAllowedToStart) {
      return res.status(200).send({
        errors: ['Secret santa app is for limited use only. Unfortunately some of phone numbers do not exists in the allowed numbers list']
      })
    }

    const shuffledList = secretStanta(friendlist)

    // Cleanup circular structure
    const finalList = shuffledList.map((item) => {
      item.target = {
        phoneNumber: item.target.phoneNumber,
        name: item.target.name
      }
      return item
    })

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
