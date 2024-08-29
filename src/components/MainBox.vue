<template>
  <div>
    <van-sticky>
    <van-notice-bar
        left-icon="volume-o"
        text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。"
    />
    </van-sticky>
    <van-tabs v-model:active="active">
      <van-tab title="活动列表"><ActivityLIst></ActivityLIst></van-tab>
      <van-tab title="已报名活动"><JoinActivity></JoinActivity></van-tab>
      <van-tab title="我的"><PersonInfomation></PersonInfomation></van-tab>
    </van-tabs>

  </div>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import ActivityLIst from "./ActivityLIst.vue";
import JoinActivity from "./JoinActivity.vue";
import PersonInfomation from "./PersonInfomation.vue";
const active = ref(0);

</script>