import { createApp } from 'vue'
import App from './App.vue'

import routes from './routes/routes'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faEdit,
    faTrash,
    faCheck
} from "@fortawesome/free-solid-svg-icons";

library.add(faEdit, faTrash, faCheck);
createApp(App)
.use(routes)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
