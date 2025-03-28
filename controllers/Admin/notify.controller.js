const { NotifyToken } = require("../../model/services/notify.model")

var admin = require("firebase-admin");
var serviceAccount = require("./demofires-01-firebase-adminsdk-sbd7f-d13d9819fb.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.createNotifyToken = async (req, res) => {
    const { user_id, token } = req.body
    try {
        if (!user_id || !token) return res.json({
            message: "user_id and token is require!"
        })

        let existToken = await NotifyToken.findOne( { user_id: user_id } )
        if (!existToken) {
            const data = {
                user_id: user_id,
                token: token
            }
            const notifyToken = new NotifyToken(data)
            const saved_notifyToken = await notifyToken.save()
            if (!saved_notifyToken) {
                return res.json({
                    message: "can not save token"
                })
            }
            return res.status(200).json({
                message: "Success!",
                status: true,
                data: saved_notifyToken
            })
        } else {
            existToken.token = token || existToken.token
            const saved_notifyToken = await existToken.save()
            if (!saved_notifyToken) {
                return res.json({
                    message: "can not save token"
                })
            }
            return res.status(200).json({
                message: "Success!",
                status: true,
                data: saved_notifyToken
            })
        }
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.getNotifyTokens = async (req, res) => {
    try {
        
        const notifyTokens  = await NotifyToken.find()
        return res.status(200).json({
            message: "Success!",
            status: true,
            data: notifyTokens
        })

    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.sendNotification = async (req, res) => {
    const { text_title, text_body, users } = req.body
    try {

        const user_tokens = !users ? await NotifyToken.find() : await NotifyToken.find( { user_id: {$in: users} } )
        if (user_tokens.length === 0) {
            return res.status(404).json({
                message: "not any tokens assign",
                data: []
            })
        }

        //const user_tokens = [ { user_id: '001', token: 'fCfwaCJK4g-ma5G_0JlZDD:APA91bHFo00Za_muES7BvHhpM-F-g6opd9wU6mecXr2L74LxPruF3BKLkk2l2LUpc-zPaAoqz1yTV67eEotaPbWZyhf_RgCOC579DX8tAsrbrfB8cCOISIqac2xPBrP3CdC5eTvG6jkW' } ]

        const tokens = user_tokens.map( tok => tok.token )

        const sendedNotify = tokens.map( token => {

            const registrationToken = token
            const message = {
                notification: {
                    title: text_title + "",
                    body: text_body + ""
                },
                android: {
                    notification: {
                        clickAction: 'news_intent'
                    }
                },
                apns: {
                    payload: {
                        aps: {
                            'category': 'INVITE_CATEGORY'
                        }
                    }
                },
                webpush: {
                    fcmOptions: {
                        link: '/?breakingnews'
                    }
                },
                token: registrationToken
            }

            //const messaging = admin.messaging()

            admin.messaging().send(message)
                .then((response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response)
                })
                .catch((error) => {
                    console.log('Error sending message:', error)
                })
        } )

        const sendedSuccess = await Promise.all(sendedNotify)
        if (!sendedSuccess) {
            return res.status(500).json({
                message: "err"
            })
        }

        return res.status(200).json({
            message: "Success!",
            status: true
        })

    }
    catch (err) {
        console.log(err)
        return res.json({
            message: err.message
        })
    }
}