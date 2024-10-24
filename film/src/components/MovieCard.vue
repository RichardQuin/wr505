<template>
  <div class="movie-card" @click="goToMovieDetails">
    <img :src="movieImage" alt="Movie Image" class="movie-image" />
    <h3>{{ movie.title }}</h3>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import movieImage from '../assets/image/pokemon.webp'; // Assurez-vous que le chemin est correct

// Props
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

// Utiliser le router pour la navigation
const router = useRouter();

// Méthode pour naviguer vers la page de détails du film
const goToMovieDetails = () => {
  router.push({ name: 'movie', params: { id: props.movie.id } });
};
</script>

<style scoped>
.movie-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s;
  margin: 10px;
  position: relative;
  overflow: hidden;
}

.movie-image {
  width: 100%;
  height: auto; /* Pour garder les proportions de l'image */
  object-fit: cover; /* Couvre toute la zone sans déformer l'image */
  border-radius: 10px;
}

.movie-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transform: scale(1.02); /* Légère agrandissement au survol */
}
</style>
