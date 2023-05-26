<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="grid grid-cols-6 pl-5 ml-5 pt-5 mt-5">
  <div>
    <ul class="list-none">
      <li><RouterLink class="hover:text-purple-700" to="albums">Albums</RouterLink></li>
      <li><RouterLink class="hover:text-purple-700" to="artists">Artists</RouterLink></li>
      <li><RouterLink class="hover:text-purple-700" to="songs">Songs</RouterLink></li>
    </ul>
  </div>
  <div class="col-span-5"><RouterView /></div>
  </div>
</template>

<style scoped>

</style>