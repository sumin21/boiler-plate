const express = require('express')
const app = express()
const port = 5000

const bodyParser = require("body-parser");

//application/x-www-form-urlencoded 데이터를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));
//application.json 을 분석해서 가져옴
app.use(bodyParser.json());

const {User} = require("./models/User");

const mongoose = require('mongoose')
const config = require('./config/key');//

mongoose.connect(config.mongoURI).then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


//route
app.get('/', (req, res) => {
  res.send('hi')
})

//회원가입 route
app.post('/register', (req, res) => {
  //회원가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  //body-parser 덕분에 req.body에 {id:...} 정보들 들어있음
  const user = new User(req.body)
  console.log("🚀 ~ req.body", req.body)
  

  //비번 암호화 (user.js)

  //mongoDB : user에 req.body 정보 저장됨
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    console.log("userinfo", userInfo)
    return res.status(200).json({
      success: true
    })
  })
})

//login route
app.post('/login', (req, res) => {
  //요청된 이메일을 db에서 찾기 (findOne ({조건}, 콜백) : mongodb function)
  User.findOne({ email: req.body.email}, (err, user) => {
    //db에 없는 경우
    if (!user){
      return res.json({
        login: false,
        err: "해당 이메일의 유저가 없습니다."
      })
    }
    
    //db에 있는 경우
    //비밀번호 일치하는지 검증
    user.comparePassword(req.body.password, (err, isMatch) => {
      console.log("🚀 ~ isMatch", isMatch)
      
      if(!isMatch){
        return res.json({
          login: false,
          err: "비밀번호가 틀렸습니다."
        })
      }
      //비밀번호 일치 -> token 생성
      console.log('login')
      user.makeToken((err, user) =>{
        if(err) return res.status(400).send(err);
        
        //token -> cookie (client)
        let userToken = user.token
        return res.cookie("x_auth", userToken).status(200).json({
          login: true,
          userId: user._id
        })
      })
    })


  })
  


})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})