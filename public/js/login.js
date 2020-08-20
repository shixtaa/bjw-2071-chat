const btnEle=document.querySelector('.login-button')
const inputEle=document.querySelector('.login-input')

btnEle.onclick=()=>{
  login()
}

function login(){
  let nickName=inputEle.value
  if(nickName){
    $.ajax({
      type:'post',
      url:'http://192.168.10.182:3000/chat/login',
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
inputEle.onkeydown=(e)=>{
  let key=e.which
  if(key==13){
    login()
  }
}
