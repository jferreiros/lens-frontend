import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/tailwind.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrashAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEdit, faTrashAlt, faTimesCircle)


const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')