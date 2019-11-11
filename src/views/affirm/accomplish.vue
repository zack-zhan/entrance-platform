<template>
  <div class="box">
    <div class="top">
      <div class="img">
        <img src="../../assets/correct2.png" alt="">
      </div>
      <div class="text">
        <div>你已经完成新生注册资料录入流程</div>
        <div v-if="process">请认真阅读以下内容</div>
      </div>
    </div>
    <div class="bottom">
      <div v-for="(item,index) in process" :key="index">{{(`${index + 1}、${item.content}`)}}</div>
    </div>
  </div>
</template>
<script>
import { getProcess } from '@/api'
import { Toast } from 'mint-ui'
import { getCookie, removeCookie } from '@/utils/cookies'
export default {
  data () {
    return {
      process: []
    }
  },
  mounted () {
    const corpId = getCookie('corpId')
    console.log(corpId)
    getProcess(corpId).then(res => {
      if (res.code === 200) {
        this.process = res.body

        removeCookie('examineeNo')
        removeCookie('token')
        removeCookie('corpId')
        removeCookie('userId')
      } else {
        Toast(res.message)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.box{
  width: 100vw;
  height: 100vh;
  background: #f8f8f8;
}
.top{
  width: 100%;
  height: 32.5vh;
  background: #fff;
  border-bottom: 1px solid rgba(238,238,238,1);
  .img{
    text-align: center;
    padding-top: 4.97vh;
    img{
      width: 70px;
      height: 70px;
    }
  }
  .text{
    margin-top: 4.3vh;
    text-align: center;
    div:nth-child(1){
      width: 91.06vw;
      height: 4.64vh;
      font-size: 20px;
      margin: 0 auto;
    }
    div:nth-child(2){
      width: 78vw;
      height: 6.6vh;
      font-size: 14px;
      margin: 0 auto;
      color:rgba(136,136,136,1);
      line-height: 3.31vh;
    }
  }
}
.bottom{
  // height: 26.2vh;
  background: #fff;
  padding: 2.65vh 5.33vw;
  div{
    color: #888888;
    font-size: 15px;
    line-height: 4vh;
  }
}
</style>
