<template>
  <div
    class="basic-container"
    :class="{
      'bg-container': props.isColor,
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue';

const props = defineProps({
  isColor: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss">
.basic-container {
  width: 100%;
  background-color: #ffffff;
  border-radius: 3px;
  min-height: 100%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  padding: 14px;
}
// .ownDarkBlue {
//   .basic-container {
//     background-color: rgba(1, 43, 99, 0.2);
//   }
//   .el-card {
//     background-color: transparent !important;
//   }
// }
.bg-container {
  padding: 0 !important;
  background-color: transparent !important;
  box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0) !important;
  display: flex;
  flex-direction: column;
}
</style>
