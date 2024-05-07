<script setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import { RouterView } from "vue-router"
import lockScreen from "@/components/lockScreen.vue" //锁屏
import { ref } from "vue"
import { ElMessage, ElNotification } from "element-plus"

import { useUserInfoStore } from "@/store/modules/userInfo.ts"

const isLockScreen = ref(false)
const time = ref()

const infoStore = useUserInfoStore()

// 设置点击文字
window.addEventListener("load", function () {
  // 加载模型 live2D模型
  loadlive2d(
    "live2d",
    "https://unpkg.com/live2d-widget-model-tororo/assets/tororo.model.json"
  )

  let body = document.body
  let content = [
    "❤去活出你自己。❤",
    "❤《日不落》❤",
    "❤《一格格》❤",
    "❤《森林巴士》❤",
    "❤《爱就一个字》❤",
    "❤《星辰大海》❤",
    "❤《千千万万》❤",
    "❤《我在等》❤",
    "❤《如一》❤",
    "❤《收敛》❤",
    "❤《间距》❤",
    "❤《早点早点》❤",
    "❤《阿拉斯加海湾》❤",
    "❤《Peace&Love》❤",
    "❤《灰色》❤",
    "❤《带你回家》❤",
    "❤《等我回家》❤",
    "❤《0919》❤",
    "❤《我很好》❤",
    "❤《会不会》❤",
    "❤《经济舱》❤",
    "❤《我走后》❤",
    "❤《不删》❤",
    "❤《Girls》❤",
    "❤《Let Her Go》❤",
    "❤《关于你的梦》❤",
    "❤《慢慢》❤",
    "❤《下雨天》❤",
    "❤《翅膀》❤",
    "❤《靠近一点》❤",
    "❤《翅膀》❤",
    "❤《This Is Love》❤",
    "❤《重来》❤",
    "❤《晴天》❤",
    "❤《空白格》❤",
    "❤《爱你3000》❤",
    "❤《下落不明》❤",
    "❤《我要》❤",
    "❤《晚星》❤",
    "❤《你，好不好？》❤",
    "❤《50 Feet》❤",
    "❤《COCO》❤",
    "❤《NUMB》❤",
    "❤《重演》❤",
    "❤《所念皆星河》❤"
  ] //自定义内容的数组
  body.addEventListener("click", function (e) {
    let x = e.pageX
    let y = e.pageY //当前坐标
    let randContent = Math.ceil(Math.random() * content.length)
    let text = new Text(x, y, randContent)
    let span = document.createElement("span")
    span.style.color = text.getRandom()
    text.create(span)
    setTimeout(function () {
      text.out(span)
    }, 1900)
  })

  function Text(x, y, rand) {
    this.x = x
    this.y = y
    this.rand = rand
  }
  Text.prototype.create = function (_this) {
    let body = document.body
    _this.innerHTML = content[this.rand - 1]
    _this.className = "texts"
    _this.style.top = this.y - 20 + "px"
    _this.style.left = this.x - 50 + "px"
    _this.style.animation = "remove 2s"
    body.appendChild(_this)
    let i = 0
    setInterval(() => {
      _this.style.top = this.y - 20 - i + "px"
      i++
    }, 10)
  }
  Text.prototype.out = function (_this) {
    _this.remove()
  }
  //设置随机颜色
  Text.prototype.getRandom = function () {
    let allType = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f" //16进制颜色
    let allTypeArr = allType.split(",") //通过','分割为数组
    let color = "#"
    for (var i = 0; i < 6; i++) {
      //随机生成一个0-16的数
      var random = parseInt(Math.random() * allTypeArr.length)
      color += allTypeArr[random]
    }
    return color //返回随机生成的颜色
  }
})

const prohibit = () => {
  clearTimeout(time.value)
  time.value = setTimeout(function () {
    ElNotification({
      title: "作者禁用了F12",
      message: "防君子不防小人",
      type: "success",
      duration: 500
    })
    debugger
    return false
  }, 500)
}
// 禁用右键（防止右键查看源代码）
window.oncontextmenu = function (event) {
  event.preventDefault()
  prohibit()
}

window.onkeydown =
  window.onkeyup =
  window.onkeypress =
    function (event) {
      // 阻止F12快捷键
      if ((event && event.key === "F12") || event.keyCode == 123) {
        event.preventDefault()
        prohibit()
      }
    }
</script>

<template>
  <lock-screen v-if="infoStore.isLockScreen"></lock-screen>

  <el-config-provider
    v-if="!infoStore.isLockScreen"
    :locale="zhCn"
    :z-index="3000"
    size="default"
  >
    <router-view />
  </el-config-provider>
  <!-- 写一个canvas的dom id必须和加载时候的对应 -->
  <div class="live">
    <canvas
      id="live2d"
      width="200"
      height="200"
    ></canvas>
  </div>
</template>

<style lang="scss">
* {
  //transition: 300ms;
  box-sizing: border-box;
}

html,
body,
#app {
  cursor: url(./assets/Arrow.cur), auto;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 12px;
  .el-button,
  .el-link {
    font-size: 12px;
  }
  background-color: $All-color;
}

html.dark,
html.dark body,
html.dark #app {
  background-color: pink;
}

.el-main {
  padding: 15px;
  background: transparent;
  margin-top: 50px;
}
.ownPoolBlue .el-main,
.jumpDopClass .el-main,
.ownGreen .el-main {
  background: #f0f2f5;
}

.el-dialog__body {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.el-dialog__footer {
  padding-top: 15px;
  padding-bottom: 15px;
}

/* 移除type=number时原生dom的箭头 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.texts {
  position: absolute;
  z-index: 9999999;
  font-weight: bold;
  user-select: none;
}

@keyframes remove {
  100% {
    opacity: 0;
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: #fff;
}

::-webkit-scrollbar-thumb {
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  border-radius: 3px;
}

.live {
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 9999;
}
</style>
