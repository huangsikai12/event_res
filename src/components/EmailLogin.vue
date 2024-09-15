<script setup lang="ts">

import {useUserStore} from "../store/useUserStore";
import {User} from "../interface/DataInterface";
import axios from "axios";
import {showFailToast, showLoadingToast, showSuccessToast} from "vant";
import {BASE_URL} from "../Constants";
import {router} from "../router/config";
import {ref} from "vue";

const login_form = ref<User>(new User())
const userStore = useUserStore()
const send_email_status = ref(0)
const secondsLeft =ref(0)
const email_verPwd =ref("")
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

const sendEmail = async (email: string) => {
  console.log(email)
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // if (email == undefined) {
  //   showFailToast("邮箱不能为空")
  //   return
  // }
  // if (!emailRegex.test(email)) {
  //   showFailToast("邮箱不符合规定！")
  //   return
  // }
  // send_email_status.value = 1
  // const res = await axios.post(`${BASE_URL}/email/sendCode`, {
  //   uid: "",
  //   email: email,
  //   action:1
  // })
  // if (res.data != null && res.data.code == 200) {
  //   showSuccessToast("发送成功")
  //   send_email_status.value = 2
  //   startCountdown(1)
  //
  // } else {
  //   send_email_status.value = 0
  //   showFailToast(res.data==null?"发送失败":res.data.msg)
  // }


}

</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="login_form.phone"
          name="邮箱"
          label="邮箱"
          placeholder="请输入邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
      >
        <template #button>
          <van-button v-if="send_email_status == 0 " @click="sendEmail(login_form.phone)" size="small"
                      type="primary">发送验证码
          </van-button>
          <van-button v-if="send_email_status == 1 " loading type="primary" loading-type="spinner"/>
          <van-button v-if="send_email_status == 2 " disabled type="primary">{{secondsLeft}}秒后再次获取</van-button>
        </template>
      </van-field>

      <van-field
          v-model="email_verPwd"
          type="password"
          name="邮箱验证码"
          label="邮箱验证码"
          placeholder="请输入邮箱验证码"
          :rules="[{ required: true, message: '请填写邮箱验证码' }]"
      />
    </van-cell-group>

    <div style="margin: 16px;">
          <van-button round block type="success" native-type="submit">
            登录
          </van-button>
    </div>

  </van-form>
  <div style="margin: 16px;">
    <van-button  @click="router.push('/')" round block type="primary" native-type="submit">
      账号密码登录
    </van-button>
  </div>
</template>

<style scoped>

</style>