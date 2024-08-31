<script setup lang="ts">
import {useUserStore} from "../store/useUserStore.ts";
import {router} from "../router/config.ts";

const userStore = useUserStore()
const user = userStore.user

const logOut = ()=>
{
  userStore.clearUser()
  router.push("/")
}
</script>

<template>
  <van-contact-card  type="edit" :name="user.name" :tel="user.uid" :editable="false" />
  <van-button @click="logOut" type="primary" size="large">退出登录</van-button>

</template>

<style scoped>

</style>