import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Tres from '@tresjs/core'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

const app = createApp(App)
app.use(router)
app.use(Tres)
app.mount('#app')
