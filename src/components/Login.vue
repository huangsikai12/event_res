<script setup lang="ts">
import {ref} from "vue";
import {router} from "../router/config.ts";
import {useUserStore} from "../store/useUserStore.ts";
import {User} from "../interface/DataInterface.ts";
import {showFailToast, showLoadingToast, showSuccessToast} from "vant";
import axios from 'axios'
import {BASE_URL} from "../Constants.ts";

const uid = ref('');
const pwd = ref('');
const userStore = useUserStore()
const onSubmit = async (values: User) => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration:10000
  })
  const res = await axios.post(`${BASE_URL}/api/user/login`,{
    uid:values.uid,
    pwd:values.pwd
  })
      .catch(()=>{
        showFailToast('请求失败');
        return;

      })
  if (res?.data.code == 200 )
  {
    showSuccessToast('登录成功');
    userStore.changeUser(res.data.data)
    router.push("/main")

  }
  else {
    showFailToast('账号或密码错误');
  }
};

</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="uid"
          name="uid"
          label="学号"
          placeholder="请输入学号"
          :rules="[{ required: true, message: '请填写学号' }]"
      />
      <van-field
          v-model="pwd"
          type="password"
          name="pwd"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>