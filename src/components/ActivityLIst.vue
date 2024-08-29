<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import {ref} from "vue";
import {showToast} from "vant";
import {Activity} from "../interface/DataInterface.ts";
import {useUserStore} from "../store/useUserStore.ts";
const userStore = useUserStore()
const user = userStore.user
const joinIdList = ref([1,2,3])
const list = ref([
  {
    id: 1,
    title:"测试",
    time:"2024-11-11 18:00:00",
    description:"这是一个活动",
    joinCount:1,
    totalCount:100,
    place:"教室",
    status:0,
    signPwd:""
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
    signPwd:""
  },
  {
    id: 3,
    title:"测试",
    time:"2024-11-11",
    description:"这是一个活动",
    joinCount:1,
    totalCount:100,
    place:"教室",
    status:0,
    signPwd:""
  },
  {
    id: 4,
    title:"测试",
    time:"2024-11-11",
    description:"这是一个活动",
    joinCount:1,
    totalCount:100,
    place:"教室",
    status:0,
    signPwd:""
  },
  {
    id: 5,
    title:"测试",
    time:"2024-11-11",
    description:"这是一个活动",
    joinCount:1,
    totalCount:100,
    place:"教室",
    status:0,
    signPwd:""
  },
  {
    id: 6,
    title:"测试",
    time:"2024-11-11",
    description:"这是一个活动",
    joinCount:1,
    totalCount:100,
    place:"教室",
    status:0,
    signPwd:""
  },
  {
    id: 7,
    title:"测试",
    time:"2024-11-11",
    description:"这是一个活动",
    joinCount:1,
    totalCount:100,
    place:"教室",
    status:0,
    signPwd:""
  },
  {
    id: 8,
    title:"测试",
    time:"2024-11-11",
    description:"这是一个活动",
    joinCount:1,
    totalCount:100,
    place:"教室",
    status:0,
    signPwd:""

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
  item.joinCount --
  //todo:发送请求
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