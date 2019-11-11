<template>
  <div class="box">
    <div class="form">
      <div class="line">
        <mt-field label="民族" placeholder="请输入相关信息" v-model="nation" :state="nationState" @blur.native.capture="nationValidation"></mt-field>
      </div>
      <div class="line">
        <mt-field label="政治面貌" placeholder="请输入相关信息" v-model="politicalStatus" :state="politicalState" @blur.native.capture="politicalValidation"></mt-field>
      </div>
      <div class="line special">
        <group>
          <x-address title="户籍" v-model="censusRegister" :raw-value="true" placeholder="请选择地址" :list="ChinaAddressV4Data " @on-shadow-change="onShadowChange"></x-address>
        </group>
      </div>
      <div class="line">
        <mt-field label="固定电话" placeholder="请输入固定电话" v-model="telephone" :state="phoneState" @blur.native.capture="phoneValidation"></mt-field>
      </div>

      <div class="special_line">
        <group>
          <PopupPicker title="寄宿方式" v-model="lodgingFlag" placeholder="请选择" :data="data"></PopupPicker>
        </group>
      </div>
    </div>
    <div class="footer">
      <mt-button type="default" @click="next" :class="!nation || !politicalStatus || !censusRegister[0] || !telephone || !lodgingFlag[0]?'disabled':''">下一步（1/3）</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { XAddress, Group, PopupPicker } from 'vux'
import { getOriginStudentById } from '@/api'
import ChinaAddressV4Data from './components/china_address_v4.json'

import { getCookie } from '@/utils/cookies'
export default {
  data () {
    return {
      nation: '',
      politicalStatus: '',
      censusRegister: [],
      telephone: '',
      lodgingFlag: [],

      address: '',

      ChinaAddressV4Data: ChinaAddressV4Data,
      data: [['是', '否']],

      nationState: '',
      politicalState: '',
      phoneState: ''
    }
  },
  components: {
    XAddress,
    Group,
    PopupPicker
  },
  methods: {
    onShadowChange (ids, names) {
      this.address = names
    },

    nationValidation () {
      const regex = /^[\u4E00-\u9FA5]+$/// 判断是全为汉字
      if (!regex.test(this.nation)) {
        this.nationState = 'error'
      } else {
        this.nationState = 'success'
      }
    },
    politicalValidation () {
      const regex = /^[\u4E00-\u9FA5]+$/// 判断是全为汉字
      if (!regex.test(this.politicalStatus)) {
        this.politicalState = 'error'
      } else {
        this.politicalState = 'success'
      }
    },
    phoneValidation () {
      const regex = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/// 判断是否号码正确
      if (!regex.test(this.telephone)) {
        this.phoneState = 'error'
      } else {
        this.phoneState = 'success'
      }
    },

    // 下一步
    next () {
      if (!this.nation || !this.nation.trim() === '') {
        Toast('民族不能为空')
        return
      }
      if (!this.politicalStatus || !this.politicalStatus.trim() === '') {
        Toast('政治面貌不能为空')
        return
      }
      if (!this.censusRegister[0]) {
        Toast('户籍不能为空')
        return
      }
      if (!this.telephone || !this.telephone.trim() === '') {
        Toast('固定电话不能为空')
        return
      }
      if (!this.lodgingFlag[0]) {
        Toast('寄宿方式不能为空')
        return
      }
      if (this.nationState === 'error') {
        Toast('民族输入错误')
        return
      }
      if (this.politicalState === 'error') {
        Toast('政治面貌输入错误')
        return
      }
      if (this.phoneState === 'error') {
        Toast('固定电话输入错误')
        return
      }
      const censusRegister = this.address.toString().replace(/,/g, '')
      const obj = {
        nation: this.nation,
        politicalStatus: this.politicalStatus,
        censusRegister: censusRegister,
        address: this.censusRegister,
        telephone: this.telephone,
        lodgingFlag: this.lodgingFlag[0]
      }
      this.$store.commit('setReplenishOne', obj)
      this.$router.push('/replenishTwo')
    }
  },
  mounted () {
    const data = this.$store.state.replenishOne
    if (data.censusRegister) {
      this.nation = data.nation
      this.politicalStatus = data.politicalStatus
      this.telephone = data.telephone
      this.lodgingFlag = [data.lodgingFlag]
      this.censusRegister = data.address
    } else {
      const userId = getCookie('userId')
      console.log(userId, 'userid')
      getOriginStudentById(userId).then(res => {
        if (res.code === 200) {
          this.politicalStatus = res.body.politicalStatus
          this.telephone = res.body.contactCellphone
          this.nation = res.body.nation
          const address = res.body.censusRegister
          const addressId = []
          this.ChinaAddressV4Data.map(x => {
            if (address.indexOf(x.name) > -1) {
              address.replace(x.name, '')
              addressId.push(x.value)
            }
          })
          this.censusRegister = addressId
          this.lodgingFlag = [res.body.lodgingFlagStr]
        } else {
          Toast(res.message)
        }
      })
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
.form{
  width: 100%;
  height: 29.85vh;
  background: #fff;
  .line{
    margin-left: 4.26vw;
    height: 7.46vh;
  }
  .special{
    font-size: 4.53vw;
    line-height: 7vh;
    border-bottom: 1px solid rgba(238,238,238,1);
  }
  .special_line{
    background: #fff;
    height: 7.46vh;
    font-size: 4.53vw;
    line-height: 7vh;
    border-bottom: 1px solid rgba(238,238,238,1);
    margin-top: 1.3vh;
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
.form >>> .mint-cell{
  min-height: 100%;
}
.form >>> .mint-cell-wrapper{
  font-size: 17px;
  width: 100%;
  height: 100%;
  line-height: 7vh;
  border-bottom: 1px solid rgba(238,238,238,1);
  padding: 0;
}
.form >>> .mint-cell-title{
  width: 18.53vw;
  margin-right: 7.4vw;
  min-width: 72px;
}

.footer >>> .mint-button{
  width: 92vw;
  height: 7.96vh;
  background:#0C60AA;
  color: #fff;
  font-size: 18px;
}

.form >>> .weui-label{
  font-size: 4.53vw;
}
.form >>> .vux-no-group-title{
  margin-top: 0;
  height: 7.46vh;
  line-height: 7vh;
  margin-right: 4.26vw;
}
.form >>> .weui-cell {
  padding: 0;
}
.form >>> .vux-cell-placeholder {
  font-size: 4.53vw;
}
.form >>> .vux-cell-value {
  font-size: 4.53vw;
  color: #000;
}
.form >>> .weui-cells:before{
  display: none;
}
.form >>> .weui-cells:after{
  display: none;
}
.special_line >>> .weui-label{
  margin-left: 4vw;
}

.special >>> .weui-cell__hd{
  min-width: 32px;
}
.special >>> .vux-cell-primary{
  height: 7.46vh;
}
.special >>> .vux-cell-value{
  display: inline-block;
  width: 256px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
