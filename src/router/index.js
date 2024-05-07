import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import NProgress from 'nprogress';
const routers = [
  {
    path: '/',
    redirect: "/index",
  },
  {
    path: "/index",
    component: () => import('@/layout/layout.vue'),
    children: [
      {
        path: "/index",
        name: "index",
        meta: {
          title: 'mmy-sxy',
          keepAlive: true,
        },
        component: () => import('@/views/myLove/index.vue')
      },
      {
        path: '/album',
        name: 'album',
        meta: {
          title: 'mmy-sxy-album',
          keepAlive: false,//是否缓存
        },
        component: () => import('@/views/myLove/loveAlbum.vue'),
      },
      {
        path: '/loveList',
        name: 'loveList',
        meta: {
          title: 'mmy-sxy-loveList',
          keepAlive: false,
        },
        component: () => import('@/views/myLove/loveList.vue'),
      },
      {
        path: '/bitbyBit',
        name: 'bitbyBit',
        meta: {
          title: 'mmy-sxy-bitbyBit',
          keepAlive: false,
        },
        component: () => import('@/views/myLove/bitbyBit.vue'),
      },
      {
        path: '/messageBoard',
        name: 'messageBoard',
        meta: {
          title: 'mmy-sxy-messageBoard',
          keepAlive: false,
        },
        component: () => import('@/views/myLove/messageBoard.vue'),
      },
      {
        path: '/about',
        name: 'aboutUs',
        meta: {
          title: 'mmy-sxy-about',
          keepAlive: false,
        },
        component: () => import('@/views/myLove/aboutUs.vue'),
      },
    ],
  },

]
const router = createRouter({
  // history: createWebHashHistory(),//历史模式/#/

  history: createWebHistory("/"),//无历史模式 阿里云
  // history: createWebHistory("/love-diary"),//无历史模式 gitee
  routes: routers
})
router.beforeEach((to, from, next) => {
  // 开始加载进度条
  NProgress.start();
  document.title = to.meta.title
  next()
})

router.afterEach(() => {
  // 结束加载进度条
  NProgress.done()
})
export default router