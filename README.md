
# Secret Santa

![Secret Santa](santa.png)


This is a project built for a YouTube video. Just a simple prototype, not a full fledged, production ready application.

if you're interested, check out the video to get better understanding on what it really is.

https://youtu.be/9B7RUaB_lx4

The "problem" I'm solving here:
--

You and your friends want to do the secret santa this christmas and you need a way to randomly pick secret santas for each in the group.

1. User goes to the website.
2. Fill in the info of your friends (Name & Phone number).
3. Each person will get informatio who is their "target".

Once you've added all of your friends, the system will randomize who gets whom as their secret santa. It will then make a phone call to each person in the group telling them who is their "target" (I know SMS would make a lot more sense, but it's not nearly as creepy).

This way no one will know each others target. You only know what you need to know. This way also the "organiser" can participate, because they don't need to be the one that knows all the info.


## Stack
- Firebase (Hosting & Functions)
- Twilio call API
- React

## Frontend Dev

Dev:

```
$ npm install
$ npm start
```

## Backend dev

You need to have a set up firebase account and a project with Functions and Hosting enabled.

Dev:

```
$ firebase emulators:start
```

Deploy functions:

```
$ firebase deploy --only function
```

Deploy the whole app:

```
$ npm run build
$ firebase deploy
```

