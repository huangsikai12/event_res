<script setup lang="ts">
import {ref} from "vue";
import {router} from "../router/config.ts";
import {useUserStore} from "../store/useUserStore.ts";
import {User} from "../interface/DataInterface.ts";
import {showFailToast, showLoadingToast, showSuccessToast} from "vant";
import axios from 'axios'
import {BASE_URL} from "../Constants.ts";

const login_form = ref<User>(new User())
const userStore = useUserStore()
const onSubmit = async () => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration:10000
  })
  const res = await axios.post(`${BASE_URL}/user/login`,login_form.value)
  if (res?.data.code == 200 )
  {
    showSuccessToast('登录成功');
    userStore.changeUser(res.data.data)
    await router.push("/main")

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
          v-model="login_form.uid"
          name="uid"
          label="学号"
          type="digit"
          placeholder="请输入学号"
          :rules="[{ required: true, message: '请填写学号' }]"
      />
      <van-field
          v-model="login_form.pwd"
          type="password"
          name="pwd"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>

    <div style="margin: 16px;">
      <van-row>
        <van-col span="12">
          <van-button round block type="success" native-type="submit">
            登录
          </van-button>
        </van-col>

        <van-col span="12">
          <van-button round block type="primary" @click="router.push('/register')">
            注册
          </van-button>
        </van-col>
      </van-row>
    </div>

  </van-form>
  <div style="margin: 16px;">
    <van-button  @click="router.push('/emailLogin')" round block type="primary" native-type="submit">
      邮箱验证码登录
    </van-button>
  </div>
  <div style="margin: 16px;">
    <van-button  @click="router.push('/noLoginSign')" round block type="primary" native-type="submit">
      无登录状态签到
    </van-button>
  </div>
</template>

<style scoped>

</style>