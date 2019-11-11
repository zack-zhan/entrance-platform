<template>
  <div class="box">
    <div class="title">{{school}}</div>
    <div class="form">
      <div class="line">
        <mt-field label="准考证号" placeholder="请输入准考证号码" v-model="examineeNo"></mt-field>
      </div>
      <div class="line">
        <mt-field label="身份证号" placeholder="请输入身份证号码" v-model="identityCard" :attr="{ maxlength: 18 }"></mt-field>
      </div>
      <div class="line">
        <mt-field label="姓名" placeholder="请输入学生姓名" v-model="name"></mt-field>
      </div>
      <div class="line special">
        <mt-field label="验证码" placeholder="请输入验证码" v-model="code" :attr="{ maxlength: 4 }" ></mt-field>
        <img :src="captcha" alt="" style="width: 26.6vw; height: 12.8vw; max-width: 200px; max-height: 96px;" @click="refreshCaptcha">
      </div>
      <div class="btn">
        <mt-button type="default" @click="login" :class="!examineeNo || !identityCard || !name || !code?'disabled':''">登录</mt-button>
      </div>
    </div>
    <div class="footer">
      <div class="linellae fl" style="margin-right:2.8vw"></div>
      <div class="text">技术支持：睿善信息科技</div>
      <div class="linellae fr" style="margin-left:2.8vw"></div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { verifycode, getcaptcha } from '@/api'
import { setCookie } from '@/utils/cookies'
export default {
  data () {
    return {
      examineeNo: '',
      identityCard: '',
      name: '',
      code: '',
      school: '',
      captcha: '',
      captchaId: ''
    }
  },
  methods: {
    // 正则验证只能输入数字跟字母
    num_letter () {
      this.$nextTick(() => {
        if (this.idNumber !== null) {
          this.examineeNo = this.examineeNo.replace(/[^\w]/g, '')
        }
        if (this.identityCard !== null) {
          this.identityCard = this.identityCard.replace(/[^\w]/g, '')
        }
      })
    },
    // 正则验证只能输入中文跟字母
    chinese_letter () {
      this.$nextTick(() => {
        if (this.name !== null) {
          this.name = this.name.replace(/[^\u4E00-\u9FA5A-Za-z]/g, '')
        }
      })
    },
    // 正则验证只能输入数字
    num () {
      this.$nextTick(() => {
        if (this.code !== null) {
          this.code = this.code.replace(/[^\d]/g, '')
        }
      })
    },
    refreshCaptcha () {
      getcaptcha().then(res => {
        if (res.code === 200) {
          this.captchaId = res.body.captchaId
          this.captcha = `data:image/jpeg;base64,${res.body.data}`
        } else {
          Toast(res.message)
        }
      })
    },
    // 登录
    login () {
      if (!this.examineeNo || !this.examineeNo.trim() === '') {
        Toast('准考证号不能为空')
        return
      }
      if (!this.identityCard || !this.identityCard.trim() === '') {
        Toast('身份证号不能为空')
        return
      }
      if (!this.name || !this.name.trim() === '') {
        Toast('姓名不能为空')
        return
      }
      if (!this.code || !this.code.trim() === '') {
        Toast('验证码不能为空')
        return
      }
      const obj = {
        examineeNo: this.examineeNo,
        identityCard: this.identityCard,
        name: this.name,
        captchaId: this.captchaId,
        verifyCode: this.code
      }
      this.$store.commit('setQueryInfo', obj)
      verifycode(obj)
        .then(res => {
          if (res.code === 200) {
            console.log(res)
            this.$router.replace({path: '/verify', query: {codeId: res.body.verifyCodeId, mobile: res.body.mobile}})
            setCookie('examineeNo', this.examineeNo)
          } else {
            Toast(res.message)
          }
        })
    }
  },
  mounted () {
    this.refreshCaptcha()
    if (this.$route.query.school) {
      this.school = this.$route.query.school
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  width: 100vw;
  height: 100vh;
  position: relative;
}
.title{
  font-size: 48px;
  padding-top: 5.3vh;
  margin-bottom: 3.3vh;
  text-align: center;
}
.form{
  width: 89.3vw;
  margin: 0 auto;
  .line{
    width: 100%;
    height: 7.96vh;
    margin-top: 1.99vh;
    .code{
      width: 26.6vw;
      height: 7.96vh;
      line-height: 7.96vh;
      color: #fff;
      font-size: 28px;
      text-align: center;
      background:rgba(245,166,35,1);
      border-radius:8px;
      float: right;
    }
  }
  .btn{
    width: 100%;
    height: 7.96vh;
    margin-top: 5.3vh;
  }
}
.footer{
  width: 89.3vw;
  margin-left: 5.33vw;
  position: absolute;
  bottom: 3.31vh;
  .text{
    height: 3.31vh;
    line-height: 3.31vh;
    font-size: 3.73vw;
    color: #BABABA;
    float: left;
  }
  .linellae{
    width: 21.33vw;
    height: 2px;
    background: #DDDDDD;
    margin-top: 1.57vh;
  }
}
.disabled{
  background:#ccc !important;
}
</style>

<style scoped>
.form >>> .mint-cell{
  min-height: 100%;
}
.form >>> .mint-cell-wrapper{
  font-size: 17px;
  width: 100%;
  height: 100%;
  line-height: 7.96vh;
  border-bottom: 1px solid rgba(238,238,238,1);
  padding: 0;
  background-image: none;
}
.form >>> .mint-cell-title{
  width: 18.53vw;
  margin-right: 7.4vw;
  min-width: 72px;
}

.special >>> .mint-cell{
  float: left;
}
.special >>> .mint-cell-wrapper{
  width: 59.46vw;
  margin-right: 3.2vw;
}

.btn >>> .mint-button{
  width: 100%;
  height: 100%;
  background:#0C60AA;
  color: #fff;
  font-size: 20px;
}
</style>
