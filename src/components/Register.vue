<script setup lang="ts">
import {ref} from "vue";
import {User} from "../interface/DataInterface.ts";
import axios from "axios";
import {BASE_URL} from "../Constants.ts";
import {showFailToast, showLoadingToast, showSuccessToast} from "vant";
import {router} from "../router/config.ts";

const register_form = ref<User>(new User())
const confirm_pwd = ref("")
const email_verPwd = ref("")
const send_email_status = ref(0)
const secondsLeft =ref(0)
const onSubmit = async () => {

  if (register_form.value.pwd != confirm_pwd.value) {
    showFailToast("两次输入密码不一致！")
    return
  }
  showLoadingToast("提交中......")
  //校验验证码
  const code_ver_res = await axios.post(`${BASE_URL}/email/verCode/${email_verPwd.value}`, {
    uid: register_form.value.uid,
    email: register_form.value.phone,
    action:0
  })
  if (!(code_ver_res.data!=null && code_ver_res.data.code == 200))
  {
    showFailToast("验证码错误！")
    return
  }

  const res = await axios.post(`${BASE_URL}/user/add`, register_form.value)
  console.log(res)
  if (res.data != null) {
    if (res.data.code == 200) {
      showSuccessToast("注册成功，请重新登录！")
      router.back()
    } else {
      showFailToast(res.data.msg)
    }
  }else
  {
    showFailToast("注册失败,网络问题")
  }

};

const sendEmail = async (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email == undefined) {
    showFailToast("邮箱不能为空")
    return
  }
  if (!emailRegex.test(email)) {
    showFailToast("邮箱不符合规定！")
    return
  }
  if (register_form.value.uid == undefined) {
    showFailToast("学号不能为空！")
    return
  }
  send_email_status.value = 1
  const res = await axios.post(`${BASE_URL}/email/sendCode`, {
    uid: register_form.value.uid,
    email: email,
    action:0
  })
  if (res.data != null && res.data.code == 200) {
    showSuccessToast("发送成功")
    send_email_status.value = 2
    startCountdown(1)

  } else {
    send_email_status.value = 0
    showFailToast(res.data==null?"发送失败":res.data.msg)
  }


}

function startCountdown(minutes: number) {
  secondsLeft.value = minutes * 60;
  const countdownTimer = setInterval(() => {
    if (secondsLeft.value <= 0) {
      send_email_status.value = 0
      clearInterval(countdownTimer);
    } else {
      secondsLeft.value -= 1;
    }
  }, 1000);
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
  <van-form @submit="onSubmit" required="auto">
    <van-cell-group inset>
      <van-field
          v-model="register_form.name"
          name="姓名"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
          v-model="register_form.uid"
          name="学号"
          label="学号"
          type="digit"
          placeholder="请填写学号"
          :rules="[{ required: true, message: '请填写学号' }]"
      />
      <van-field
          v-model="register_form.pwd"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码'}]"
      />
      <van-field
          v-model="confirm_pwd"
          type="password"
          name="密码"
          label="密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />

      <van-field
          v-model="register_form.phone"
          name="邮箱"
          label="邮箱"
          placeholder="请输入邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
      >
        <template #button>
          <van-button v-if="send_email_status == 0 " @click="sendEmail(register_form.phone)" size="small"
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
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>