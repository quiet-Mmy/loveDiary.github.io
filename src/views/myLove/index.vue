<template>
  <div class="contaner main">
    <div class="center flex">
      <div class="c c-left"></div>
      <div class="c-center">
        <div class="img-like"></div>
      </div>
      <div class="c c-right"></div>
    </div>
    <div class="line">
      <div class="line-wave">
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
  </div>
  <div class="contaner-c">
    <div class="time flex">
      <div class="time-text">相伴已经</div>
      <div class="time-text">{{time}}</div>
    </div>
    <div class="contaner-c-list flex">
      <div
        v-for="(item,index) in list"
        :key="index"
      >
        <div
          class="contaner-c-list-item flex"
          @click="handleClick(item)"
        >
          <div class="contaner-c-list-item-img">
            <img
              :src="item.img"
              alt=""
            >
          </div>
          <div class="contaner-c-list-item-title">
            <div class="contaner-c-list-item-title-h">{{item.title}}</div>
            <div class="contaner-c-list-item-title-text">{{item.text}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
<script setup lang='ts'>
import { ref } from "vue"
import loveImg from "@/assets/imgs/loveimg.png"
import xinf from "@/assets/imgs/xinf.png"
import diandian from "@/assets/imgs/diandian.png"
import liuyan from "@/assets/imgs/liuyan.png"
import about from "@/assets/imgs/about.png"

import { useRouter } from "vue-router"
const router = useRouter()
const list = ref([
  {
    img: loveImg,
    title: "Love Diary",
    text: "恋爱日记 记录最美瞬间",
    path: "/album"
  },
  {
    img: xinf,
    title: "Love List",
    text: "恋爱列表 你我之间的约定",
    path: "/loveList"
  },
  {
    img: diandian,
    title: "点点滴滴",
    text: "记录你我生活",
    path: "/bitbyBit"
  },
  {
    img: liuyan,
    title: "留言板",
    text: "写下留言祝福",
    path: "/messageBoard"
  },
  {
    img: about,
    title: "关于我们",
    text: "我们的经历",
    path: "/about"
  }
])
const time = ref("")
const startTime = new Date("2021-04-18T00:00:00") // 设置起始时间为2021年4月20日12:00

const handleClick = (item) => {
  router.push({ path: item.path })
}

const getTime = () => {
  const currentTime = new Date() // 获取当前时间
  const elapsedTime = currentTime - startTime // 计算经过的时间（毫秒）

  // 将毫秒转换为天、小时、分钟和秒
  let seconds = Math.floor(elapsedTime / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  seconds %= 60
  minutes %= 60
  hours %= 24
  const formattedTime = `${days}天 ${hours}时 ${minutes}分 ${seconds}秒`
  time.value = formattedTime
}
setInterval(getTime, 1000)
getTime()
</script>
<style scoped lang='scss'>
@keyframes enlarge {
  0% {
    transform: scale(0.8);
  }
  25% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(0.8);
  }
}
@keyframes lineAnimation {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
@keyframes wave {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -2300px;
  }
}
.contaner {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("@/assets/imgs/s.jpg") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .center {
    width: calc(100vw - 700px);
    height: calc(100vh - 200px);
    margin: 0 auto;
    justify-content: space-around;
    align-items: center;
    .c {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 1px solid $All-color;
    }
    .c-left {
      background: url("@/assets/imgs/left.jpg");
      background-size: 100% 100%;
    }
    .c-right {
      background: url("@/assets/imgs/right.jpg");
      background-size: 100% 100%;
    }
    .c-center {
      .img-like {
        width: 100px;
        height: 100px;
        transform: scale(0.8);
        animation: enlarge 2s linear infinite;
        background: url("@/assets/imgs/like.png");
        background-size: 100% 100%;
      }
    }
  }
  .line {
    position: absolute;
    bottom: -100px;
    left: 0;
    width: 100%;
    display: inline-block;
    .line-wave {
      position: relative;
      .wave {
        width: 6400px;
        height: 100px;
        background: url("@/assets/imgs/waveOne.png") repeat-x;
        position: absolute;
        bottom: 0;
        left: 0;
        animation: wave 15s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
        transform: translateY(-70px);
      }
      .wave:nth-child(2) {
        background: url("@/assets/imgs/waveTwo.png") repeat-x;
        animation: wave 25s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
        animation-delay: -1s;
        transform: translateY(-90px);
      }
    }
  }
}

.contaner-c {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .time {
    font-size: 48px;
    font-family: "Noto Serif SC", serif;
    font-weight: 700;
    justify-content: center;
    flex-wrap: wrap;
    &-text {
      width: 100%;
      color: $color;
    }
    &-text:nth-child(1) {
      background-image: linear-gradient(
        270deg,
        #ff4500,
        #ffa500,
        #ffd700,
        #90ee90,
        #00ffff,
        #1e90ff,
        #9370db,
        #ff69b4,
        #ff4500
      );
      -webkit-background-clip: text;
      color: #0000;
      animation: jianbian 60s linear infinite;
      font-family: "Noto Serif SC", serif;
      font-weight: 600;
      background-position: -2000rem;
    }
  }

  &-list {
    width: calc(100vw - 300px);
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 40px;
    &-item {
      width: calc(100vw / 3 - 120px);
      height: 120px;
      padding: 20px;
      justify-content: space-between;
      flex-wrap: wrap;
      background-color: $item-bgc;
      border-radius: 10px;
      margin-bottom: 40px;
      transition: transform 0.3s ease; /* 添加过渡效果 */
      &-img {
        width: 28%;
        height: 100%;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-title {
        width: 70%;
        &-h {
          font-size: 24px;
          font-weight: 700;
        }
        &-text {
          font-size: 16px;
        }
      }
    }
    &-item:hover {
      cursor: url(../../assets/unavailable.cur), auto;
      transform: translateY(-20px);
    }
  }
}
</style>