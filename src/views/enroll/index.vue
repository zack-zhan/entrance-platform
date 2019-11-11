<template>
  <div class="box">
    <div class="content">
      <div class="img">
        <img src="../../assets/correct.png" alt="">
      </div>
      <div class="text">
        <div>恭喜你，成功被“{{schoolName}}”录取！</div>
        <div>请点击“确认入学”，开始进入资料录入程序。若要放弃录取资格，请点击“放弃入学”</div>
      </div>
    </div>
    <div class="btn">
      <mt-button type="default" style="background:#0C60AA;" @click="affirm">确认入学</mt-button>
      <mt-button type="default" style="background:#fff;color:#999;" @click="shadeShow = true">放弃入学</mt-button>
    </div>
    <div class="shade" v-if="shadeShow">
      <div class="dialogs">
        <div class="d_text">
          <div>你即将放弃入学资格</div>
          <div>一旦取消便不能恢复</div>
          <div>请谨慎选</div>
        </div>
        <div class="d_footer">
          <div @click="abandon">确认放弃</div>
          <div @click="shadeShow = false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { refuseentry, getCorporation } from '@/api'

import { getCookie } from '@/utils/cookies'
export default {
  data () {
    return {
      schoolName: '',
      corpId: '',

      shadeShow: false
    }
  },
  methods: {
    // 确认入学
    affirm () {
      this.$router.replace('/replenishOne')
    },
    // 放弃入学
    abandon () {
      const id = getCookie('examineeNo')
      const request = {
        examineeCode: id,
        corpId: this.corpId
      }
      refuseentry(request).then(res => {
        if (res.code === 200) {
          this.shadeShow = false
          this.$router.replace('/abandon')
        } else {
          Toast(res.message)
        }
      })
    }
  },
  mounted () {
    this.corpId = getCookie('corpId')
    getCorporation(this.corpId).then(res => {
      if (res.code === 200) {
        this.schoolName = res.body.name
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
.content{
  width: 100vw;
  /*height: 33.8vh;*/
  background: #fff;
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
      /*height: 4.64vh;*/
      font-size: 20px;
      margin: 0 auto;
    }
    div:nth-child(2){
      width: 78vw;
      /*height: 6.6vh;*/
      font-size: 14px;
      margin: 10px auto 0;
      color:rgba(136,136,136,1);
      line-height: 3.31vh;
    }
  }
}
.btn{
    width: 89.3vw;
    height: 7.96vh;
  margin: 5.3vh auto 0;
}

.shade{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(000,000,000,0.3);
  .dialogs{
    width: 72vw;
    height: 42vw;
    background: #fff;
    margin: auto auto;
    margin-top: 36.2vw;
    border-radius: 5px;
    .d_text{
      text-align: center;
      font-size:20px;
      font-family:PingFang-SC-Regular;
      font-weight:400;
      color: #000;
      line-height: 6.6vw;
      padding: 4.6vw 4.5vw;
      border-bottom: 1px solid #DDDDDD;
    }
    .d_footer{
      height: 12.5vw;
      line-height: 12.5vw;
      div{
        float: left;
        width: 50%;
        height: 100%;
        text-align: center;
        box-sizing: border-box;
        font-size:20px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color: #000;
      }
      div:nth-child(1){
        border-right: 1px solid #DDDDDD;
      }
      div:nth-child(2){
        color: #0C60AA;
      }
    }
  }
}
</style>

<style scoped>
.btn >>> .mint-button{
  width: 100%;
  height: 100%;
  color: #fff;
  margin-bottom: 1.99vh;
  font-size: 18px;
}
</style>
