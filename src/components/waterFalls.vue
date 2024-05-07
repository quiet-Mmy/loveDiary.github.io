<template>
  <!-- 公共瀑布流图片组件 -->
  <Waterfall
    v-loading="loading"
    v-infinite-scroll="getImgList"
    :infinite-scroll-delay="500"
    :list="list"
    style="width: 100%"
    :gutter="20"
    :width="246"
    :breakpoints="breakpoints"
    :posDuration="300"
    :infinite-scroll-distance="50"
  >
    <template #item="{ item, img_url, index }">
      <div
        class="card box"
        @click="handleImg(item)"
      >
        <!-- <LazyImg :url="item.img_url" /> -->
        <el-image
          :src="item.img_url"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="[item.img_url]"
          :initial-index="0"
          fit="cover"
          :preview-teleported="true"
          :z-index="3000"
          :hide-on-click-modal="true"
        />
        <div class="flex">
          <el-button
            type="primary"
            @click="download(item.img_url,item.describe +'-'+ item.created_time)"
          >下载</el-button>
        </div>
      </div>
    </template>
  </Waterfall>

</template>
<script setup lang='ts'>
import { ref, watch } from "vue"
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next"
import "vue-waterfall-plugin-next/dist/style.css"

const loading = ref(false)
const flag = ref(true)
const list = ref([])
const total = ref(0)
const page = ref(0)
const limit = ref(20)
const props = defineProps<{ activeName: any }>()
const breakpoints = ref({
  1200: { rowPerView: 3 },
  800: { rowPerView: 2 },
  500: { rowPerView: 1 }
})
watch(
  () => props.activeName,
  () => {
    flag.value = true
    list.value = []
    page.value = 0
    getImgList()
  }
)
const handleImg = () => {
  console.log("handleImg")
}

const getImgList = () => {
  console.log(props.activeName, "props.activeName")
  if (flag.value && props.activeName && props.activeName !== undefined) {
    loading.value = true
    page.value++
    fetch(
      `https://www.mrwan.top/api/get_list?page=${page.value}&limit=${limit.value}&type=${props.activeName}`
    )
      .then((response) => response.json()) // 解析响应为JSON
      .then((res) => {
        if (list.value.length == 0) {
          list.value = res.data
          total.value = res.total
        } else {
          list.value = list.value.concat(res.data)
        }
        if (list.value && list.value.length >= total.value) {
          flag.value = false
        }
        loading.value = false
      }) // 在控制台输出数据
      .catch((error) => {
        loading.value = false
      })
  }
}

const download = (imgsrc, name) => {
  //单张图片下载
  let image = new Image()
  // 解决跨域 Canvas 污染问题
  image.setAttribute("crossOrigin", "anonymous")
  image.onload = function () {
    let canvas = document.createElement("canvas")
    canvas.width = image.width
    canvas.height = image.height
    let context = canvas.getContext("2d")
    context.drawImage(image, 0, 0, image.width, image.height)
    let url = canvas.toDataURL("image/png") //得到图片的base64编码数据

    let a = document.createElement("a") // 生成一个a元素
    let event = new MouseEvent("click") // 创建一个单击事件
    a.download = name || "img" // 设置图片名称
    a.href = url // 将生成的URL设置为a.href属性
    a.dispatchEvent(event) // 触发a的单击事件
  }
  image.src = imgsrc
}
</script>
<style scoped lang='scss'>
.example-showcase .el-loading-mask {
  z-index: 9;
  height: 100%;
}
.card.box {
  .el-button.el-button--primary.el-button--default {
    background-color: #79bbff !important;
  }
}
</style>