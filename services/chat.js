const {insertOne,find}=require('../models/chat')
const moment=require('moment')
const _=require('lodash')
async function addContent(data){
  await insertOne(data)
}

async function getContent(query){
  return await find({
    createdBy:{
      $gt:moment().subtract(1,'day').toDate(),
      $lt:moment().toDate()
    }
  })
}


module.exports={
  addContent,
  getContent

}