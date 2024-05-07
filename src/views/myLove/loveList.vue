<!-- ts -->
<script setup lang='ts'>
import { ref, watch } from "vue"
import { Search } from "@element-plus/icons-vue"
const filterText = ref("")
const treeRef = ref<InstanceType<typeof ElTree>>()
const datalists = ref("")
const page = ref("1")

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

// 图片列表
const getDataLists = () => {
  fetch(
    `https://www.mrwan.top/api/get_list?page=${page.value}&limit=5&type=4K专区`
  )
    .then((response) => response.json()) // 解析响应为JSON
    .then((res) => {
      datalists.value = res.data
    }) // 在控制台输出数据
    .catch((error) => {})
}
getDataLists()

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

interface Tree {
  label: string
  children?: Tree[]
}
const handleNodeClick = (data: Tree) => {
  page.value = data.page
  getDataLists()
}

const data: Tree[] = [
  {
    label: "恋爱列表-左",
    page: 1,
    children: [
      {
        label: "2021-10-20",
        page: 2,
        children: [
          {
            label: "周一",
            page: 3,
            children: [
              {
                label: "上午",
                page: 4
              },
              {
                label: "下午",
                page: 5
              }
            ]
          }
        ]
      },
      {
        label: "2022-02-23",
        page: 6,
        children: [
          {
            label: "周三",
            page: 7,

            children: [
              {
                label: "上午",
                page: 8
              },
              {
                label: "下午",
                page: 9
              }
            ]
          },
          {
            label: "周五",
            page: 10,

            children: [
              {
                label: "上午",
                page: 11
              },
              {
                label: "下午",
                page: 12
              }
            ]
          }
        ]
      },
      {
        label: "2024-05-02",
        page: 13,

        children: [
          {
            label: "周二",
            page: 14,

            children: [
              {
                label: "上午",
                page: 15
              },
              {
                label: "下午",
                page: 15
              }
            ]
          },
          {
            label: "周三",
            page: 3,
            children: [
              {
                label: "上午",
                page: 4
              },
              {
                label: "下午",
                page: 5
              }
            ]
          }
        ]
      }
    ]
  }
]
const defaultProps = {
  children: "children",
  label: "label"
}
</script>
<template>
  <!-- 恋爱列表 -->
  <div class="container-row-sm-left">
    <div class="row-item">
      <div class="row-left">
        <el-input
          v-model="filterText"
          style="margin-bottom: 1vh;margin-top:1vh;border-radios: 10px"
          placeholder="输入查询内容"
          :prefix-icon="Search"
        />
        <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :data="data"
          :props="defaultProps"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
        />
      </div>
    </div>
    <div class="row-item">
      <div style="padding-top:5vh;">
        <el-carousel
          :interval="4000"
          type="card"
          height="70vh"
        >
          <el-carousel-item
            v-for="item in datalists"
            :key="item.id"
          >
            <el-image
              :src="item.img_url"
              fit="cover"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>
<style scoped lang='scss'>
.row-item {
  background-color: #fff !important;
}
.row-item:nth-child(1) .row-left {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  border-radius: 10px;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
</style>