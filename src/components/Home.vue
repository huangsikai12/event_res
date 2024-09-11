<script setup lang="ts">

import {onMounted, ref} from "vue";
import axios from "axios";
import {BASE_URL} from "../Constants.ts";
import {HomeGrid} from "../interface/DataInterface.ts";
const homeGrid = ref<Array<HomeGrid>>([])

onMounted(async ()=>{

  const res = await axios.get(`${BASE_URL}/home/getHomeGrids`)
  if (res.data!=null)
  {
    homeGrid.value = res.data.data
    console.log(homeGrid)
  }
})
const gridClick=(value:HomeGrid)=>{
  const actions = value.action.split("://")
  console.log(actions[0])
  if (actions[0] == "external")
  {
    window.location.href= "https://"+actions[1]
  }
  if (actions[0] == "internal")
  {
    window.location.href= actions[1]
  }
}
</script>

<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" style="margin-bottom: 30px">
    <van-swipe-item>1</van-swipe-item>
    <van-swipe-item>2</van-swipe-item>
    <van-swipe-item>3</van-swipe-item>
    <van-swipe-item>4</van-swipe-item>
  </van-swipe>
  <van-grid :gutter="10">
    <van-grid-item v-for="value in homeGrid" @click="gridClick(value)" :key="value" :icon="value.image" :text="value.title" />
  </van-grid>



</template>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>