<template>
  <div class="box">
    <div class="line">
      <mt-field label="曾担任职务" placeholder="请输入相关信息" v-model="previousPositions"></mt-field>
    </div>
    <div class="textbox">
      <div class="laber">特长</div>
      <group>
        <x-textarea v-model="specialty" :max="400" placeholder="请输入相关信息"></x-textarea>
      </group>
    </div>
    <div class="textbox">
      <div class="laber">获奖情况</div>
      <group>
        <x-textarea v-model="awards" :max="400" placeholder="请输入相关信息"></x-textarea>
      </group>
    </div>
    <div class="footer">
      <mt-button type="default" @click="next" :class="!previousPositions || !specialty || !awards?'disabled':''">下一步（2/3）</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Group, XTextarea } from 'vux'
export default {
  data () {
    return {
      previousPositions: '',
      specialty: '',
      awards: ''
    }
  },
  components: {
    Group,
    XTextarea
  },
  methods: {
    // 下一步
    next () {
      if (!this.previousPositions || this.previousPositions.trim() === '') {
        Toast('曾担任职务不能为空')
        return
      }
      if (!this.specialty || this.specialty.trim() === '') {
        Toast('特长不能为空')
        return
      }
      if (!this.awards || this.awards.trim() === '') {
        Toast('获奖情况不能为空')
        return
      }
      const obj = {
        previousPositions: this.previousPositions,
        specialty: this.specialty,
        awards: this.awards
      }
      this.$store.commit('setReplenishTwo', obj)
      this.$router.push('/replenishThree')
    }
  },
  mounted () {
    const data = this.$store.state.replenishTwo
    if (data.previousPositions) {
      this.previousPositions = data.previousPositions
      this.specialty = data.specialty
      this.awards = data.awards
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  width: 100vw;
  height: 98.7vh;
  background: #f8f8f8;
  padding-top: 1.3vh;
  position: relative;
}
.line{
  background: #fff;
  height: 7.46vh;
}
.textbox{
  margin-top: 1.3vh;
  width: 100%;
  height: 28.19vh;
  background: #fff;
  overflow: hidden;
  .laber{
    font-size: 17px;
    margin-left: 4.26vw;
    padding-top: 1.62vh;
    padding-bottom: 1.62vh;
  }
}
.footer{
  width: 100%;
  height: 10.11vh;
  line-height: 10.11vh;
  text-align: center;
  border-top: 1px solid rgba(221,221,221,1);
  position: absolute;
  bottom: 0;
}
.disabled{
  background:#ccc !important;
}
</style>

<style scoped>
.line >>> .mint-cell{
  min-height: 100%;
}
.line >>> .mint-cell-wrapper{
  font-size: 17px;
  margin: 0 4.26vw;
  width: 100%;
  height: 100%;
  line-height: 7vh;
  border-bottom: 1px solid rgba(238,238,238,1);
  padding: 0;
}
.line >>> .mint-cell-title{
  width: 23.66vw;
  margin-right: 2.93vw;
  min-width: 72px;
}

.textbox >>> textarea{
  font-size: 17px;
  width: 91.16vw;
  height: 16.9vh;
  padding: 0;
  color: #000;
}
.textbox >>> .weui-cells{
  margin-top: 0;
}
.textbox >>> .weui-cells:before{
  display: none;
}
.textbox >>> .weui-cells:after{
  display: none;
}
.textbox >>> .weui-textarea-counter{
  font-size: 12px;
}

.footer >>> .mint-button{
  width: 92vw;
  height: 7.96vh;
  background:#0C60AA;
  color: #fff;
  font-size: 18px;
}
</style>
