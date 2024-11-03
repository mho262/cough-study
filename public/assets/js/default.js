import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import main from './main.js'


createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')