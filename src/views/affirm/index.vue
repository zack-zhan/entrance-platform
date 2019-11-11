<template>
  <div class="box">
    <div class="title">学生信息</div>
    <div class="line">
      <div class="laber">姓名</div>
      <div class="content">{{name}}</div>
    </div>
    <div class="line">
      <div class="laber">准考证号</div>
      <div class="content">{{examineeNo}}</div>
    </div>
    <div class="line">
      <div class="laber">身份证号</div>
      <div class="content">{{identityCard}}</div>
    </div>

    <div class="line mt">
      <div class="laber">民族</div>
      <div class="content">{{oneStep.nation}}</div>
    </div>
    <div class="line">
      <div class="laber">政治面貌</div>
      <div class="content">{{oneStep.politicalStatus}}</div>
    </div>
    <div class="line special">
      <div class="laber">户籍</div>
      <div class="content">{{oneStep.censusRegister}}</div>
    </div>
    <div class="line">
      <div class="laber">固定电话</div>
      <div class="content">{{oneStep.telephone}}</div>
    </div>
    <div class="line">
      <div class="laber">寄宿方式</div>
      <div class="content">{{oneStep.lodgingFlag}}</div>
    </div>

    <div class="line mt">
      <div class="special_laber">曾担任职务</div>
      <div class="special_content">{{twoStep.previousPositions}}</div>
    </div>

    <div class="textbox">
      <div class="laber">特长</div>
      <div class="content">{{twoStep.specialty}}</div>
      <div class="number fr">{{twoStep.specialty.length}}/400</div>
    </div>
    <div class="textbox">
      <div class="laber">获奖情况</div>
      <div class="content">{{twoStep.awards}}</div>
      <div class="number fr">{{twoStep.awards.length}}/400</div>
    </div>

    <div class="line mt">
      <div class="special_laber">家庭人数</div>
      <div class="content">{{threeStep.familyTotal}}</div>
    </div>

    <div class="guardian" v-for="(item,index) in threeStep.keeperList" :key="index">
      <div class="title" v-if="index === 0">家庭成员信息</div>
      <div class="interspace"></div>
      <div class="line">
        <div class="label">监护人{{index + 1}}</div>
      </div>
      <div class="line">
        <div class="laber">姓名</div>
        <div class="content">{{item.name}}</div>
      </div>
      <div class="line">
        <div class="laber">关系</div>
        <div class="content">{{item.relationship[0]}}</div>
      </div>
      <div class="line">
        <div class="laber">联系电话</div>
        <div class="content">{{item.phone}}</div>
      </div>
      <div class="line">
        <div class="laber">工作单位</div>
        <div class="content">{{item.address}}</div>
      </div>
    </div>

    <div class="footer">
      <mt-button type="default" @click="shadeShow = true">确认资料</mt-button>
    </div>
    <div class="shade" v-if="shadeShow">
      <div class="dialogs">
        <div class="d_text">
          <div>一旦确认了信息，便不能更改请三思！</div>
        </div>
        <div class="d_footer">
          <div @click="affirm">确认</div>
          <div @click="shadeShow = false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui'
import { getStudentByExamineeCode, updateStudentByEntrance } from '@/api'

