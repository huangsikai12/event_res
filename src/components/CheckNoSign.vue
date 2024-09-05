<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import {BASE_URL} from "../Constants.ts";
import { JoinedInfo} from "../interface/DataInterface.ts";
import {showFailToast, showLoadingToast, showSuccessToast} from "vant";
const list = ref<Array<JoinedInfo>>([])
const loading = ref(false)
const onRefresh=async () => {
  await getInfo()
}

onMounted(async () => {

  await getInfo()
})

const getInfo=async () => {
  const res = await axios.get(`${BASE_URL}/join/get/status?status=3`)
  if (res.data != null) {
    list.value = res.data.data
  }
  loading.value=false
}

const changeStatus=async (uid: string, eid: string, status: number) => {
  showLoadingToast("处理中！")
  const res = await axios.post(`${BASE_URL}/join/set/status`, {
    uid: uid,
    eid: eid,
    status: status,
  })
  if (res.data!=null)
  {
    await getInfo()
    showSuccessToast("通过成功")
  }else
  {
    showFailToast("通过失败")
  }
}
const deleteSign=async (uid: string, eid: string) => {
  showLoadingToast("处理中！")
  const res = await axios.get(`${BASE_URL}/join/cancel?uid=${uid}&eid=${eid}`)
  if (res.data!=null)
  {
    await getInfo()
    showSuccessToast("删除成功")
  }else
  {
    showFailToast("删除失败")
  }
}
</script>

<template>

  <van-button type="primary" text="全部通过" />
  <van-pull-refresh
      style="height: 100vh"
      v-model="loading"
      @refresh="onRefresh"
      success-text="刷新成功">
  <van-cell :border="false" title="学号" value="所属活动" />
    <van-list
        :finished="true"
        finished-text="没有更多了"
    >
      <van-swipe-cell v-for="item in list">
        <van-cell  :key="item.id" :title="item.uid" :value="item.title" />
        <template #right>
          <van-button square type="primary" text="通过" @click="changeStatus(item.uid,item.eid,1)" />
          <van-button square type="danger"  text="作废" @click="deleteSign(item.uid,item.eid)"/>
        </template>
      </van-swipe-cell>

    </van-list>
  </van-pull-refresh>




</template>

<style scoped>
van-button{
  margin: 5px;
}
</style>