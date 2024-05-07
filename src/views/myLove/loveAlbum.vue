<template>
  <div class="header">
    <el-affix :offset="0" class="contaner">
        <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
          <div v-for="(item,index) in tabsList" :key="item.type">
            <el-tab-pane :label="item.type" :name="item.type"></el-tab-pane>
          </div>
        </el-tabs>
    </el-affix>
  </div>
  <div class="box-c">
    <waterFalls :activeName="activeName"></waterFalls>
    <el-backtop :right="100" :bottom="300" />
  </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from "vue"
import type { TabsPaneContext } from 'element-plus'
import waterFalls from '@/components/waterFalls.vue'
const activeName = ref()
const tabsList = ref([])
const handleClick = (tab: TabsPaneContext, event: Event) => {

}

const getTabsList = ()=> {
  fetch(
    `https://www.mrwan.top/api/get_type`
  )
    .then((response) => response.json()) // 解析响应为JSON
    .then((res) => {
        tabsList.value = res.data
        activeName.value = res.data[0].type
    }) // 在控制台输出数据
    .catch((error) =>{
    })
}
getTabsList()


</script>
<style scoped lang='scss'>
:deep(.el-tabs__header .is-top){
  width: 100%;
}
:deep(.el-tabs__item.is-active),
:deep(.el-tabs__item:hover)
{
  color: pink;
}
:deep(.el-tabs__active-bar.is-top){
  background-color: pink;
}

.header{
  width: 100vw;
  .contaner{
    height: auto;
  }
}
.header .tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c !important;
  font-size: 32px;
  font-weight: 600;
}
@keyframes rote360 {
  from {
  }

  to {
    transform: rotate(360deg);
  }
}
.box-c {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-anchor: none;
}
.box {
  width: 100%;
}
.waterfall-list {
  height: 100% !important;
  overflow-y: auto;
}
// .example-showcase .el-loading-mask {
//   z-index: 9;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 100%;
//   i {
//     animation: rote360 1s linear infinite;
//     width: 36px;
//     height: 36px;
//     background-color: aqua;
//   }
//   span {
//     margin-top: 10px;
//   }
// }
</style>