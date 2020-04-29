var _ = require('lodash')
/*
  This is horrible piece of code.
  I wrote it long time a go... I was young and needed the money.
  .. that was a joke, I obviously did not get money for this,
  it was a quick hobby project for my wife and her friends
  when they wanted to do the secret santa
*/
module.exports = function (friendList) {

  var people = friendList.map((person) => {
    return {
      phoneNumber: person.phoneNumber,
      name: person.firstName,
      target: null
    }
  })

  var maxTries = 10
  var tried = 0
  var targets = _.chain(people)
    .clone()
    .shuffle()
    .value()

  function getTarget(person) {
    var picked = null
    var tried = 0

    // Sometimes at the end of this loop we only have the best friend left, and
    // in that case this code kinda fails.
    // If that happens, we just need to try again
    while (picked === null && tried < 100 && targets.length > 0) {
      var targetIndex = Math.floor(Math.random() * targets.length)
      var target = targets[targetIndex]

      if (target && target.name !== person.name) {

        // We don't want two people
        // to have each other as secret santa.
        // Apparently that's not cool
        if (target.target && target.target.name === person.name) {
          console.log('')
        } else {
          picked = target
        }
      }

      tried++
    }

    if (picked === null) {
      return false
    } else {
      targets = _.reject(targets, function (target) {
        return target.name === picked.name
      })

      return picked
    }
  }

  function getList() {
    var failed = false

    var results = _.map(people, function (person) {
      person.target = getTarget(person)

      if (person.target === null) {
        failed = true
      }

      return person
    })

    if (failed) {
      return null
    }

    return results
  }

  var results = null

  while (results === null) {
    results = getList()

    var fail = false

    _.forEach(results, function (person) {
      if (fail === true) {
        return
      }

      if (!person.target) {
        console.log(`FAIL - ${person.name} has no target`)
        fail = true
      }
      else if (person.target.name === person.name) {
        console.log(`FAIL - ${person.name} is his/her own secret santa`)
        fail = true
      }
      else if (person.target.target.name === person.name) {
        console.log(`FAIL - ${person.name} Secret santa is the target of his/her Secret santa. The good old switcharoo`)
        fail = true
      }
    })

    // Check that everyone gets one gift
    people.forEach(function (person) {
      var isInList = _.filter(results, function (r) { return r.target.name === person.name })

      if (isInList.length !== 1) {
        console.log(`${person.name} is getting ${isInList.length} gifts!`)
      }
    })

    // Check that everyone gives one gift
    people.forEach(function (person) {
      var isInList = _.filter(results, function (r) { return r.name === person.name })
      if (isInList.length !== 1) {
        console.log(`${person.name} is giving ${isInList.length} gifts!`)
      }
    })

    if (fail === true) {
      tried++
      results = null

      if (tried >= maxTries) {
        console.log(`Max tries ${maxTries} done. Abort`)
        return
      } else {
        console.log('Retry')
      }

      targets = _.chain(people)
        .clone()
        .shuffle()
        .value()
    }
  }

  return results

}
