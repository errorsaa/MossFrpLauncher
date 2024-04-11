import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VarletUI from '@varlet/ui'
import '@varlet/ui/es/style'
import '@varlet/touch-emulator'

const app = createApp(App)

app.use(router)
app.use(VarletUI)

app.mount('#app')
