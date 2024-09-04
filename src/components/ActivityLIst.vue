<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import {onMounted, ref} from "vue";
import {showFailToast, showLoadingToast, showSuccessToast, showToast} from "vant";
import {Activity, DateTimePickerValue, JoinedInfo, User} from "../interface/DataInterface.ts";
import {useUserStore} from "../store/useUserStore.ts";
import axios from "axios";
import { showConfirmDialog } from 'vant';
import {BASE_URL} from "../Constants.ts";

const userStore = useUserStore()
const user = userStore.user
const setPwdShow = ref(false)
const setPeekJoinShow = ref(false)
const setPeekSignShow = ref(false)
const longtimeActivity = ref(false)
const date_result = ref("0");
const time_result = ref<Array<number>>([0,0,0]);
const showPicker = ref(false);
const onConfirm = ({selectedValues:selectedValues}:DateTimePickerValue) =>{
  date_result.value = selectedValues.join('-');
  showPicker.value = false;
};

const setPwdEventID = ref(0)
const joinIdList = ref<Array<number>>([])
const list = ref<Array<Activity>>([]);
const joinList = ref<Array<User>>([]);
const newActivity = ref<Activity>(new Activity())
const getActivityList =async () => {
  const data = await axios.get(`${BASE_URL}/event/all`)
  console.log(data)
  if (data.data.data != null) {
    list.value = data.data.data.reverse()
  }
  console.log(list)

}
const signPwd = ref("")
const addActivityPop = ref(false)
const getUserJoin =async () => {

  joinIdList.value = []
  const res = await axios.get(`${BASE_URL}/join/get/user?uid=${user.uid}`)
  console.log(res)
  if (res.data.data != null) {
    res.data.data.forEach((join_data:JoinedInfo)=>{
      joinIdList.value.push(join_data.eid)
    })
  }
  console.log(list)

}
onMounted(async ()=>{
  await getActivityList()
  await getUserJoin()
})

const onRefresh= () => {
  console.log(222)
   getActivityList()
   getUserJoin()
  loading.value = false

}

const loading = ref(false);
// const loading = ref(false);
const finished = ref(true);
const joinActivity=async (item: Activity) => {
  loading.value = true
  const res = await axios.get(`${BASE_URL}/join/add?uid=${user.id}&eid=${item.id}`)
  if (res!=null)
  {
    showToast(`报名成功！`);
    await getActivityList()
    await getUserJoin()
  }
  else
  {
    showToast(`报名失败！`);
  }
  loading.value = false

}

const setSignPwd=()=>{

  showConfirmDialog({
    title:"设置签到码",
    message:`您设置的签到码为:${signPwd.value}请牢记!`,
  })
      .then(async () => {
        showLoadingToast("设置中......")
        const res = await axios.post(`${BASE_URL}/event/setSignPwd/${setPwdEventID.value}?signPwd=${signPwd.value}`, user)
        if (res.data!= null)
        {
          showToast(res.data.msg+"活动已开始!")
          signPwd.value = ""
          await getActivityList()
          await getUserJoin()
          setPwdShow.value = false
        }
        else
        {
          showToast("设置失败，请重新设置！")
        }
        setPwdShow.value = false
      })
      .catch(() => {
      });
}
const cancelActivity=async (item: Activity) => {
  showLoadingToast("取消中......")
  loading.value = true
  const res = await axios.get(`${BASE_URL}/join/cancel?uid=${user.id}&eid=${item.id}`)
  if (res != null) {
    showToast(`取消报名成功！`);
    await getActivityList()
    await getUserJoin()
  } else {
    showToast(`取消报名失败！`);
  }
  loading.value = false

}
const addActivity=async () => {
  if (date_result.value == "0" && longtimeActivity.value == false)
  {
    showFailToast("日期是必填的")
    return
  }
  date_result.value += (`  ${time_result.value[0]}:${time_result.value[0]}`)
  newActivity.value.time = date_result.value
  const res = await axios.post(`${BASE_URL}/event/add`, {
    title:newActivity.value.title,
    description:newActivity.value.description,
    totalCount:newActivity.value.totalCount,
    place:newActivity.value.place,
    time:newActivity.value.time
  })
  if (res.data!=null)
  {
    showToast(res.data.msg)

  }
  else
  {
    showFailToast("注册活动失败")
  }
  await getActivityList()
  await getUserJoin()
  addActivityPop.value = false
  date_result.value = "0"


}
const changeActivityStatus=(id:number,status:number,title:string)=>
{
  showConfirmDialog({
    title,
    message:"确定要"+title+"吗？"+title+"后不可回退状态",
  })
      .then(async () => {
        showLoadingToast("设置中......")
        const res = await axios.post(`${BASE_URL}/event/update/${id}/${status}`, user)
        if (res.data!= null)
        {
          showToast(res.data.msg)
          await getActivityList()
          await getUserJoin()
        }
        // on confirm
      })
      .catch(() => {
      });

}
const getEventSignUser=async (id: number) => {

  joinList.value = []
  showLoadingToast("加载中")
  const res = await axios.get(`${BASE_URL}/join/get/event/join?eid=${id}&status=1`)

  if (res.data!=null)
  {
    if (res.data.data.length>0)
    {
      showSuccessToast("获取成功")
      joinList.value = res.data.data
      setPeekSignShow.value = true
    }else
    {
      showFailToast("签到人数为空")
    }

  }else
  {
    showFailToast("获取失败")
  }
}
const getEventJoinUser=async (id: number) => {

  joinList.value = []
  showLoadingToast("加载中")
  const res = await axios.get(`${BASE_URL}/join/get/event/join?eid=${id}`)

  if (res.data!=null)
  {
    if (res.data.data.length>0)
    {
      showSuccessToast("获取成功")
      joinList.value = res.data.data
      setPeekJoinShow.value = true
    }else
    {
      showFailToast("报名人数为空")
    }

  }else
  {
    showFailToast("获取失败")
  }
}

