<script setup lang="ts">
import {ref} from "vue";
import {User} from "../interface/DataInterface.ts";
import axios from "axios";
import {BASE_URL} from "../Constants.ts";
import {showFailToast, showLoadingToast, showSuccessToast} from "vant";
import {router} from "../router/config.ts";

const register_form = ref<User>(new User())
const confirm_pwd = ref("")
const onSubmit = async () => {
  if (register_form.value.pwd !=confirm_pwd.value)
  {
    showFailToast("两次输入密码不一致！")
    return
  }
  showLoadingToast("提交中......")
  const res = await axios.post(`${BASE_URL}/user/add`, register_form.value)
  if (res.data!=null)
  {
    if (res.data.code ==200)
    {
      showSuccessToast("注册成功，请重新登录！")
      router.back()
    }else
    {

      showFailToast(res.data.msg)
      console.log(res)
    }
  }

};

</script>

<template>
  <van-form @submit="onSubmit" required="auto">
    <van-cell-group inset >
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