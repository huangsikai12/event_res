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
    <van-swipe-item>
      <van-image
        width="100%"
        height="100%"
        fit="contain"
        src="https://u.huangsikai.top:12543/down/0b4mW9yHJ2ch.jpg"
    />
      </van-swipe-item>
    <van-swipe-item>
      <van-image
          width="100%"
          height="100%"
          fit="contain"
          src="https://u.huangsikai.top:12543/down/UpbavhJk0rA7.jpg"
      />
    </van-swipe-item>
    <van-swipe-item>
      <van-image
          width="100%"
          height="100%"
          fit="contain"
          src="https://u.huangsikai.top:12543/down/IybIMKsU5rpN.jpg"
      />
    </van-swipe-item>
    <van-swipe-item>
      <van-image
          width="100%"
          height="100%"
          fit="contain"
          src="https://u.huangsikai.top:12543/down/JaDQLH74MX0S.jpg"
      />
    </van-swipe-item>

  </van-swipe>
  <van-grid :gutter="10">
    <van-grid-item v-for="value in homeGrid" @click="gridClick(value)" :key="value.title" :icon="value.image" :text="value.title" />
  </van-grid>



</template>

<style scoped>

</style>