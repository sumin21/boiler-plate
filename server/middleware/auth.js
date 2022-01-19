const {User} = require('../models/User');

let auth = (req, res, next) => {
    //인증 처리

    //client cookie
    let token = req.cookies.x_auth;
        
    //token -> decode -> user 찾기
    User.findByToken(token, (err, user)=>{
        // console.log('tlqkf')
        if(err) throw err;
        if(!user) return res.json({
            isAuth: false,
            err: true
        })

        //인증 okay
        req.token = token;
        req.user = user;
        next()
    })
    
}

module.exports = {auth}