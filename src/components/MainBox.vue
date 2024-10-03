<template>
  <div>
    <van-sticky>
    <van-notice-bar v-if="TopText.length != 0"
        left-icon="volume-o"
        :text="TopText"
    />
    </van-sticky>
    <Home v-if="BottomBarActive==0"></Home>
    <van-tabs v-model:active="TopBarActive" v-if="BottomBarActive == 1">
      <van-tab title="活动列表"><ActivityLIst></ActivityLIst></van-tab>
      <van-tab title="已报名活动"><JoinActivity></JoinActivity></van-tab>
      <van-tab v-if="user.roleId == 1" title="核验未登录签到"><CheckNoSign></CheckNoSign></van-tab>
    </van-tabs>
    <PersonInformation v-if="BottomBarActive==2"></PersonInformation>
    <Manage v-if="BottomBarActive==3"></Manage>
    <van-tabbar v-model="BottomBarActive">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="tosend">活动</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
      <template v-if="user.roleId == 1">
        <van-tabbar-item icon="setting-o">管理</van-tabbar-item>
      </template>
    </van-tabbar>


  </div>

</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue';
import ActivityLIst from "./ActivityLIst.vue";
import JoinActivity from "./JoinActivity.vue";
import PersonInformation from "./PersonInformation.vue";
import CheckNoSign from "./CheckNoSign.vue";
import {useUserStore} from "../store/useUserStore.ts";
import Home from "./Home.vue";
import axios from "axios";
import {BASE_URL} from "../Constants.ts";
import Manage from "./Manage.vue";
const TopBarActive = ref(0);
const BottomBarActive = ref(0);
const TopText = ref("")

const {parseUser} = useUserStore()
const user = parseUser()
onMounted(async ()=>{

  const res = await axios.get(`${BASE_URL}/home/getTopInfo`);
  if (res.data!=null && res.data.data!=null)
  {
    TopText.value = res.data.data
  }
})

</script>