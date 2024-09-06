<script setup lang="ts">
import {useUserStore} from "../store/useUserStore.ts";
import {router} from "../router/config.ts";

const userStore = useUserStore()
const user = userStore.parseUser()

const logOut = ()=>
{
  router.push("/")
}
</script>

<template>

  <div>
    <van-icon size="40" name="https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png" />
    学号：{{user.uid}}
    <br>
    姓名：{{user.name}}
  </div>

  <van-button @click="logOut" type="primary" size="large">退出登录</van-button>

</template>

<style scoped>
div
{
  margin: 10px;
}

</style>