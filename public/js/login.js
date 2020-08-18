const btnEle=document.querySelector('.login-button')
const inputEle=document.querySelector('.login-input')

btnEle.onclick=()=>{
  let nickName=inputEle.value
  if(nickName){
    $.ajax({
      type:'post',
      url:'http://localhost:3000/chat/login',
      data:{
        nickName
      },
      success:(result)=>{
        if(result.status==='success'){
          location.href=('/chat')
        }
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
}