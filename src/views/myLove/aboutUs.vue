<template>
  <!--  关于我们 -->
  <div>
    <basic-container :isColor='false'>
      <div class="container-row-sm-left">
        <div class="row-item">
          左侧
        </div>
        <div class="row-item">
          <el-button
            type="primary"
            @click="handleQuery"
          >防抖</el-button>
        </div>
      </div>
    </basic-container>
  </div>
</template>
<script setup lang='ts'>
import { ElNotification } from "element-plus"
import { ref } from "vue"

const time = ref()
const handleQuery = () => {
  clearTimeout(time.value)
  time.value = setTimeout(() => {
    getList()
  }, 500)
}

const getList = () => {
  ElNotification({
    title: "防抖",
    message: "测试防抖",
    type: "success",
    duration: 1000
  })
}
</script>
<style scoped lang='scss'>
</style>