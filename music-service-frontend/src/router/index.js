import AlbumsView from "@/views/AlbumsView.vue";
import ArtistsView from "@/views/ArtistsView.vue";
import MainView from "@/views/MainView.vue";
import SongsView from "@/views/SongsView.vue";

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: MainView,
      children: [
        { path: '', name: 'main', component: AlbumsView},
        { path: 'artists', name: 'artists', component: ArtistsView },
        { path: 'albums', name: 'albums', component: AlbumsView },
        { path: 'songs', name: 'songs', component: SongsView}
      ]
    },
  ]
})

export default router
