const express = require('express')
const app = express()
const port = 5000

const mongoose =require('mongoose')

const {User}=require('./models/User')

const config = require('./config/key')

const bodyParser = require('body-parser');


//application/x-www-form-urlencoded 가져올수있음
app.use(bodyParser.urlencoded({extend:  true}))  

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


app.post('/register',(req,res)=>{
    //회원가입 할때 필요한 정보들을 client에서 가져오면
    //그것을 데이터베이스에 넣어준다.

    /*bodyparser를 사용해서 req.body를   json 형태로 넘오오는것을 받음 */
    const user = new User(req.body)
    user.save((err,doc)=>{
        if(err) return res.json({success: false,err})

        return res.status(200).json({success:true})
    })
})