import '@/assets/main.css'
import AlbumsTable from '@/components/AlbumsTable.vue'
import ArtistsTable from '@/components/ArtistsTable.vue'
import SongsTable from '@/components/SongsTable.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app
  .component('SongsTable', SongsTable)
  .component('ArtistsTable', ArtistsTable)
  .component('AlbumsTable', AlbumsTable)

app.mount('#app')
