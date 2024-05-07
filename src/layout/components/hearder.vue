<template>
  <div>
    <div class="title contaner flex">
      <div
        class="title-left flex"
        @click="goHome"
      >
        <div class="title-text">Love-Diary</div>
        <div class="title-img">
          <img
            style="width: 50px;"
            src="@/assets/imgs/logo.png"
            alt=""
          >
        </div>
      </div>
      <div class="title-right flex">
        春暖花开时
      </div>
    </div>
    <div class="checkbox-wrapper">
      <label class="switch">
        <input
          type="checkbox"
          @click.stop="clickSwitch"
        >
        <span class="slider"></span>
      </label>
      <div
        :class="classObject"
        @mouseenter="mouseenter"
        @mouseleave="mouseleave"
      >
        <el-tooltip
          class="box-item"
          :effect="info.effect"
          :content="info.content"
          placement="bottom"
        >
          <el-avatar :src="avatar" />
          <!-- <div class="userName">苗铭宇</div> -->
        </el-tooltip>
      </div>
    </div>
    <div
      class="lockScreen"
      @click="clickLockScreen"
    >
      <img
        style="width: 50px;"
        src="@/assets/imgs/lockScreen.png"
        alt=""
      >
    </div>
  </div>
</template>
<script setup lang='ts'>
import { reactive, ref, computed } from "vue"
import { useRouter } from "vue-router"
import NProgress from "nprogress"
import avatar from "@/assets/imgs/avatar.jpg"
import { useUserInfoStore } from "@/store/modules/userInfo.ts"
import { ElMessage, ElMessageBox } from "element-plus"

const infoStore = useUserInfoStore()

const router = useRouter()
const flag = ref(true)
const isHover = ref("")

const info = reactive({
  content: "苗铭宇",
  effect: "dark"
})

const classObject = computed(() => {
  return {
    avatar: true,
    flex: true,
    rotateIn: isHover.value === "mouseenter",
    rotateOut: isHover.value === "mouseleave"
  }
})

const goHome = () => {
  router.push("/")
}
const mouseenter = (e) => {
  isHover.value = "mouseenter"
}
const mouseleave = (e) => {
  isHover.value = "mouseleave"
}

// 切换主题色
const clickSwitch = () => {
  // 先清除原有的 Live2D 模型
  document.getElementById("live2d").innerHTML = ""

  NProgress.start()
  setTimeout(() => {
    if (flag.value) {
      document.body.style.setProperty("--el-color-primary", "gray")
      document.body.style.setProperty("--color", "rgb(39, 204, 207)")
      document.body.style.setProperty("--item-bgc", "rgb(209, 251, 233)")
      flag.value = false
      info.content = "ssy"
      info.effect = "light"
      loadlive2d(
        "live2d",
        "https://fastly.jsdelivr.net/gh/zzzmhcn/live2dDemo@1.0.0/model/hijiki/hijiki.model.json"
      )
    } else {
      document.body.style.setProperty("--el-color-primary", "rgb(39, 204, 207)")
      document.body.style.setProperty("--color", "rgb(39, 204, 207)")
      document.body.style.setProperty("--item-bgc", "#f6e177")
      flag.value = true
      info.content = "苗铭宇"
      info.effect = "dark"
      loadlive2d(
        "live2d",
        "https://unpkg.com/live2d-widget-model-tororo/assets/tororo.model.json"
      )
    }
    NProgress.done()
  }, 500)
}

// 锁屏
const clickLockScreen = () => {
  if (infoStore.password === "") {
    ElMessageBox.prompt("请先设置锁屏密码", "锁屏", {
      confirmButtonText: "确 定",
      cancelButtonText: "取 消",
      // inputPattern:,  //校验规则
      inputErrorMessage: "请输入锁屏密码" //校验提示
    })
      .then(({ value }) => {
        infoStore.setPassword(value)
        ElMessage({
          type: "success",
          message: "设置成功"
        })
        setTimeout(() => {
          infoStore.setLockScreen()
        }, 500)
      })
      .catch(() => {})
  } else {
    infoStore.setLockScreen()
  }
}
</script>
<style scoped lang='scss'>
.title {
  height: 100%;
  justify-content: space-between;
  align-items: center;

  &-left {
    align-items: center;
    .title-text {
      margin-right: 10px;
      font-size: 16px;
      font-weight: 800;
      color: $color;
    }
  }
  &-left:hover {
    cursor: url(../../assets/Hand2.cur), auto;
  }
  &-right {
    font-size: 14px;
    font-weight: 600;
    color: rgb(50, 77, 77);
  }
}
.checkbox-wrapper {
  position: absolute;
  right: 90px;
  top: 0;
  height: 50px;
  display: flex;
  align-items: center;
}
.checkbox-wrapper input[type="checkbox"] {
  visibility: hidden;
  display: none;
}

.checkbox-wrapper *,
.checkbox-wrapper ::after,
.checkbox-wrapper ::before {
  box-sizing: border-box;
}

/* The switch - the box around the slider */
.checkbox-wrapper .switch {
  --width-of-switch: 3.5em;
  --height-of-switch: 2em;
  /* size of sliding icon -- sun and moon */
  --size-of-icon: 1.4em;
  /* it is like a inline-padding of switch */
  --slider-offset: 0.3em;
  position: relative;
  width: var(--width-of-switch);
  height: var(--height-of-switch);
  display: inline-block;
}

/* The slider */
.checkbox-wrapper .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f4f4f5;
  transition: 0.4s;
  border-radius: 30px;
}

.checkbox-wrapper .slider:before {
  position: absolute;
  content: "";
  height: var(--size-of-icon, 1.4em);
  width: var(--size-of-icon, 1.4em);
  border-radius: 20px;
  left: var(--slider-offset, 0.3em);
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
  transition: 0.4s;
}

.checkbox-wrapper input:checked + .slider {
  background-color: #303136;
}

.checkbox-wrapper input:checked + .slider:before {
  left: calc(100% - (var(--size-of-icon, 1.4em) + var(--slider-offset, 0.3em)));
  background: #303136;
  /* change the value of second inset in box-shadow to change the angle and direction of the moon  */
  box-shadow: inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb;
}

@keyframes rotateIn {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg); /* 调整为180度以便看到中间的变化 */
  }
  100% {
    transform: rotate(360deg); /* 旋转一整圈后恢复原始缩放 */
  }
}

@keyframes rotateOut {
  0% {
    transform: rotate(360deg); /* 旋转一整圈后恢复原始缩放 */
  }
  50% {
    transform: rotate(180deg); /* 调整为180度以便看到中间的变化 */
  }
  100% {
    transform: rotate(0deg);
  }
}

.checkbox-wrapper .avatar {
  margin-left: 20px;
  align-items: center;
  transition: all 0.2s ease;
  scale: 0.9;
  cursor: pointer;
  // .userName{
  //   padding-left: 2px;
  //   font-size: 13px;
  //   font-family: "MicrosoftYaHei";
  // }
}

.checkbox-wrapper .avatar.rotateIn {
  animation: rotateIn 0.3s linear forwards;
}

.checkbox-wrapper .avatar.rotateOut {
  animation: rotateOut 0.3s linear forwards;
}

.lockScreen {
  position: fixed;
  right: 1vw;
  top: 0;
  scale: 0.8;
  cursor: pointer;
}
</style>