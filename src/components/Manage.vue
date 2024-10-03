<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import {BASE_URL} from '../Constants'
import {showToast} from "vant";
import {HomeGrid} from "../interface/DataInterface";

const TopText = ref("")
const homeGrid = ref<Array<HomeGrid>>([])
onMounted(async ()=>{

  const res = await axios.get(`${BASE_URL}/home/getTopInfo`);
  if (res.data!=null && res.data.data!=null)
  {
    TopText.value = res.data.data
  }

  const HomeGridRes = await axios.get(`${BASE_URL}/home/getHomeGrids`)
  if (HomeGridRes.data!=null)
  {
    homeGrid.value = HomeGridRes.data.data
  }
})
const setTopInfo=async()=>
{
  const res = await axios.post(`${BASE_URL}/home/setTopInfo?information=${TopText.value}`)
  if (res.data!=null)
  {
    showToast(res.data.msg)
  }
}


</script>

<template>
  <van-divider>顶部公告</van-divider>
  <van-cell-group inset>
    <van-field
        v-model="TopText"
        center
        clearable
        label="顶部公告"
        placeholder="请输入公告，留空则公告不显示"
    >
      <template #button>
        <van-button size="small" type="primary" @click="setTopInfo()">提交</van-button>
      </template>
    </van-field>
  </van-cell-group>
  <van-divider>首页导航区</van-divider>

  <van-button type="primary" text="新增" />
  <van-list
      :finished="true"
      finished-text="没有更多了"
  >
    <van-swipe-cell v-for="item in homeGrid">
      <van-cell  :key="item.title" :title="item.title" :value="item.action" />
      <template #right>
        <van-button square type="primary" text="更新" />
        <van-button square type="danger"  text="删除" />
      </template>
    </van-swipe-cell>

  </van-list>

</template>

<style scoped>
van-button{
  margin: 5px;
}

</style>