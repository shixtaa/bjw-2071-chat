const {chatsModel}=require('./schema/chat')

async function insertOne(data){
  const model=new chatsModel(data)
  await model.save()
}

async function find(query){
  return await chatsModel.find(query).lean()
}

module.exports={
  insertOne,
  find
}