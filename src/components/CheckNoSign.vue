<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import {BASE_URL} from "../Constants.ts";
import {JoinedInfo} from "../interface/DataInterface.ts";
const list = ref<Array<JoinedInfo>>([])

onMounted(async () => {

  const res = await axios.get(`${BASE_URL}/join/get/status?status=3`)
  if (res.data!=null)
  {
    list.value = res.data.data
  }
})

</script>

<template>

  <van-cell :border="false" title="学号" value="所属活动" />
  <van-list
      finished-text="没有更多了"
  >
    <van-swipe-cell v-for="item in list">
      <van-cell  :key="item.id" :title="item.uid" :value="item.title" />
      <template #right>
        <van-button square type="primary" text="通过" />
        <van-button square type="danger"  text="作废" />
      </template>
    </van-swipe-cell>

  </van-list>



</template>

<style scoped>

</style>