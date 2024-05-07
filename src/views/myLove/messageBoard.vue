<template>
  <!-- 留言板 -->
  <div id="container">
    <video
      ref="video"
      id="video"
      controls
      autoplay
      src="../../assets/video/mm.mp4"
      @play="videoPlay"
      @pause="videoPause"
    ></video>
    <div>
      <el-input
        l-input
        v-model="message"
        placeholder="输入你想发表的留言"
        clearable
      ></el-input>
      <el-button
        type="primary"
        size="default"
        @click="emitMessage"
      >发 表</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BarrageRenderer, { BarrageOptions } from "fly-barrage"
import { onMounted, ref } from "vue"

const barrages: BarrageOptions[] = [
  {
    id: "e55b45c9-7f9e-48c9-9bba-4d3b53441976",
    barrageType: "scroll",
    time: 100,
    text: "无边落木萧萧下",
    fontSize: 34,
    lineHeight: 1.2,
    color: "#FFFF00"
  },
  {
    id: "e55b45c9-7f9e-48c9-9bba-4d3b53441976",
    barrageType: "scroll",
    time: 100,
    text: "不尽长江滚滚来",
    fontSize: 28,
    lineHeight: 1.2,
    color: "#FF6700"
  }
]

const message = ref("")
const barrageRenderer = ref<BarrageRenderer>()
const video = ref()

// 使用该函数生成16到32之间的随机整数
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const emitMessage = () => {
  barrages.push({
    id: "e55b45c9-7f9e-48c9-9bba-" + Math.random(),
    barrageType: "scroll",
    time: 100,
    text: message.value,
    fontSize: getRandomIntInclusive(16, 32),
    lineHeight: 1.2,
    color: "#FFFF23"
  })
  videoPause()//先关闭
  setTimeout(()=>{
    videoPlay()//在开启
  },1000)
  // barrageRenderer.value?.send(barrages);
}

onMounted(() => {
  barrageRenderer.value = new BarrageRenderer({
    container: "container",
    video: video.value,
    barrages
  })
})

const videoPlay = () => {
  barrageRenderer.value?.play()
}

const videoPause = () => {
  barrageRenderer.value?.pause()
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#container {
  width: 1000px;
  height: 700px;
  margin: 20px auto 0;
}

#video {
  width: 100%;
  height: 100%;
  background: black;
}
</style>