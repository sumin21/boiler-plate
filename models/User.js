const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema)

module.exports = {User} //다른 파일에서도 이 model 쓰고 싶으니까 export