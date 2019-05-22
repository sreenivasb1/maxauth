const express = require('express');
const router = express.Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const checkAuth = require('../middleware/check-auth')

const mongoose = require('mongoose')
var mongoDB = 'mongodb://127.0.0.1/my_authentication';
mongoose.connect(mongoDB, {useNewUrlParser: true}).then(() => {
  console.log('connected to database');
}).catch(() => {
  console.log('connection failed')
});

// tokens in backend
/*function verifyToken(req, res, next) {
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
}*/



/*router.post('/register', (req, res) => {
    
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
})*/

router.post("/register", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({                                    
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user                                                           
              .save()
              .then(result => {
                console.log(result);
                let decoded = 
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});






/*router.post('/login', (req,res) => {
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
})*/

router.post('/login',(req,res,next) => {
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if (user.length < 1) {
      res.status(401).json({
        message: 'auth failed'
      })
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if(err) {
        return res.status(401).json({
          message: 'auth failed'
        })
      }
      if(result) {
        const token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        },"secretKey", {
          expiresIn: "1h"
        })
         return res.status(200).json({
           message: 'auth success',
           token: token
         })
      }
      res.status(401).json({
        message: 'auth failed'
      })
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
})


router.get('/events',checkAuth, (req, res) => {
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

router.get('/special',checkAuth, (req, res) => {
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