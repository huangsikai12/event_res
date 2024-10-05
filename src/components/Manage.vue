<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import {BASE_URL} from '../Constants'
import {showConfirmDialog, showFailToast, showSuccessToast, showToast} from "vant";
import {HomeGrid} from "../interface/DataInterface";

const TopText = ref("")
const homeGrid = ref<Array<HomeGrid>>([])
const selectHomeGrid = ref<HomeGrid>(new HomeGrid())
const modifyHomeGridAction = ref<number>(0)
const modifyHomeGridShow = ref(false);
onMounted(async ()=>{

  const res = await axios.get(`${BASE_URL}/home/getTopInfo`);
  if (res.data!=null && res.data.data!=null)
  {
    TopText.value = res.data.data
  }
  await getHomeGrids()
})

const getHomeGrids = async ()=>{

  const HomeGridRes = await axios.get(`${BASE_URL}/home/getHomeGrids`)
  if (HomeGridRes.data!=null)
  {
    homeGrid.value = HomeGridRes.data.data
  }

}
const setTopInfo=async()=>
{
  const res = await axios.post(`${BASE_URL}/home/setTopInfo?information=${TopText.value}`)
  if (res.data!=null)
  {
    showToast(res.data.msg)
  }
}
const modifyHomeGrid=async ()=>
{
  let res = undefined
  if (modifyHomeGridAction.value == 1)
  {
    res = await axios.post(`${BASE_URL}/home/setHomeGrid`,selectHomeGrid.value)
  }
  if (modifyHomeGridAction.value == 2)
  {
    res = await axios.post(`${BASE_URL}/home/updateHomeGrid`,selectHomeGrid.value)
  }
  if (modifyHomeGridAction.value == 3)
  {
    await showConfirmDialog({
      title: '确认删除',
      message:
          '确定删除导航栏么？删除后不可撤销',
    })
        .then(async () => {
          // on confirm
          res = await axios.get(`${BASE_URL}/home/delHomeGrid/${selectHomeGrid.value.id}`)
        })
        .catch(() => {
          // on cancel
        });
  }
  if (res!=undefined && res.data!= null &&res.data.code == 200)
  {
    showSuccessToast("操作成功")

  }
  else
  {
    showFailToast("操作失败")
  }
  await getHomeGrids()
  selectHomeGrid.value = new HomeGrid()
  modifyHomeGridShow.value = false

}




</script>

<template>
  <van-popup
      v-model:show="modifyHomeGridShow"
      closeable
      position="bottom"
      :style="{ height: '50%' }"
  >
    <template #default>
      <h3 style="width: 100%;text-align: center;margin: 0;height: 50px;line-height: 50px">
        编辑导航栏
      </h3>
      <van-form @submit="modifyHomeGrid">
      <van-cell-group inset>
        <van-field
            v-model="selectHomeGrid.title"
            required
            label="标题"
            placeholder="请输入标题"
            :rules="[{ required: true, message: '请填写标题' }]"
        />
        <van-field
            v-model="selectHomeGrid.image"
            required
            label="图片"
            placeholder="请输入图片网址"
            :rules="[{ required: true, message: '请填写图片网址' }]"
        />
        <van-field
            v-model="selectHomeGrid.action"
            required
            label="行为"
            placeholder="请输入行为"
            :rules="[{ required: true, message: '请填写行为' }]"
        />
      </van-cell-group>
      <p style="margin: 5px;font-size: 12px;color: gainsboro">如果是外部网址，请使用external://开头,如像跳转到百度则填写 external://www.baidu.com
        如果是跳转内部网址则输入internal://开头,如跳转活动报名页面则是internal://#/main</p>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </template>
  </van-popup>
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

  <van-button type="primary"  @click="modifyHomeGridShow = true;modifyHomeGridAction = 1" text="新增"/>
  <van-list
      :finished="true"
      finished-text="没有更多了"
  >
    <van-swipe-cell v-for="item in homeGrid">
      <van-cell  :key="item.id" :title="item.title" />
      <template #right>
        <van-button square type="primary"  @click="modifyHomeGridShow = true ;selectHomeGrid = item;modifyHomeGridAction=2 " text="更新" />
        <van-button square type="danger"  @click="selectHomeGrid = item;modifyHomeGridAction=3;modifyHomeGrid() " text="删除" />
      </template>
    </van-swipe-cell>

  </van-list>

</template>

<style scoped>
van-button{
  margin: 5px;
}

</style>