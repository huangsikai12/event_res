<script setup lang="ts">


import {onMounted, ref} from "vue";
import axios from "axios";
import {BASE_URL} from "../Constants.ts";
import {Activity, GeneralOptionsInter, SelectedOptionsInter} from "../interface/DataInterface.ts";
import {showFailToast, showLoadingToast, showToast} from "vant";


const uid = ref()
const verPwdShow = ref(false)
const signPwd = ref("")
const select_event = ref<GeneralOptionsInter>({text:"",value:""})
const showPicker = ref(false)
const columns = ref([{}])
onMounted(async ()=>{
  const res  = await axios.get(`${BASE_URL}/event/all?status=1`);
  if (res.data!=null)
  {
    res.data.data.forEach((event:Activity)=>
    {
      columns.value.unshift({text:event.title,value:event.id})
    })
  }
})
const onConfirm = ({ selectedOptions:selectedOptions}:SelectedOptionsInter) => {
  select_event.value = selectedOptions[0]
  showPicker.value = false;
};
const onSubmit=async () => {
  showLoadingToast("提交中......")
  // const res =  await  axios.get(`${BASE_URL}/user/get?uid=${uid.value}`)
  const res2 =  await  axios.get(`${BASE_URL}/join/get/user?uid=${uid.value}&eid=${select_event.value.value}`)
  if ( res2.status == 200)
  {
    // if (res.data.code !=404)
    // {
    //   showFailToast("学号存在，此功能禁止")
    //   return
    // }
    if (res2.data.data.length !=0)
    {
      showFailToast("您已经签到过了！")
      return
    }
    verPwdShow.value = true

  }else
  {
    showFailToast("网络错误")
  }
}

const verSignPwd=async () => {
  showLoadingToast("提交中......")
  if(signPwd.value=="")
  {
    showFailToast("签到码不能为空")
    return;
  }
  if (select_event.value.value == "0") {
    return;
  }
  //验证签到码
  const res = await axios.post(
      `${BASE_URL}/event/verSignPwd/${select_event.value.value}?signPwd=${signPwd.value}&status=3`,
      {
        uid:uid.value
      }
  )
  if (res.data!=null)
  {
    showToast(res.data.msg)

  }else
  {
    showFailToast("请求失败")
  }
  verPwdShow.value = false
}

</script>

<template>
  <van-image
      round
      width="10rem"
      height="10rem"
      src="https://image.huangsikai.top/logo.jpeg"
      style="display:block; margin:auto;"
  />
  <van-popup
      v-model:show="verPwdShow"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
  >
    <template #default>
      <h3 style="width: 100%;text-align: center;margin: 0;height: 50px;line-height: 50px">签到验证</h3>
      <van-cell-group inset>
        <van-field  v-model="signPwd" label="签到码" placeholder="请输入签到码" />
      </van-cell-group>
      <div class="centered-button-container">
        <van-button type="primary" style="align-self: center" @click="verSignPwd()">验证并签到</van-button>
      </div>
    </template>
  </van-popup>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="uid"
          name="uid"
          label="学号"
          type="digit"
          placeholder="请输入学号"
          :rules="[{ required: true, message: '请填写学号' }]"
      />
      <van-field
          v-model="select_event.text"
          is-link
          readonly
          name="picker"
          label="选择活动"
          placeholder="点击选择活动"
          @click="showPicker = true"
          :rules="[{ required: true, message: '请选择活动' }]"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-picker
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
        />
      </van-popup>

    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交签到申请
      </van-button>
    </div>

  </van-form>

</template>

<style scoped>
.centered-button-container {
  display: flex; /* 使用 Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-top: 10px;
  width: 100%; /* 设置容器宽度为视口宽度 */
}

</style>