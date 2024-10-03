<script setup lang="ts">
import {useUserStore} from "../store/useUserStore.ts";
import {router} from "../router/config.ts";
import {User} from "../interface/DataInterface.ts";

const userStore = useUserStore()
const user:User = userStore.parseUser()

const logOut = ()=>
{
  router.push("/")
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

  <div>
    学号：{{user.uid}}
    <br>
    姓名：{{user.name}}
  </div>

  <van-button round @click="logOut" type="primary" size="large" style="margin-bottom: 10px">退出登录</van-button>


</template>

<style scoped>
div
{
  margin: 10px;
}

</style>