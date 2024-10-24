<template>
  <div v-if="movie" class="movie-details">
    <h1>{{ movie.title }}</h1>
    <img :src="movie.posterImage" alt="Movie Poster" class="movie-poster" />

    <div class="movie-info">
      <p><strong>Release Date:</strong> {{ formattedReleaseDate }}</p>
      <p><strong>Duration:</strong> {{ movie.duration }} minutes</p>
      <p><strong>Director:</strong> {{ movie.director }}</p>
      <p><strong>Rating:</strong> {{ movie.rating }}</p>
      <p><strong>Categories:</strong>
        <span v-for="c in movie.categories" :key="c.id"> {{ c.title }} </span>
      </p>
      <p><strong>Actors:</strong>
        <span v-for="a in movie.actors" :key="a.id"> {{ a.firstname + " " + a.lastname }} </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import axios from 'axios';
import { onMounted, ref, computed } from "vue";

const router = useRoute();
let movie = ref(null);

// Format the release date
const formattedReleaseDate = computed(() => {
  if (movie.value && movie.value.releaseDate) {
    const date = new Date(movie.value.releaseDate);
    return date.toLocaleDateString();
  }
  return '';
});

// Fetch movie details on component mount
onMounted(() => {
  axios.get(`http://localhost:8319/api/movies/${router.params.id}`)
      .then((res) => {
        console.log(res.data);
        movie.value = res.data;
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });
});
</script>

<style scoped>
.movie-details {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  max-width: 800px;
  margin: 0 auto;
}

.movie-poster {
  width: 100%;
  height: auto; /* Maintenir les proportions de l'image */
  border-radius: 10px;
  margin-bottom: 20px;
}

.movie-info {
  font-size: 1.2em; /* Taille de police pour les informations */
  line-height: 1.6; /* Espacement entre les lignes */
}
</style>
