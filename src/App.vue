<template>

  <van-nav-bar
      title="活动报名平台"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"/>
  <router-view></router-view>

</template>
<script setup lang="ts">

import {onMounted, ref} from "vue";
import {router} from "./router/config.ts";
const isOnline = ref(true)
const onClickLeft = () => router.back();
onMounted(()=>{
  checkNetworkStatus();
  window.addEventListener('online', checkNetworkStatus);
  window.addEventListener('offline', checkNetworkStatus);
})

const checkNetworkStatus=()=> {
  if (navigator.onLine) {
    isOnline.value = true;
  } else {
    isOnline.value = false;
  }
}
</script>