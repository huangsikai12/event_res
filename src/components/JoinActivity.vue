<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import {ref} from "vue";
import {showToast} from "vant";
import {Activity} from "../interface/DataInterface.ts";
import {useUserStore} from "../store/useUserStore.ts";
const userStore = useUserStore()
const user = userStore.user
const joinIdList = ref([1,2,3])
const setPwdShow = ref(false)
const setPwdEventID = ref(0)
const verPwdShow = ref(false)
const signPwd = ref("")
//0:待开始 1:正在开始 2:已结束 3:已同步
const list = ref([
  {
    id: 1,
    title:"测试",
    time:"2024-11-11 18:00:00",
    description:"这是一个活动",
    joinCount:1,
    totalCount:100,
    place:"教室",
    status:1,
    signPwd:"",
  },
  {
    id: 2,
    title:"测试",
    time:"2024-11-11",
    description:"这是一个活动",
    joinCount:1,
    totalCount:100,
    place:"教室",
    status:0,
    signPwd:"",
  },
  {
    id: 3,
    title:"测试",
    time:"2024-11-11",
    description:"这是一个活动",
    joinCount:1,
    totalCount:100,
    place:"教室",
    status:2,
    signPwd:"",
  },
  {
    id: 4,
    title:"测试",
    time:"2024-11-11",
    description:"这是一个活动",
    joinCount:1,
    totalCount:100,
    place:"教室",
    status:3,
    signPwd:"",
  },
]);
const loading = ref(false);
const finished = ref(true);
// const onLoad = () => {
//   // 异步更新数据
//   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
//   setTimeout(() => {
//
//
//     // 加载状态结束
//     loading.value = false;
//
//     // 数据全部加载完成
//     if (list.value.length >= 40) {
//       finished.value = true;
//     }
//   }, 1000);
// };
const joinActivity=(item:Activity)=>{
  showToast(`成功报名活动${item.id}`);
  joinIdList.value.push(item.id)
  item.joinCount ++
  //todo:发送请求
}
const cancelActivity=(item:Activity)=>{
  showToast(`成功取消报名${item.id}`);
  joinIdList.value = joinIdList.value.filter(value=>value!=item.id)
  list.value = list.value.filter(value=>value.id!=item.id)
  item.joinCount --
  //todo:发送请求
}

const setSignPwd=()=>{

  if (setPwdEventID.value == 0)
  {
    return;
  }
  //设置签到码
  verPwdShow.value = false
}
const verSignPwd=()=>
{
  if (setPwdEventID.value == 0)
  {
    return;
  }
  //验证签到码
  verPwdShow.value = false
}



</script>

<template>
  <van-popup
      v-model:show="setPwdShow"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
  >
    <template #default>
      <h3 style="width: 100%;text-align: center;margin: 0;height: 50px;line-height: 50px">设置签到码</h3>
      <van-cell-group inset>
        <van-field v-model="signPwd" label="签到码" placeholder="请输入签到码" />
      </van-cell-group>
      <div class="centered-button-container">
        <van-button type="primary" style="align-self: center" @click="setSignPwd()">设置签到码并开始活动</van-button>
      </div>
    </template>
  </van-popup>
  <van-popup
      v-model:show="verPwdShow"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
  >
    <template #default>
      <h3 style="width: 100%;text-align: center;margin: 0;height: 50px;line-height: 50px">签到验证</h3>
      <van-cell-group inset>
        <van-field v-model="signPwd" label="签到码" placeholder="请输入签到码" />
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
            {{ item.time }}
          </van-tag>
        </template>
        <template  #right-icon>
          <span style="margin-right: 10px">{{item.joinCount}}/{{item.totalCount}}</span>
        </template>
        <template #extra>

        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <van-button v-if="item.status==0" type="danger"  @click="cancelActivity(item)">取消报名</van-button>
          <van-button type="success">活动状态：{{item.status ==0?"待开始":item.status ==1?"已开始":item.status ==2?"已结束":"已同步"}}</van-button>
          <br>
          <van-button v-if="item.status==1" type="success"  @click="verPwdShow = true;setPwdEventID=item.id">签到</van-button>
          <van-button v-if="item.status==0&&user.roleId==1" @click="setPwdShow = true;setPwdEventID=item.id" type="primary">设置签到码</van-button>
          <van-button v-if=" item.status==1&&user.roleId==1" type="primary">查看签到人数</van-button>
          <br>
          <van-button v-if="item.status==0 &&user.roleId==1" type="warning">结束活动</van-button>
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