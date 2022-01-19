const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const saltRounds = 10


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //space 제거
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {//유효성 검사
        type: String
    },
    tokenExp: {//token 유효기간
        type: Number
    }
})
//user에 정보 저장하기 전에
userSchema.pre('save', function(next){
    var user = this;

    //비밀번호가 바뀔 때만
    if(user.isModified('password')) {
        //비밀번호 암호화
        //salt 생성 <- saltRounds 이용
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    } else{
        next()
    }
})

userSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) =>{
        if(err) return callback(err)
        callback(null, isMatch)
    })
}

userSchema.methods.makeToken = function (callback) {
    let user = this;

    let token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token;
    user.save((err, user) => {
        if(err) return callback(err)
        callback(null, user)
    })
}

userSchema.statics.findByToken = function(token, callback) {
    let user = this;

    //token을 decode한다.
    jwt.verify(token, 'secretToken', (err, decoded) =>{
        //user id로 user 찾기
        //client에서 가져온 token과 db에 보관된 token 비교
        user.findOne({"_id": decoded, "token": token}, (err,user) => {
            if(err) return callback(err)
            callback(null, user)
        })
    })
}


const User = mongoose.model('User', userSchema)//

module.exports = {User} //다른 파일에서도 이 model 쓰고 싶으니까 export