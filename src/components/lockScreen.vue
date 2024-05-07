<template>
  <!-- 锁屏 -->
  <div class="show">
    <ul class="time">
      <li>
        <div class="upBox beforeTime">
          {{ timeData.hours.before }}
        </div>
        <div class="downBox beforeTime">{{ timeData.hours.after }}</div>
      </li>
      <li>:</li>
      <li>
        <div class="upBox beforeTime">{{ timeData.minutes.before }}</div>
        <div class="downBox beforeTime">{{ timeData.minutes.after }}</div>
      </li>
      <li>:</li>
      <li>
        <div class="upBox beforeTime">{{ timeData.seconds.before }}</div>
        <div class="downBox beforeTime">{{ timeData.seconds.after }}</div>
      </li>
    </ul>
  </div>

  <div
    class="close"
    @click="closeLockScreen"
  >
    <el-icon :size="30">
      <Close />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { useUserInfoStore } from "@/store/modules/userInfo.ts"
const infoStore = useUserInfoStore()

// 关闭锁屏
const closeLockScreen = () => {
  ElMessageBox.prompt("请先输入锁屏密码", "锁屏", {
    confirmButtonText: "确 定",
    cancelButtonText: "取 消",
    // inputPattern:,  //校验规则
    inputErrorMessage: "请输入锁屏密码" //校验提示
  })
    .then(({ value }) => {
      if (value == infoStore.password) {
        infoStore.setLockScreen() //设置锁屏状态
        ElMessage({
          type: "success",
          message: "解锁成功"
        })
      } else {
        ElMessage({
          type: "warning",
          message: `解锁密码错误,请重新修改`
        })
      }
    })
    .catch(() => {})
}

const timeData = reactive({
  hours: {
    before: "00",
    after: "00"
  },
  minutes: {
    before: "00",
    after: "00"
  },
  seconds: {
    before: "00",
    after: "00"
  }
})

const formatTime = (time: number): string => {
  return time < 10 ? "0" + time : time.toString()
}

const rotateUp = (time: string, type: string) => {
  timeData[type].before = time
  setTimeout(() => {
    timeData[type].after = time
  }, 50) // 将延迟时间调整为较短的时间
}

const updateTime = () => {
  const currentTime = new Date()
  const newHour = formatTime(currentTime.getHours())
  const newMinute = formatTime(currentTime.getMinutes())
  const newSecond = formatTime(currentTime.getSeconds())

  if (timeData.hours.after !== newHour) {
    rotateUp(newHour, "hours")
  }
  if (timeData.minutes.after !== newMinute) {
    rotateUp(newMinute, "minutes")
  }
  if (timeData.seconds.after !== newSecond) {
    rotateUp(newSecond, "seconds")
  }

  setTimeout(updateTime, 1000)
}

onMounted(() => {
  updateTime()
})
</script>

<style scoped lang="scss">
.show {
  background-color: #829182;
  height: 100%;
  color: #fff;
  overflow: hidden;
  padding-top: 20vh;
}

.time {
  display: flex;
  flex: 1;
  font-size: 160px;
  text-align: center;
  height: 300px;
  line-height: 300px;
  padding: 0 20px;
  overflow: hidden;
  width: 70%;
  margin: 0 auto;
}

.beforeTime {
  z-index: 100;
}

.time li:nth-child(2n) {
  flex: 1;
}

.time li:nth-child(2n + 1) {
  flex: 4;
  background-color: #3b3d3b;
  position: relative;
  height: 200px;
  line-height: 200px;
  margin: auto 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px 3px white;
}

.time li:nth-child(2n + 1) .upBox,
.time li:nth-child(2n + 1) .downBox {
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
  transition: transform 0.5s ease-in-out; /* 应用过渡 */
}

.time li:nth-child(2n + 1) .upBox {
  top: 0;
  bottom: 50%;
  box-sizing: border-box;
  border-bottom: solid 3px #3b3d3b;
  background-color: #3b3d3b;
  transform-origin: bottom;
  transition-delay: 0.1s; /* 延迟过渡以获得更平滑的效果 */
}

.time li:nth-child(2n + 1) .downBox {
  top: 50%;
  bottom: 0;
  line-height: 0;
  box-sizing: border-box;
  background-color: #3b3d3b;
  overflow: hidden;
  transform-origin: top;
  transition-delay: 0.2s; /* 延迟过渡以获得更平滑的效果 */
}

.change {
  border-bottom: 2px solid white;
}

.close {
  position: fixed;
  top: 2vh;
  right: 1vw;
  cursor: pointer;
}
</style>
