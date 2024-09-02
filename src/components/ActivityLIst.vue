<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import {onMounted, ref} from "vue";
import {showToast} from "vant";
import {Activity, JoinedInfo} from "../interface/DataInterface.ts";
import {useUserStore} from "../store/useUserStore.ts";
import axios from "axios";
import {BASE_URL} from "../Constants.ts";
const userStore = useUserStore()
const user = userStore.user
const joinIdList = ref<Array<number>>([])
const list = ref<Array<Activity>>([]);
const getActivityList =async () => {
  const data = await axios.get(`${BASE_URL}/event/all`)
  console.log(data)
  if (data.data.data != null) {
    list.value = data.data.data
  }
  console.log(list)

}
const getUserJoin =async () => {

  joinIdList.value = []
  const data = await axios.get(`${BASE_URL}/join/get/user?uid=${user.uid}`)
  console.log(data)
  if (data.data.data != null) {
    data.data.data.forEach((join_data:JoinedInfo)=>{
      joinIdList.value.push(join_data.event_id)
    })
  }
  console.log(list)

}
onMounted(()=>{
  getActivityList()
  getUserJoin()
})
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
const joinActivity=async (item: Activity) => {
  const res = await axios.get(`${BASE_URL}/join/add?uid=${user.id}&eid=${item.id}`)
  if (res!=null)
  {
    showToast(`报名成功！`);
    await getActivityList()
    await getUserJoin()
  }
  else
  {
    showToast(`报名失败！`);
  }



}
const cancelActivity=async (item: Activity) => {
  const res = await axios.get(`${BASE_URL}/join/cancel?uid=${user.id}&eid=${item.id}`)
  if (res != null) {
    showToast(`取消报名成功！`);
    await getActivityList()
    await getUserJoin()
  } else {
    showToast(`取消报名失败！`);
  }

}



</script>

<template>
  <van-button  v-if="user.roleId == 1" type="primary">注册活动</van-button>
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
              <van-button v-if="!joinIdList.includes(item.id)" @click="joinActivity(item)" type="success" >点击报名</van-button>
              <van-button v-else type="danger"  @click="cancelActivity(item)">取消报名</van-button>
              <van-button v-if="user.roleId == 1" type="warning">下架活动</van-button>
              <van-button  v-if="user.roleId == 1"type="primary">查看报名</van-button>
            </template>

        </van-cell>
      </van-cell-group>
    </van-list>

</template>

<style scoped>
.van-button{
  margin: 5px;
}

</style>