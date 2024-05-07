<template>
  <el-container class="layout">
    <el-header>
      <headers />
    </el-header>
    <el-main>
      <mains />
    </el-main>
    <el-footer>
      <footer-vue />
    </el-footer>
  </el-container>
</template>
<script setup lang='ts'>
import headers from "./components/hearder.vue"
import mains from "./components/main.vue"
import footerVue from "./components/footer.vue"
</script>
<style scoped lang='scss'>
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
.layout {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  :deep(.container) {
    height: 100%;
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    .header {
      height: 112px;
      padding: 0;
      background-color: transparent;
    }
  }

  .el-header {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    backdrop-filter: blur(15px); //设置模糊毛玻璃
    background: linear-gradient(
      102.7deg,
      rgba(253, 218, 255, 0.7) 0%,
      rgba(223, 173, 252, 0.7) 20%,
      rgba(173, 205, 252, 0.7) 40%,
      rgba(173, 252, 244, 0.7) 60%,
      rgba(202, 248, 208, 0.7) 80%,
      rgba(253, 218, 255, 0.7) 100%
    );
    background-size: 300% 300%; /* 设置背景大小为原来的三倍 */
    animation: gradientAnimation 8s linear infinite; /* 使用动画，持续时间为 8 秒 */
  }
  .el-main {
    padding: 0;
  }
  .el-footer {
    // position: fixed;
    // bottom: 0;
    // left: 0;
    // z-index: 1;
    padding: 0;
    width: 100%;
    height: 100px;
  }
}
</style>