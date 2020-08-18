const mongoose = require('mongoose')

async function initConnection() {
//数据库地址mongodb://localhost/local
  await mongoose.connect('mongodb://localhost/local', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (error) => {
    if (error) {
      console.log(error)
    }
    console.log('mongodb connection success')
  })
}
module.exports={
  initConnection
}