<template>
  <div ref="scrollbarBoxEle" class="scrollbar-box">
    <router-view v-slot="{ Component, route }">
        <keep-alive v-if="route.meta && route.meta.keepAlive">
          <el-scrollbar el-scrollbar class="scrollbar" ref="scrollbarEle" always>
            <component :is="Component" :key="route.path" />
          </el-scrollbar>
        </keep-alive>
        <component v-else :is="Component" :key="route.path" />
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const scrollbarEle = ref<any>(null)
const scrollbarBoxEle = ref<any>(null)

</script>

<style lang="scss" scoped>
.scrollbar-box {
  width: 100%;
  height: 100%;

  :deep(.el-scrollbar__view) {
    height: 100%;
  }
}
</style>