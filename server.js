const express = require("express")
const app = express()
app.use(express.json())
app.use(express.static("public"))
const webPush = require("web-push")
// ./node_modules/.bin/web-push generate-vapid-keys
//this returns public and private key
const publicKey = "BGSVN9M_KD0zPxmxgzXRbdKXZqq-y45K5bs2DB17o50yjxzG0FPcCs58EuwihU-uaCiuWxkA5HEYV5M2BdBPYnk"
const privateKey = "wD-y7q9qR6BJJi-UITUP9a6l1e0DU3-h97p1HKI3WkQ"

const subject = "https://localhost:3030"
webPush.setVapidDetails(subject, publicKey, privateKey)

app.post("/", (req, res) => {
    const subscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/fpnLdboBxow:APA91bFxPyKtTXFX_J6ULzvm1wVyYTElox5NoJ-pRz3JjyDxVwavihzeZtcKlyJ3u-Fpl-3jkA0J7EsBxSngK3NygzDd_gLQp24XQoDlQ3WX_NkM-wjBwqyfn2I3rfC8YeWSSCAgxSNU","expirationTime":null,"keys":{"p256dh":"BPl9nFsb6hTlmjtzchZHZYmwnn05jha7r6Enl2QNfhzsrt56ggjPnCKXyQXplkasbveIwKmQJrc7KCgzWmDHrNo","auth":"6FuoMO6tvULER96sNIdGXA"}}
    const payload =JSON.stringify(req.body)
    webPush.sendNotification(subscription, payload)
        .catch(err => console.log(err))
    res.send("success")
})

app.listen(3030, () => console.log('server started'))