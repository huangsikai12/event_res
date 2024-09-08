<template>
  <div>
    <van-sticky>
    <van-notice-bar
        left-icon="volume-o"
        text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。"
    />
    </van-sticky>
    <Home v-if="BottomBarActive==0"></Home>
    <van-tabs v-model:active="TopBarActive" v-if="BottomBarActive == 1">
      <van-tab title="活动列表"><ActivityLIst></ActivityLIst></van-tab>
      <van-tab title="已报名活动"><JoinActivity></JoinActivity></van-tab>
      <van-tab v-if="user.roleId == 1" title="核验未登录签到"><CheckNoSign></CheckNoSign></van-tab>
    </van-tabs>
    <PersonInformation v-if="BottomBarActive==2"></PersonInformation>
    <van-tabbar v-model="BottomBarActive">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="tosend">活动</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>


  </div>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import ActivityLIst from "./ActivityLIst.vue";
import JoinActivity from "./JoinActivity.vue";
import PersonInformation from "./PersonInformation.vue";
import CheckNoSign from "./CheckNoSign.vue";
import {useUserStore} from "../store/useUserStore.ts";
import Home from "./Home.vue";
const TopBarActive = ref(0);
const BottomBarActive = ref(0);

const {parseUser} = useUserStore()
const user = parseUser()

</script>