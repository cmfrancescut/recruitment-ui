import { defineStore } from 'pinia'
import axios from 'axios'
import { parseLinkHeader } from "@web3-storage/parse-link-header";

const baseurl = 'http://localhost:5000'
const instance = axios.create({
  baseURL: baseurl
})
instance.defaults.headers.common['Authorization'] = import.meta.env.VITE_DEV_JWT_TOKEN


export const useMusicServiceStore = defineStore('MusicServiceStore', {
  state: () =>({
    songs: [],
    songPagination: {},
    albums: [],
    albumPagination: {},
    artists: [],
    artistPagination: {}
  }),
  actions: {
    async fetchSongs (number = 10, page = 1) {
      await instance.get(`${baseurl}/songs?_page=${page}&_limit=${number}`)
        .then(response => {
          this.songPagination = response.headers.link ? parseLinkHeader(response.headers.link) : {}
          this.songs = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    async fetchArtists (number = 10, page = 1) {
      await instance.get(`${baseurl}/artists?_page=${page}&_limit=${number}`)
        .then(response => {
          this.artistPagination = response.headers.link ? parseLinkHeader(response.headers.link) : {}
          this.artists = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    async fetchAlbums (number = 10, page = 1) {
      await instance.get(`${baseurl}/albums?_page=${page}&_limit=${number}`)
        .then(response => {
          this.albumPagination = response.headers.link ? parseLinkHeader(response.headers.link) : {}
          this.albums = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // I know that the API is supposed to provide sorting functionality, but I found that
    // it wasn't working as I expected it to, so I wrote my own for temporary use (swapping this function
    // out for something server-side shouldn't be difficult)
    sortSongs(sortAscending = true) {
      this.songs.sort((a, b) => {
        const songNameA = a.name
        const songNameB = b.name
        let result = 0

        if (songNameA < songNameB) {
          result = -1
        }

        if (songNameA > songNameB) {
          result = 1
        }

        return sortAscending ? result : result * -1
      })
    },
    sortArtists(sortAscending = true) {
      this.artists.sort((a, b) => {
        const artistNameA = a.name
        const artistNameB = b.name
        let result = 0

        if (artistNameA < artistNameB) {
          result = -1
        }

        if (artistNameA > artistNameB) {
          result = 1
        }

        return sortAscending ? result : result * -1
      })
    },
    sortAlbums(sortAscending = true) {
      this.albums.sort((a, b) => {
        const albumNameA = a.name
        const albumNameB = b.name
        let result = 0

        if (albumNameA < albumNameB) {
          result = -1
        }

        if (albumNameA > albumNameB) {
          result = 1
        }

        return sortAscending ? result : result * -1
      })
    }
  }
})
