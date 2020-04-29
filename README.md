![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/zzm45po7jgu146nujgks.png)

# Secret Santa

> This project was part of twilio hackathon.

The "problem" I'm solving here:
--

You and your friends want to do the secret santa this christmas and you need a way to randomly pick secret santas for each in the group.

1. User goes to the website.
2. Fill in the info of your friends (Name & Phone number)

Once you've added all of your friends, the system will randomize who gets who as the secret santa. It will then ~~send sms~~ make a phone call to each person in the group telling them who is their "target".

---

> Unfortunately there's no available phone numbers with SMS for Finland in Twilio. So I switched to phone calls instead. 

---

This way no one will know each others target. You only know what you need to know. This way also the "organiser" can participate, because they don't need to be the one that knows all the info.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/mb8u0dc09injiyuit7x1.png)


## Stack
- Firebase (Hosting & Functions)
- Twilio call API
- React


