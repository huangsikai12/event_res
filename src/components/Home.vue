<script setup lang="ts">

import {onMounted, ref} from "vue";
import axios from "axios";
import {BASE_URL} from "../Constants.ts";
import {HomeGrid} from "../interface/DataInterface.ts";
const homeGrid = ref<Array<HomeGrid>>([])
const guideImage :Array<string>= [
    "https://image.huangsikai.top/guide_1.jpg",
    "https://image.huangsikai.top/guide_2.jpg",
    "https://image.huangsikai.top/guide_3.jpg",
    "https://image.huangsikai.top/guide_4.jpg",
]

onMounted(async ()=>{

  const res = await axios.get(`${BASE_URL}/home/getHomeGrids`)
  if (res.data!=null)
  {
    homeGrid.value = res.data.data
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
    <van-swipe-item v-for="image in guideImage">
      <van-image
        width="100%"
        height="50%"
        :src="image"
    />
      </van-swipe-item>
  </van-swipe>
  <van-divider>导航区</van-divider>
  <van-grid :gutter="10" style="margin-bottom: 100px">
    <van-grid-item v-for="value in homeGrid" @click="gridClick(value)" :key="value.title" :icon="value.image" :text="value.title" />
  </van-grid>




</template>

<style scoped>

</style>