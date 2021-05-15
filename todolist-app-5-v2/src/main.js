import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import markdown from './directives/markdown.js'
import 'materialize-css/dist/js/materialize.min'
import './registerServiceWorker'

createApp(App).use(store).use(router).directive('markdown', markdown).mount('#app')
