const _=require('lodash')
const moment=require('moment')
function getRandomAvatar(){
  let avatars=[
    'https://wx1.sbimg.cn/2020/08/19/3HykG.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3HO1I.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3Hxfn.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3Hnvk.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3Hihj.jpg'
  ]
  let index=_.random(0,4)
  return avatars[index]
}

function  formatTime(time){
  return moment(time).locale('zh-cn').format('YYYYMMMMDo aH:mm:ss')
}
module.exports={
  getRandomAvatar,
  formatTime
}