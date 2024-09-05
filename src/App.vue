<template>

  <van-nav-bar
      title="活动报名平台"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"/>
  <router-view></router-view>

</template>
<script setup lang="ts">

const onClickLeft = () => history.back();
</script>