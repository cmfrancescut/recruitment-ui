<script setup>
import { useMusicServiceStore } from '@/stores/MusicServiceStore'
import { computed, onMounted, ref } from "vue";
import { ArrowSmallUpIcon, ArrowSmallDownIcon } from '@heroicons/vue/20/solid'

const store = useMusicServiceStore()
const loading = ref(true)
const artists = ref([])
const artistPagination = ref({})
const sortAsc = ref(true)
const currentPage = ref(1)

const sortText = computed(() => {
  return sortAsc.value
})

onMounted(() => {
  loading.value = true
  loadPage()
})

async function loadPage() {
  await store.fetchArtists().then(() => {
    artists.value = store.artists
    artistPagination.value = store.artistPagination
    loading.value = false
  })
}

async function pageSelection(page) {
  if (currentPage.value !== page) {
    loading.value = true
    await store.fetchArtists(10, page).then(() => {
      artistPagination.value = store.artistPagination
      currentPage.value = page
      artists.value = store.artists
      loading.value = false
    })
  }
}

function sort() {
  store.sortArtists(sortAsc.value)
  sortAsc.value = !sortAsc.value
}
</script>

<template>
  <div class="prose">
  <h1>Artists</h1>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <table>
      <tr class="border-b-2 border-b-gray-700">
        <th class="flex flex-inline align-middle">Artist Name
          <ArrowSmallUpIcon
          class="h-6 w-6 p-0 hover:cursor-pointer self-center"
          v-if="sortText"
          @click="sort()"
        />
          <ArrowSmallDownIcon
            class="h-6 w-6 p-0 hover:cursor-pointer self-center"
            v-if="!sortText"
            @click="sort()"
          /></th>
      </tr>
      <tr v-for="artist in artists" class="odd:bg-gray-100">
        <td class="pl-2">{{ artist.name }}</td>
      </tr>
    </table>
    <div class="flex space-x-5 gap-5 no-prose">
      <button
        class="border border-1 rounded-lg px-5 py-2 hover:text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:hover:no-underline disabled:hover:text-gray-300 disabled:text-gray-300 disabled:hover:bg-white"
        @click="pageSelection(1)"
        :disabled="1 === currentPage"
      >
        First page
      </button>
      <button
        class="border border-1 rounded-lg px-5 py-2 hover:text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:hover:no-underline disabled:hover:text-gray-300 disabled:text-gray-300 disabled:hover:bg-white"
        @click="pageSelection(artistPagination.prev._page)"
        :disabled="artistPagination.prev ? artistPagination.prev._page === currentPage : true"
      >
        Previous page
      </button>
      <button
        class="border border-1 rounded-lg px-5 py-2 hover:text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:hover:no-underline disabled:hover:text-gray-300 disabled:text-gray-300 disabled:hover:bg-white"
        @click="pageSelection(artistPagination.next._page)"
        :disabled="artistPagination.next ? artistPagination.next._page === currentPage : true"
      >
        Next page
      </button>
      <button
        class="border border-1 rounded-lg px-5 py-2 hover:text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:hover:no-underline disabled:hover:text-gray-300 disabled:text-gray-300 disabled:hover:bg-white"
        @click="pageSelection(artistPagination.last._page)"
        :disabled="artistPagination.last ? artistPagination.last._page === currentPage : true"
      >
        Last page
      </button>
    </div>
  </div>
  </div>
</template>

<style scoped>
@import '@/assets/main.css';
</style>