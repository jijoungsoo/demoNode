const mongoose = require('mongoose');

const saltRounds = 10;
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxLength: 50
    },
    email:{
        type: String,
        true:true, 
        unique: true
    },
    password:{
        type:String,
        minlength:5
    }
    ,
    lastname:{
        type: String,
        maxlength:50
    },
    role:{
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp:{
        type: Number
    }

})

/*user를 저장하기전에 무언가를 한다. */
userSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){  /*비밀번호변경할때도 있고, 사용자이름을 변경할때도 있는데 저장할때마다  비밀번호를 암호화한다.
        email이나 다른정보를 변경할때도  pre save가 돌기때문에   password가 변경될때만 수행되도록 하기 위해  isModified  'password'를 해준다.
        */
        /*비밀번호를 암호화한다. */
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err);
                user.password=hash;

                //next();명령을 이어보낸다. 
                next();
            });
        });
    } else {
        next(); /*비밀번호를 바꾸는 경우가 아닐 때 */
    }
})

userSchema.methods.comparePassword =  function(plainPassword, cb  /*콜백 */){
    //plainPassword  12345
    //암호화된 비밀번호   $2b$10$4s.p7F6Ltd63pFigfJ8DH.oHZ3cogKhlLU5QRsV/D/u4R28VURijS

    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    

    })


}

userSchema.methods.generateToken= function(cb){
    //jsonwebtoken을 이용해서 token을 생성하기
    var user = this;
    var token = jwt.sign(user._id.toHexString(),'scretToken')  /*2번째 인자는 아무거나 넣어주면 된다. */
    /** 
     * user._id
     * 일때 문제발생
     *  Expected "payload" to be a plain object. 
     * user._id.toHexString()
     * 
     * 해주면 된다.
     * 
     **/

    /*
    user.id + 'secretToken' = token    을 만듬  secretToken을 알고 있어야한다.
    */

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })

}


const User = mongoose.model('User',userSchema)



module.exports = {User}
