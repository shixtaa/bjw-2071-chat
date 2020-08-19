const mongoose = require('mongoose')
const moment=require('moment')
const { Schema } = mongoose

const chatsSchema = new Schema({
  nickName: String,
  avatar:String,
  content:String,
  // createdBy:{type:Date,default:moment().format('YYYY-MM-DD HH:mm:ss')}
  createdBy:{type:Date,default:new Date()}
})

const chatsModel = mongoose.model('chats', chatsSchema)

module.exports = {
  chatsModel
}