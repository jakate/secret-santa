require('dotenv').config()

const fs = require('fs');

// Firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: "*"});
admin.initializeApp();

//const cors = require('cors')({ origin: "*", credentials: true, methods: "GET" })

// Twilio
const accountSid = functions.config().twilio.account_sid
const authToken = functions.config().twilio.auth_token
const phoneNumber = functions.config().twilio.phone_number
const allowedNumbers = functions.config().twilio.allowed_numbers.split(',')
const client = require('twilio')(accountSid, authToken);

const secretStanta = require('./secret_santa')

const makeTwilioCall = (callTo, name) => {
  console.log('call', name)

  client.calls
    .create({
      url: 'https://europe-west3-secret-santa-bfeba.cloudfunctions.net/speak/?name=' + name,
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
}

exports.start = functions.region('europe-west3').https.onRequest((req, res) => {
  console.log('start')
  console.log(req.body)
  return cors(req, res, () => {
    const friendlist = req.body.friends

    if(!friendlist) {
      return res.status(200).send({
        errors: ['Fill the form please']
      })
    }

    console.log('friendlist')
    console.log(friendlist)
    //const friendlist = JSON.parse(req.body).friends
    if (friendlist.length < 3) {
      return res.status(200).send({
        errors: ['Not enought friends :(']
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

    finalList.forEach((person) => {
      console.log('now I would call', person.name)
      console.log('number', person.phoneNumber)
      console.log('and tell that his/her target is', person.target.name)
      if (allowedNumbers.indexOf(person.phoneNumber > 0)) {
        console.log('calling')
        makeTwilioCall(person.phoneNumber, person.target.name)
      } else {
        console.log('not calling')
      }
      console.log('-------------')
    })

    return res.status(200).send({
      errors: null,
      message: 'Calling'
    })
  })
})

exports.speak = functions.region('europe-west3').https.onRequest((req, res) => {
  const name = req.query.name
  console.log('call', name)

  return cors(req, res, () => {
    if (!name) {
      res.status(400).send('Name not found')
      return
    }

    fs.readFile('./call_template.xml', (err, data) => {
      if(err) {
        console.log(err)

        res.status(500).send('Something went wrong. Could not read XML');
        return true;
      }

      const speakStr = data.toString()
        .split('NAME_OF_TARGET')
        .join(name)

      res
        .set("Content-Type", "text/xml; charset=utf8")
        .status(200)
        .send(speakStr);

      return true
    })
  })
});
