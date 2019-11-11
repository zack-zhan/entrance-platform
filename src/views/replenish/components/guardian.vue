<template>
  <div class="guardian">
    <div class="title" v-if="parseInt(index) === 0">家庭成员信息</div>
    <div class="interspace"></div>
    <div class="line ts">
      <div class="label">监护人{{index + 1}}</div>
    </div>
    <div class="line">
      <mt-field label="姓名" placeholder="请输入姓名" v-model="name" :state="nameState" @blur.native.capture="nameValidation"></mt-field>
    </div>
    <div class="line">
        <group>
          <PopupPicker title="关系" v-model="relationship" placeholder="请选择" :data="data"></PopupPicker>
        </group>
      </div>
    <div class="line">
      <mt-field label="联系电话" placeholder="请输入手机号码" v-model="phone" :state="phoneState" @blur.native.capture="phoneValidation"></mt-field>
    </div>
    <div class="line">
      <mt-field label="工作单位" placeholder="请输入工作单位" v-model="address" :state="addressState" @blur.native.capture="addressValidation"></mt-field>
    </div>
  </div>
</template>

<script>
import { Group, PopupPicker } from 'vux'
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    info: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      name: '',
      relationship: [],
      phone: '',
      address: '',

      data: [['父亲', '母亲', '祖母', '祖父', '兄弟', '姊妹', '其他']],

      nameState: '',
      phoneState: '',
      addressState: ''
    }
  },
  components: {
    Group,
    PopupPicker
  },
  methods: {
    nameValidation () {
      const regex = /^[\u4E00-\u9FA5]+$/// 判断是全为汉字
      if (!regex.test(this.name)) {
        this.nameState = 'error'
      } else {
        this.nameState = 'success'
      }
    },
    phoneValidation () {
      const regex = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/// 判断是否号码正确
      if (!regex.test(this.phone)) {
        this.phoneState = 'error'
      } else {
        this.phoneState = 'success'
      }
    },
    addressValidation () {
      const regex = /^[\u4E00-\u9FA5_A-Za-z0-9]+$/ // 判断是否有特殊字符
      if (!regex.test(this.address)) {
        this.addressState = 'error'
      } else {
        this.addressState = 'success'
      }
    }
  },
  watch: {
    name (value) {
      this.$emit('onValueChange', {name: 'name', value: value, index: this.index})
    },
    relationship (value) {
      this.$emit('onValueChange', {name: 'relationship', value: value, index: this.index})
    },
    phone (value) {
      this.$emit('onValueChange', {name: 'phone', value: value, index: this.index})
    },
    address (value) {
      this.$emit('onValueChange', {name: 'address', value: value, index: this.index})
    }
  },
  mounted () {
    if (this.info) {
      this.name = this.info.name
      this.relationship = this.info.relationship
      this.phone = this.info.phone
      this.address = this.info.address
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  font-size: 3.73vw;
  color: #444444;
  margin-left: 4.26vw;
  margin-top: 2vh;
}
.line{
  background: #fff;
  height: 7.46vh;
}
.ts{
  font-size: 17px;
  line-height: 7vh;
  .label{
    margin-left: 4.26vw;
    border-bottom: 1px solid rgba(238,238,238,1);
  }
}
.interspace{
  width: 100vw;
  height: 1.3vh;
  background: #f8f8f8;
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
}

.guardian >>> .vux-no-group-title{
  margin-top: 0;
  font-size: 4.53vw;
  margin-left: 4.26vw;
  height: 7vh;
  line-height: 7vh;
  border-bottom: 1px solid rgba(238,238,238,1);
  padding: 0;
  padding-right: 4.26vw;
}
.guardian >>> .weui-cell {
  padding: 0;
}
.guardian >>> .weui-cells:before{
  display: none;
}
.guardian >>> .weui-cells:after{
  display: none;
}
</style>