import { getCookie } from '@/utils/cookies'
export default {
  data () {
    return {
      oneStep: {},
      twoStep: {},
      threeStep: {},

      name: '',
      examineeNo: '',
      identityCard: '',

      corpId: '',
      studentCode: '',
      originStudentId: '',

      shadeShow: false
    }
  },
  methods: {
    list () {
      const id = getCookie('examineeNo')
      this.corpId = getCookie('corpId')
      const request = {
        examineeCode: id,
        corpId: this.corpId
      }
      getStudentByExamineeCode(request)
        .then(res => {
          if (res.code === 200) {
            // this.examineeNo = id
            // this.name = res.body.studentName
            // this.identityCard = res.body.certificateNo
            this.studentCode = res.body.studentCode
            this.originStudentId = res.body.originStudentId
          } else {
            Toast(res.message)
          }
        })
    },
    // 确认资料
    affirm () {
      this.threeStep.keeperList.map(item => {
        console.log(item, 'item')
        if (item.relationship[0] === '父亲') {
          item.relationship = 0
        } else if (item.relationship[0] === '母亲') {
          item.relationship = 1
        } else if (item.relationship[0] === '祖母') {
          item.relationship = 2
        } else if (item.relationship[0] === '祖父') {
          item.relationship = 3
        } else if (item.relationship[0] === '兄弟') {
          item.relationship = 4
        } else if (item.relationship[0] === '姊妹') {
          item.relationship = 5
        } else {
          item.relationship = 6
        }
      })
      const obj = {
        awards: this.twoStep.awards,
        censusRegister: this.oneStep.censusRegister,
        certificateNo: this.certificateNo,
        familyTotal: parseInt(this.threeStep.familyTotal),
        keeperList: this.threeStep.keeperList,
        lodgingFlag: this.oneStep.lodgingFlag === '是' ? 1 : 0,
        nation: this.oneStep.nation,
        politicalStatus: this.oneStep.politicalStatus,
        previousPositions: this.twoStep.previousPositions,
        specialty: this.twoStep.specialty,
        telephone: this.oneStep.telephone,
        studentName: this.name,
        examineeNo: this.examineeNo,
        identityCard: this.identityCard,

        corpId: this.corpId,
        studentCode: this.studentCode,
        originStudentId: this.originStudentId
      }
      Indicator.open('提交中')
      updateStudentByEntrance(obj).then(res => {
        if (res.code === 200) {
          this.$store.commit('setReplenishOne', {})
          this.$store.commit('setReplenishTwo', {})
          this.$store.commit('setReplenishThree', {})
          Indicator.close()
          this.$router.push('/accomplish')
        } else {
          Indicator.close()
          Toast(res.message)
        }
      })
    }
  },
  created () {
    this.oneStep = this.$store.state.replenishOne
    this.twoStep = this.$store.state.replenishTwo
    this.threeStep = this.$store.state.replenishThree
  },
  mounted () {
    const queryInfo = this.$store.state.queryInfo
    this.name = queryInfo.name
    this.examineeNo = queryInfo.examineeNo
    this.identityCard = queryInfo.identityCard
    this.list()
  }
}
</script>

<style lang="scss" scoped>
.box{
  width: 100vw;
  background: #f8f8f8;
  position: relative;
}
.title{
  height: 6.3vh;
  line-height: 7vh;
  padding-left: 4vw;
}
.interspace{
  width: 100vw;
  height: 1.3vh;
  background: #f8f8f8;
}
.line{
  height: 7.46vh;
  line-height: 7.33vh;
  font-size: 17px;
  background: #fff;
  padding: 0 4vw;
  border-bottom: 1px solid rgba(238,238,238,1);
  .laber{
    float: left;
    width: 18.13vw;
    min-width: 75px;
    margin-right: 7.4vw;
  }
  .special_laber{
    float: left;
    width: 22.66vw;
    min-width: 90px;
    margin-right: 2.93vw;
  }
  .special_content{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.mt{
  margin-top: 1.3vh;
}
.textbox{
  margin-top: 1.3vh;
  width: 100%;
  height: 28.19vh;
  background: #fff;
  .laber{
    font-size: 17px;
    margin-left: 4vw;
    padding-top: 1.62vh;
    padding-bottom: 1.62vh;
  }
  .content{
    font-size: 17px;
    width: 91.16vw;
    height: 16.9vh;
    margin-left: 4vw;
    line-height: 4.22vh;
    word-wrap:break-word;

    display: -webkit-box;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      -webkit-line-clamp: 4;
      overflow: hidden;
  }
  .number{
    font-size: 12px;
    color:rgba(187,187,187,1);
    margin-right: 4.26vw;
    margin-top: 1.62vh;
  }
}
.footer{
  width: 100%;
  height: 10.11vh;
  line-height: 10.11vh;
  text-align: center;
  border-top: 1px solid rgba(221,221,221,1);
  margin-top: 1.99vh;
}

.special {
  .content{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-right: 16px;
  }
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
    height: 35vw;
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
.footer >>> .mint-button{
  width: 92vw;
  height: 7.96vh;
  background:#0C60AA;
  color: #fff;
  font-size: 18px;
}
</style>
