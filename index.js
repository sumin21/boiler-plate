const express = require('express')
const app = express()
const port = 5000
const bodyParser = require("body-parser");

const config = require('./config/key');

//application/x-www-form-urlencoded 데이터를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));

//application.json 을 분석해서 가져옴
app.use(bodyParser.json());


const {User} = require("./models/User");

const mongoose = require('mongoose')

mongoose.connect(config.mongoURI).then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


//router
app.get('/', (req, res) => {
  res.send('hi')
})

//회원가입 router
app.post('/register', (req, res) => {
  //회원가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  //body-parser 덕분에 req.body에 {id:...} 정보들 들어있음
  const user = new User(req.body)

  //mongoDB : user에 req.body 정보 저장됨
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})