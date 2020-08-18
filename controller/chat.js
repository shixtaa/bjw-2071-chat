async function login(ctx,next){
  await ctx.render('login')
}
async function chatLogin(ctx,next){
  const {nickName}=ctx.request.body
  ctx.cookies.set('user',JSON.stringify({nickName}))
 
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
        name:user.nickName
      }
      await ctx.render('chat',ctx.state)
    }else{
      ctx.redirect('/')
    }
  }else{
    ctx.redirect('/')
  }
  
}
module.exports={
  login,
  chatLogin,
  chat
}
