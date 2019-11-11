<template>
  <div>
    <div class="title">验证码已发到尾号 <span>{{suffix}}</span> 的手机号码上</div>
    <div class="form">
      <input style="opacity: 0; height: 12.8vw; width: 90vw; position:absolute;" v-model="text" v-focus="true" />
      <div class="code">
        <div class="code_box">{{text1}}</div>
        <div class="code_box">{{text2}}</div>
        <div class="code_box">{{text3}}</div>
        <div class="code_box">{{text4}}</div>
        <div class="code_box">{{text5}}</div>
        <div class="code_box">{{text6}}</div>
      </div>
      <div class="line">
        <div class="fl" @click="retry" :class="count?'special':''">重发验证码</div>
        <div class="fr">{{count}}s</div>
      </div>
      <div class="btn">
        <mt-button type="default" @click="next" :class="!text || text.length !== 6?'disabled':''">下一步</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { token, verifycode } from '@/api'
import { setCookie } from '@/utils/cookies'
export default {
  data () {
    return {
      show: true,
      count: '',
      suffix: '',
      text: '',
      codeId: ''
    }
  },
  watch: {
    text (value) {
      if (value.length > 6) {
        this.text = value.substring(0, 6)
      }
    }
  },
  computed: {
    text1 () {
      if (this.text && this.text.length > 0) {
        return this.text[0]
      }
      return ''
    },
    text2 () {
      if (this.text && this.text.length > 1) {
        return this.text[1]
      }
      return ''
    },
    text3 () {
      if (this.text && this.text.length > 2) {
        return this.text[2]
      }
      return ''
    },
    text4 () {
      if (this.text && this.text.length > 3) {
        return this.text[3]
      }
      return ''
    },
    text5 () {
      if (this.text && this.text.length > 4) {
        return this.text[4]
      }
      return ''
    },
    text6 () {
      if (this.text && this.text.length > 5) {
        return this.text[5]
      }
      return ''
    }
  },
  methods: {
    // 验证码倒计时间
    getCode () {
      const TIME_COUNT = 60
      this.count = TIME_COUNT
      this.time = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.count--
        } else {
          this.show = false
          clearInterval(this.time)
        }
      }, 1000)
    },
    // 重发验证码
    retry () {
      if (this.show === false) {
        this.show = true
        this.count = ''
        const queryInfo = this.$store.state.queryInfo
        if (queryInfo) {
          verifycode(queryInfo).then(res => {
            if (res.code === 200) {
              this.getCode()
            } else {
              Toast(res.message)
            }
          })
        }
      }
    },
    // 下一步
    next () {
      const text = this.text
      const regex = /^[\d]+$/// 判断是全为数字
      if (regex.test(text)) {
        if (this.text.length === 6) {
          const obj = {
            codeId: this.codeId,
            code: this.text
          }
          token(obj)
            .then(res => {
              if (res.code === 200) {
                setCookie('token', res.body.access_token)
                setCookie('corpId', res.body.user_info.corpId)
                setCookie('userId', res.body.user_info.id)
                this.$router.replace('/enroll')
              } else {
                Toast('验证码错误，请检查！')
              }
            })
        } else {
          Toast('验证码不能为空')
        }
      } else {
        Toast('验证码输入错误，验证码必须是数字')
      }
    }
  },
  mounted () {
    this.codeId = this.$route.query.codeId
    this.getCode()
    const mobile = this.$route.query.mobile
    if (mobile) {
      this.suffix = mobile.substring(mobile.length - 4)
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  font-size: 18px;
  text-align: center;
  margin-top: 13.3vw;
  // margin-bottom: 5.33vw;
  span{
    color: #0C60AA;
  }
}
.form{
  width: 89.3vw;
  margin: 0 auto;
  .code{
    width: 100%;
    height: 12.8vw;
    margin-top: 20px;
    .code_box{
      width: 12.8vw;
      height: 12.8vw;
      line-height: 12.8vw;
      border-radius: 1vw;
      border:2px solid rgba(221,221,221,1);
      margin-right: 1vw;
      margin-left: 1vw;
      float: left;
      box-sizing: border-box;
      text-align: center;
      font-size: 24px;
    }
  }
  .line{
    height: 3.98vh;
    line-height: 3.98vh;
    font-size: 15px;
    margin-top: 3.3vh;
    margin-right: 1vw;
    margin-left: 1vw;
    overflow: hidden;
    div:nth-child(1){
      color:#0C60AA;
    }
    .special{
      color:#666666 !important;
    }
    div:nth-child(2){
      font-size: 14px;
      color:#666666;
    }
  }
  .btn{
    margin-top: 3.3vh;
    width: 100%;
    height: 7.96vh;
  }
  .disabled{
    background:#ccc !important;
  }
}
</style>

<style scoped>
.btn >>> .mint-button{
  width: 100%;
  height: 100%;
  background:#0C60AA;
  color: #fff;
  font-size: 15px;
}
</style>
