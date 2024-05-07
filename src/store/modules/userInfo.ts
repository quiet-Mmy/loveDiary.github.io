import {defineStore} from 'pinia';
import screenfull from 'screenfull';
export const useUserInfoStore = defineStore({
  id: 'userInfoStore',
  state: () => ({
    isLockScreen:<any>false,
    password: '',//锁屏密码
  }),

  actions: {
    setLockScreen(){
      this.isLockScreen = !this.isLockScreen;
      // 设置全屏
      if (this.isLockScreen) {
        screenfull.toggle(); // 切换全屏状态
      } else {
        // 不支持全屏的处理逻辑
        
      }
    },
    setPassword(val){
      this.password = val
    }
  },
  
  // 开启持久化存储
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       storage: sessionStorage,
  //       paths: [
  //         'isLockScreen',
  //       ]
  //     },
  //     {
  //       storage: localStorage,
  //       paths: ['title']
  //     }
  //   ]
  // }
})