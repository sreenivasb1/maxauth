const express = require('express');
const router = express.Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
var mongoDB = 'mongodb://127.0.0.1/my_authentication';
mongoose.connect(mongoDB, {useNewUrlParser: true}).then(() => {
  console.log('connected to database');
}).catch(() => {
  console.log('connection failed')
});

// tokens in backend
function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('unauthorised request')
    }
    let token = req.headers.authorization.split(' ')[1] // 0 will be bearer so 1 will be token
    if (token === 'null') {
        return res.status(401).send('unauthorised request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send('unauthorised request')
    }
    req.userId = payload.subject
    next()
}



//router.get('/', (req, res) => {
 //  res.send('from route')
//})


router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
       if (error) {
           console.log(error)
       } else{
           let payload = { subject: registeredUser._id}
           let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
       }
    })
})



router.post('/login', (req,res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                res.status(401).send('invalid email')
            } else {
              if (user.password !== userData.password) {
                  res.status(401).send('invalid password')
              }  else {
                  let payload = { subject: user._id }
                  let token = jwt.sign(payload, 'secretKey')
                  res.status(200).send({token})
              }
            }
        }
    })
})


router.get('/events',verifyToken, (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          }
    ]
  res.json(events)
})

router.get('/special',verifyToken, (req, res) => {
    let specialEvents = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          }
    ]
  res.json(specialEvents)
})




module.exports = router