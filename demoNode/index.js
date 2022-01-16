const express = require('express')
const app = express()
const port = 5000

const mongoose =require('mongoose')

var connstionString = process.env.MONGO_CONNECTION_STRING
console.log(connstionString)
mongoose.connect(connstionString,{
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
  res.send('Hello World!~~안녕하세요')
})

/* */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})