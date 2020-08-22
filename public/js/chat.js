let inputEle=document.querySelector('.chat-input')
let timer
let originData
renderAll()
stopPolling()
longPolling()
scrollToBottom()
//刷新页面之后给初始化originDate
function renderAll(){
  $.ajax({
    type:'get',
    url:'http://192.168.10.182:3000/chat/getContent',
    data:{},
    success:(result)=>{
      originData=result
    }
  })
}

/* 消息发送 */
inputEle.onkeydown=(e)=>{
  let key=e.which
  if(key==13){
    var content=inputEle.value
    if(content){
      $.ajax({
        type:'post',
        url:'http://192.168.10.182:3000/chat/addContent',
        data:{
          content
        },
        success:(result)=>{
          inputEle.value=''
          $('.chat-content').html('')
          renderChat(result)
          //消息发送后给originData重新赋值
          originData=result
          scrollToBottom()
        }
      })
    }
  }
}

/* 渲染聊天内容 */
function renderChat(contents){
  let html=''
  contents.forEach((item)=>{
    html+=`<div class='talking'>
          <div class="left">
              <img src='${item.avatar}' alt="">
              <span class="name">${item.nickName}</span>
          </div>
          <span class="content">${item.content}</span>
          <div class="time">
          ${moment(item.createdBy).locale('zh-cn').format('YYYYMMMMDo aH:mm:ss')}
          </div>    
      </div>`
  })
  $('.chat-content').html(html) 
}

/* 页面划到底部 */
function scrollToBottom(){
  let ele=document.querySelector('.chat-content')
  ele.scrollTop=ele.scrollHeight
}

/*
*长轮询 每隔2s向数据库查询 返回最新的结果
*/
function longPolling(){
  timer=setInterval(()=>{
    $.ajax({
      type:'get',
      url:'http://192.168.10.182:3000/chat/getContent',
      data:{},
      success:(result)=>{
        renderChat(result)
        let times=0//记录未读消息的数量
        result.filter((item)=>{
          //刷新页面或提交消息之后的时间和数据库返回的最新消息的时间不一致则表示有新消息
          if(moment(originData[originData.length-1].createdBy).isBefore(moment(item.createdBy))){
            times++ 
          }
        })
        if(times>0){
          //如果有新信息，渲染消息框
          renderWarning(times)
        }else{
          console.log('没有新消息')
        }
      }
    })
  },2000)
}

function stopPolling(){
  if(timer){
    clearInterval(timer)
  }
}

/* 
*未读消息框
 */
const warningEle=document.querySelector('.warning')
function renderWarning(times){
  if(times>0){
    let html='有'+times+'条新消息'
    $('.warning').html(html)
    warningEle.style.display='block'
  }
}

/* 
*点击消息框之后，提示消失，并重新为originDate赋值
 */
warningEle.onclick=function(){
  scrollToBottom()
  warningEle.style.display='none'
  renderAll()//重新为originDate赋值
}






