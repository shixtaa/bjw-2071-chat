const {getRandomAvatar}=require('../common/utils')
const services=require('../services/chat')
const _=require('lodash')
async function login(ctx,next){
  await ctx.render('login')
}
async function chatLogin(ctx,next){
  const {nickName}=ctx.request.body
  ctx.cookies.set('user',
  JSON.stringify({
    nickName,
    'avatar':getRandomAvatar()
  }),
  {maxAge:24*60*60*1000})
 
  if(nickName){
    ctx.response.body={status:'success'}
  }
}

async function chat(ctx,next){
  let user=ctx.cookies.get('user')
  if(user){
    user=JSON.parse(user)
    if(user.nickName){
      
      ctx.state={
        name:user.nickName,
        contents:await services.getContent()
      }
      await ctx.render('chat',ctx.state)
    }else{
      ctx.redirect('/')
    }
  }else{
    ctx.redirect('/')
  }
  
}
async function addContent(ctx,next){
  const {content}=ctx.request.body
  var user=ctx.cookies.get('user')
  if(user){
    user=JSON.parse(user)
    const nickName=user.nickName
    const avatar=user.avatar
    let data={
      nickName,
      avatar,
      content
      // createdBy:new Date()
    }
    await services.addContent(data)
    let result=await services.getContent()
    ctx.response.body=result
  }
}

async function getContent(ctx,next){
  const contents=await services.getContent()
  ctx.response.body=contents
}
module.exports={
  login,
  chatLogin,
  chat,
  addContent,
  getContent
}
