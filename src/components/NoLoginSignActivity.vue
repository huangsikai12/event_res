<script setup lang="ts">


import {onMounted, ref} from "vue";
import axios from "axios";
import {BASE_URL} from "../Constants.ts";

const uid = ref()
const select_event = ref({text:"",value:""})
const showPicker = ref(false)
const columns = ref([])
onMounted(async ()=>{
  const res  = await axios.get(`${BASE_URL}/event/all?status=1`);
  if (res.data!=null)
  {
    res.data.data.forEach((event)=>
    {
      columns.value.unshift({text:event.title,value:event.id})
    })
  }
})
const onConfirm = ({ selectedOptions }) => {
  select_event.value = selectedOptions[0]
  showPicker.value = false;
};
const onSubmit=()=>{

}
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

</style>