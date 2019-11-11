<template>
  <div class="box">
    <div class="line">
      <mt-field label="家庭人数" placeholder="请输入家庭人数" v-model="familyTotal" :state="familyState" @blur.native.capture="familyValidation"></mt-field>
    </div>
    <Guardian v-for="(item, index) in guardianList" :key="index" :info="item" :index="index" @onValueChange="onChange"/>
    <div class="add" @click="add"> + 添加监护人</div>
    <div class="footer">
      <mt-button type="default" @click="next" :class="!familyTotal?'disabled':''">下一步（3/3）</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Guardian from './components/guardian'
export default {
  data () {
    return {
      familyTotal: '',

      guardianList: [],

      familyState: ''
    }
  },
  components: {
    Guardian
  },
  methods: {
    familyValidation () {
      const regex = /^[\d]+$/// 判断是全为数字
      if (!regex.test(this.familyTotal)) {
        this.familyState = 'error'
      } else {
        this.familyState = 'success'
      }
    },

    onChange (item) {
      console.log(item, '000')
      const guardian = this.guardianList[item.index]
      guardian[item.name] = item.value
    },
    add () {
      this.guardianList.push({})
    },
    // 下一步
    next () {
      if (!this.familyTotal || this.familyTotal.trim() === '') {
        Toast('家庭人数不能为空')
        return
      }
      if (!this.guardianList || this.guardianList.length === 0) {
        Toast('请添加监护人')
        return
      }
      for (let i = 0; i < this.guardianList.length; i++) {
        const guardian = this.guardianList[i]
        if (!guardian.name || guardian.name.trim() === '') {
          Toast('姓名不能为空')
          return
        }
        if (!guardian.relationship) {
          Toast('关系不能为空')
          return
        }
        if (!guardian.phone || guardian.phone.trim() === '') {
          Toast('联系电话不能为空')
          return
        }
        if (!guardian.address || guardian.address.trim() === '') {
          Toast('工作单位不能为空')
          return
        }
        const chinese = /^[\u4E00-\u9FA5]+$/// 判断是全为汉字
        const phone = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/// 判断是否号码正确
        const regex = /^[\u4E00-\u9FA5_A-Za-z0-9]+$/ // 判断是否有特殊字符
        if (!chinese.test(guardian.name)) {
          Toast('姓名输入错误')
          return
        }
        if (!phone.test(guardian.phone)) {
          Toast('联系电话输入错误')
          return
        }
        if (!regex.test(guardian.address)) {
          Toast('工作单位输入错误')
          return
        }
      }
      if (this.guardianList.length >= 2) {
        let one = this.guardianList[0]
        let i = 0
        this.guardianList.forEach(item => {
          if (one.relationship[0] === item.relationship[0]) {
            i++
          }
        })
        if (i > 1) {
          Toast('监护人身份重复')
        } else {
          const obj = {
            familyTotal: this.familyTotal,
            keeperList: this.guardianList
          }
          this.$store.commit('setReplenishThree', obj)
          this.$router.push('/affirm')
        }
      } else {
        const obj = {
          familyTotal: this.familyTotal,
          keeperList: this.guardianList
        }
        this.$store.commit('setReplenishThree', obj)
        this.$router.push('/affirm')
      }
    }
  },
  mounted () {
    const data = this.$store.state.replenishThree
    if (data.familyTotal) {
      this.familyTotal = data.familyTotal
      this.guardianList = data.keeperList
      console.log(this.guardianList)
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
.add{
  text-align: center;
  color: #4A90E2;
  height: 4.2vh;
  line-height: 4.2vh;
  padding: 2vh 0;
  background: #f8f8f8;
  font-size: 15px;
}
.footer{
  width: 100%;
  height: 10.11vh;
  line-height: 10.11vh;
  text-align: center;
  border-top: 1px solid rgba(221,221,221,1);
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
  margin-left: 4.26vw;
  width: 100%;
  height: 100%;
  line-height: 7vh;
  border-bottom: 1px solid rgba(238,238,238,1);
  padding: 0;
}
.line >>> .mint-cell-title{
  width: 22.66vw;
  margin-right: 2.93vw;
  min-width: 72px;
}

.footer >>> .mint-button{
  width: 92vw;
  height: 7.96vh;
  background:#0C60AA;
  color: #fff;
  font-size: 18px;
}
</style>
