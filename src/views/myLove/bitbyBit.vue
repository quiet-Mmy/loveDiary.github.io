<template>
  <el-button type="primary" @click="open = true">步骤条</el-button>
  <el-divider />
  
  <el-space>
    <el-button ref="ref1">第一步</el-button>
    <el-button ref="ref3" :icon="MoreFilled" />
    <div class="two">
      <el-button ref="ref2" type="primary">第二步</el-button>
    </div>
  </el-space>

  <el-tour
    v-model="open"
    :mask="{
      style: {
        boxShadow: 'inset 0 0 15px #333',
      },
      color: 'rgba(0, 0, 0, .8)',
    }"
  >
    <el-tour-step :target="ref1?.$el" title="首先">
      <img
        src="https://element-plus.org/images/element-plus-logo.svg"
        alt="tour.png"
      />
    </el-tour-step>
    <el-tour-step
      :target="ref2?.$el"
      title="其次"
      description="Save your changes"
      :mask="{
        style: {
          boxShadow: 'inset 0 0 15px #fff',
        },
        color: 'rgba(0, 0, 0, .8)',
      }"
    />
    <el-tour-step
      :target="ref3?.$el"
      title="最后"
      description="Click to see other"
      :mask="false"
    />
  </el-tour>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MoreFilled } from '@element-plus/icons-vue'
import type { ButtonInstance } from 'element-plus'

const ref1 = ref<ButtonInstance>()
const ref2 = ref<ButtonInstance>()
const ref3 = ref<ButtonInstance>()

const open = ref(false)
</script>
<style lang="scss" scoped>

.two{
  margin-top: 100px;
}
</style>