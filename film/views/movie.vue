<script setup>
import {useRoute} from "vue-router";
import axios from 'axios'
import {onMounted,ref} from "vue";
import MovieCard from "@/components/MovieCard.vue";
const router= useRoute()
let movie=ref(null)
console.log(router.params)
onMounted(() => {
  axios.get('http://localhost:8319/api/movies/'+router.params.id).then((res)=> {
    console.log(res.data)
    movie.value=res.data
  })
})

</script>

<template>
  <div v-if="movie" >
    <movie-card :movie="movie"></movie-card>
  </div>
</template>