const deleteActivity =(id:number)=>{
  showConfirmDialog({
    title: '删除活动',
    message:
        '确定要删除活动么？删除后不可撤销且之前该活动的所有报名及签到记录都会删除',
  })
      .then(async () => {
        showLoadingToast("删除中......")
        const res = await axios.post(`${BASE_URL}/event/delete/${id}`, user)
        if (res.data!= null)
        {
          showToast(res.data.msg)
          await getActivityList()
          await getUserJoin()
        }
        // on confirm
      })
      .catch(() => {

      });

}

const copyUid=async () => {
  showLoadingToast("正在复制。。。。。。")
  if (joinList.value.length > 0) {
    try {
      let t = ""
      joinList.value.forEach((u)=>{
        t+=(u.uid+"\n")
      })
      await navigator.clipboard.writeText(t);
      showSuccessToast('文本已复制到剪贴板');
    } catch (err) {
      showFailToast(`无法复制文本:${err} `);
    }
  }
}

</script>

<template>

  <van-popup
      v-model:show="setPeekSignShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
  >
    <template #default>
      <h3 style="width: 100%;text-align: center;margin: 0;height: 50px;line-height: 50px">查看签到人数</h3>
      <van-button type="primary" style="align-self: center" @click="copyUid()">一键复制学号<br>(二课导入格式)</van-button>
      <van-cell title="姓名">
        <template  #right-icon>
          <span style="margin-right: 10px">学号</span>
        </template>
      </van-cell>
      <van-list

          :finished="finished"
          finished-text="没有更多了"
      >
        <van-cell v-for="item in joinList" :key="item.uid" :title="item.name">
          <template  #right-icon>
            <span style="margin-right: 10px">{{item.uid}}</span>
          </template>
        </van-cell>
      </van-list>
    </template>
  </van-popup>

  <van-popup
      v-model:show="setPeekJoinShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
  >
    <template #default>
      <h3 style="width: 100%;text-align: center;margin: 0;height: 50px;line-height: 50px">查看报名人数</h3>
      <van-button type="primary" style="align-self: center" @click="copyUid()">一键复制学号<br>(二课导入格式)</van-button>
      <van-cell title="姓名">
        <template  #right-icon>
          <span style="margin-right: 10px">学号</span>
        </template>
      </van-cell>
      <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
      >
        <van-cell v-for="item in joinList" :key="item.uid" :title="item.name">
          <template  #right-icon>
            <span style="margin-right: 10px">{{item.uid}}</span>
          </template>
        </van-cell>
      </van-list>
    </template>
  </van-popup>
  <van-popup
      v-model:show="setPwdShow"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
  >
    <template #default>
      <h3 style="width: 100%;text-align: center;margin: 0;height: 50px;line-height: 50px">设置签到码</h3>
      <van-cell-group inset>
        <van-field v-model="signPwd" label="签到码" placeholder="请输入签到码" />

      </van-cell-group>
      <div class="centered-button-container">
        <van-button type="primary" style="align-self: center" @click="setSignPwd()">设置签到码并开始活动</van-button>
      </div>
    </template>
  </van-popup>

  <van-form @submit="addActivity()">
  <van-popup
      v-model:show="addActivityPop"
      closeable
      position="bottom"
      :style="{ height: '80%' }"
  >
    <template #default>
      <h3 style="width: 100%;text-align: center;margin: 0;height: 50px;line-height: 50px">注册活动</h3>
      <van-cell-group inset>
        <van-field v-model="newActivity.title" label="活动名称" placeholder="请输入活动名称"  :rules="[{ required: true, message: '请填写活动名称' }]" />
        <van-field v-model="newActivity.place" label="活动地点" placeholder="请输入活动地点"  :rules="[{ required: true, message: '请填写活动地点' }]" />
        <van-field name="stepper" label="活动人数">
          <template #input>
            <van-stepper v-model="newActivity.totalCount" integer />
          </template>
        </van-field>
        <van-field name="switch" label="长期活动">
          <template #input>
            <van-switch v-model="longtimeActivity" />
          </template>
        </van-field>
        <template v-if="!longtimeActivity">
          <van-field
              v-model="date_result"
              is-link
              readonly
              name="datePicker"
              label="活动日期"
              placeholder="点击选择时间"
              @click="showPicker = true"
          />
          <van-popup v-model:show="showPicker" position="bottom">
            <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" />
          </van-popup>
          <van-field name="stepper" label="活动时间">
            <template #input>
              <van-stepper v-model="time_result[0]" integer  min="0" max="24"/>&nbsp;:&nbsp;
              <van-stepper v-model="time_result[1]" integer   min="0" max="60"/>
            </template>
          </van-field>
          <van-field name="stepper" label="活动时长">
            <template #input>
              <van-stepper v-model="time_result[2]" integer  min="0" max="180"/>&nbsp;&nbsp;分钟
            </template>
          </van-field>
        </template>



        <van-field v-model="newActivity.description" label="活动概述" placeholder="请输入活动概述"  :rules="[{ required: true, message: '请填写活动概述' }]" />
      </van-cell-group>
      <div class="centered-button-container">
        <van-button native-type="submit" block round type="primary" style="align-self: center" >新增活动</van-button>
      </div>
    </template>
  </van-popup>
  </van-form>
  <van-button  v-if="user.roleId == 1" @click="addActivityPop= true" type="primary">注册活动</van-button>
  <van-loading v-if="loading" color="#0094ff" size="50px">加载中...</van-loading>
    <van-pull-refresh
        v-model="loading"
        @refresh="onRefresh"
        success-text="刷新成功">
      <van-list
          v-if="!loading"
          finished-text="没有更多了">
        <van-cell-group v-for="item in list" :key="item.id">
          <van-swipe-cell>
            <van-cell >
              <template #label>
                地点：{{item.place}}
                <br>
                {{item.description}}
              </template>
              <template #title>
                <span  style="margin-right: 10px" class="custom-title">{{item.title}}</span>
                <van-tag type="primary">
                  {{ item.time.length<7?"长期活动":item.time }}
                </van-tag>
              </template>
              <template  #right-icon>
                <!--            <span style="margin-right: 10px">{{item.joinCount}}/{{item.totalCount}}</span>-->
              </template>
              <template #extra>

              </template>
            </van-cell>
            <van-cell>
              <template #title>
                <van-button v-if="item.status !=0" disabled type="success">报名结束</van-button>
                <template v-else>
                  <van-button v-if="!joinIdList.includes(item.id)" @click="joinActivity(item)" type="success" >点击报名</van-button>
                  <van-button v-else type="danger"  @click="cancelActivity(item)">取消报名</van-button>
                  <van-button v-if="user.roleId == 1" type="warning" @click="deleteActivity(item.id)">下架活动</van-button>
                </template>
                <van-button  v-if="user.roleId == 1" @click ="getEventJoinUser(item.id)" type="primary">查看报名</van-button>

                <template v-if="item.status !=0 &&user.roleId==1">
                  <br >
                  <van-button  color="#7232dd" @click="getEventSignUser(item.id)">查看签到</van-button>
                </template>
                <br>

                <van-button  v-if="item.status == 0 &&user.roleId==1" @click="setPwdShow = true;setPwdEventID=item.id" type="primary">设置签到码并开始</van-button>
                <!--              <van-button v-if="item.status==0 &&user.roleId==1" type="warning" @click="chageActivityStatus(item.id,1,'开始活动')">开始活动</van-button>-->
                <van-button v-if="item.status==1 &&user.roleId==1" @click="changeActivityStatus(item.id,2,'结束活动')" type="warning">结束活动</van-button>
                <van-button v-if="item.status==2 &&user.roleId==1"  @click="changeActivityStatus(item.id,3,'同步活动')" type="warning">同步活动</van-button>
              </template>

            </van-cell>
            <template #right>
              <van-button square type="danger" text="删除" />
              <van-button square type="primary" text="收藏" />
            </template>
          </van-swipe-cell>

        </van-cell-group>
      </van-list>
    </van-pull-refresh>





</template>

<style scoped>
.van-button{
  margin: 5px;
}
.centered-button-container {
  display: flex; /* 使用 Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-top: 10px;
  width: 100%; /* 设置容器宽度为视口宽度 */
}

</style>