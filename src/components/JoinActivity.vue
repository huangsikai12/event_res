<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import {onMounted, ref} from "vue";
import {showFailToast, showToast} from "vant";
import {Activity} from "../interface/DataInterface.ts";
import {useUserStore} from "../store/useUserStore.ts";
import axios from "axios";
import {BASE_URL} from "../Constants.ts";
const userStore = useUserStore()
const user = userStore.user
const verPwdShow = ref(false)
const signPwd = ref("")
const signEventId = ref(0)

//活动状态 0:待开始 1:正在开始 2:已结束 3:已同步
//用户状态 0:未签到 1:已签到
const list = ref<Array<Activity>>([]);
const loading = ref(false);
const finished = ref(true);
const getUserJoinActivity =async () => {

  const res = await axios.get(`${BASE_URL}/join/get/user/detail?uid=${user.uid}`)
  console.log(res)
  if (res.data.data != null) {
    list.value =res.data.data
  }
  console.log(list)

}


const cancelActivity=async (item: Activity) => {
  const res = await axios.get(`${BASE_URL}/join/cancel?uid=${user.id}&eid=${item.id}`)
  if (res != null) {
    showToast(`取消报名成功！`);
    await getUserJoinActivity()
  } else {
    showToast(`取消报名失败！`);
  }

}
onMounted(()=>{
  getUserJoinActivity()
})

const verSignPwd=async () => {
  if(signPwd.value=="")
  {
    showFailToast("签到码不能为空")
    return;
  }
  if (signEventId.value == 0) {
    return;
  }
  //验证签到码
  const res = await axios.post(`${BASE_URL}/event/verSignPwd/${signEventId.value}?signPwd=${signPwd.value}`, user
  )
  if (res.data!=null)
  {
    showToast(res.data.msg)

  }else
  {
    showFailToast("请求失败")
  }
  await getUserJoinActivity()
  verPwdShow.value = false
}

const beforeSign=(item:Activity)=>{

  if (item.userStatus == 0)
  {
    verPwdShow.value = true
    signEventId.value = item.id
    return
  }
  showToast("你已经签到过了")

}

</script>

<template>

  <van-popup
      v-model:show="verPwdShow"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
  >
    <template #default>
      <h3 style="width: 100%;text-align: center;margin: 0;height: 50px;line-height: 50px">签到验证</h3>
      <van-cell-group inset>
        <van-field  v-model="signPwd" label="签到码" placeholder="请输入签到码" />
      </van-cell-group>
      <div class="centered-button-container">
        <van-button type="primary" style="align-self: center" @click="verSignPwd()">验证并签到</van-button>
      </div>
    </template>
  </van-popup>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      style="height: 40px;"
  >
    <van-cell-group v-for="item in list" :key="item.id">
      <van-cell >
        <template #label>
          地点：{{item.place}}
          <br>
          {{item.description}}
        </template>
        <template #title>
          <span  style="margin-right: 10px" class="custom-title">{{item.title}}</span>
          <van-tag type="primary">
            {{ item.time.length<7?"长期活动":item.time }}
          </van-tag>
        </template>
        <template #extra>

        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <van-button v-if="item.status==0 && item.userStatus == 0" type="danger"  @click="cancelActivity(item)">取消报名</van-button>
          <van-button type="success">活动状态：{{item.status ==0?"待开始":item.status ==1 && item.userStatus == 0?"未签到":item.status ==1 && item.userStatus == 1?"已签到":item.status ==2?"已结束":"已同步"}}</van-button>
          <br>
          <van-button v-if="item.status==1 && item.userStatus==0" type="success"  @click="beforeSign(item)">签到</van-button>
        </template>

      </van-cell>
    </van-cell-group>
  </van-list>

</template>

<style scoped>
.van-button{
  margin: 5px;
}
.centered-button-container {
  display: flex; /* 使用 Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-top: 10px;
  width: 100%; /* 设置容器宽度为视口宽度 */
}


</style>