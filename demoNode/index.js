const express = require('express')
const app = express()
const port = 5000

const mongoose =require('mongoose')

const {User}=require('./models/User')

const config = require('./config/key')

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {auth} = require('./middleware/auth')


//application/x-www-form-urlencoded 가져올수있음
app.use(bodyParser.urlencoded({extended:  true}))  

//applicaiton/json 을 가져올수있음
app.use(bodyParser.json())



mongoose.connect(config.mongoURI,{
    /* mongodb 6.0이상에서는 아래 옵션이 지원되지 않는다. default 설정된다.
    https://velog.io/@lee951109/MongoDB-MongoParseError-options-usecreateindex-usefindandmodify-are-not-supported
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    */
}).then(()=>console.log("MongoDb Connected..."))
.catch(err =>console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!~~안녕하세요11')
})

/* */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/* post맨에서 테스트
{
    "name":"지정수",
    "email":"jijsx@hotmail.com",
    "password":"12345"
}

*/


app.post('/api/users/register',(req,res)=>{
    //회원가입 할때 필요한 정보들을 client에서 가져오면
    //그것을 데이터베이스에 넣어준다.

    /*bodyparser를 사용해서 req.body를   json 형태로 넘오오는것을 받음 */
    const user = new User(req.body)
    /*비밀번호 암호화 - mongoose 기능 이용 */

    user.save((err,doc)=>{
        if(err) return res.json({success: false,err})

        return res.status(200).json({success:true})
    })
})


app.post('/api/users/login',(req,res)=>{
    //요청된 이메일을 데이터 베이스에서 있는지 찾는다.
    User.findOne({email: req.body.email},(err,user)=>{
        if(!user){
            return res.json({
                loginSuccess:false,
                message:"제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
        user.comparePassword(req.body.password, (err,isMatch)=>{
            if(!isMatch){
                return res.json({
                    loginSuccess:false,
                    message:"비밀번호가 틀렸습닏나."
                })
            }

            //비밀번호까지 맞다면 토큰을 생성하기.
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);

                //토큰을 저장한다. 어디에 ? 쿠키, 로컬스토리지?
                //어디에 저장해야하는지 논란이 있다.

                //여기서는 쿠키에다 하겠다.
                //라이브러리를 또 깔아야한다. express에서 제공하는  cookie-parser

                res.cookie("x_auth",user.token).status(200).json({
                    loginSuccess:true,
                    userId:user._id
                })



            })

        })
    })
})

/*
role 0 ->일반유저
role 1 이면 어드민
role 1 이면 부어드민
*/

app.get('/api/users/auth',auth,(req,res)=>{
        //여기까지 미들웨어를 통과해 왔다는 이야기는 authentication이 true라는 말.
        res.status(200).json({
            _id : req.user._id,
            isAdmin:req.user.role == 0 ? false : true,
            isAuth : true,
            email : req.user.email,
            name : req.user.name,
            lastname : req.user.lastname,
            role : req.user.role,
            image: req.user.image
        })

})