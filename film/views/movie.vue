<template>
  <div v-if="movie" class="movie-details">
    <h1>{{ movie.title }}</h1>
    <img :src="movieImage" alt="Movie Poster" class="movie-poster" />

    <div class="movie-info">
      <p><strong>Date de sortie:</strong> {{ formattedReleaseDate }}</p>
      <p><strong>Durée:</strong> {{ movie.duration }} minutes</p>
      <p><strong>Directeur:</strong> {{ movie.director }}</p>
      <p><strong>Note:</strong> {{ movie.rating }}</p>
      <p><strong>Catégories:</strong>
        <span v-for="c in categories" :key="c.id">{{ c.title }}</span>
      </p>
      <p><strong>Acteurs:</strong>
        <span v-for="a in actors" :key="a.id">{{ a.firstname }} {{ a.lastname }}</span>
      </p>
    </div>

    <div class="button-container">
      <button @click="goToEditMovie" class="edit-button">Modifier</button>
      <button @click="confirmDelete" class="delete-button">Supprimer</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import { onMounted, ref, computed } from "vue";
import defaultImage from '@/assets/image/pokemon.webp';

const router = useRouter();
const route = useRoute();
const movie = ref(null);
const categories = ref([]);
const actors = ref([]);

// Image du film ou image par défaut
const movieImage = computed(() => movie.value?.posterImage || defaultImage);

// Format de la date de sortie
const formattedReleaseDate = computed(() => {
  if (movie.value?.releaseDate) {
    return new Date(movie.value.releaseDate).toLocaleDateString();
  }
  return '';
});

// Redirection vers la page d'édition
const goToEditMovie = () => {
  router.push({ name: 'editmovie', params: { id: movie.value.id } });
};

// Confirmation et suppression du film
const confirmDelete = async () => {
  const confirm = window.confirm("Êtes-vous sûr de vouloir supprimer ce film ?");
  if (confirm) {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8319/api/movies/${movie.value.id}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Film supprimé avec succès.");
      router.push('/movies'); // Redirection après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression du film:", error);
      alert("Une erreur s'est produite lors de la suppression du film.");
    }
  }
};

// Chargement des catégories
const loadCategories = async () => {
  const token = localStorage.getItem('token');
  const promises = movie.value.categories.map(async (category) => {
    const response = await axios.get(`http://localhost:8319/api/categoris${category.substring(14)}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });
  categories.value = await Promise.all(promises);
};

// Chargement des acteurs
const loadActors = async () => {
  const token = localStorage.getItem('token');
  const promises = movie.value.actors.map(async (actor) => {
    const response = await axios.get(`http://localhost:8319/api/actors/${actor.substring(12)}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });
  actors.value = await Promise.all(promises);
};

// Chargement des détails du film
onMounted(async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`http://localhost:8319/api/movies/${route.params.id}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    movie.value = response.data;
    await Promise.all([loadCategories(), loadActors()]); // Chargement parallèle des catégories et acteurs
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film:', error);
  }
});
</script>

<style scoped>
.movie-details {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.movie-poster {
  width: 300px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.movie-info {
  font-size: 1.2em;
  line-height: 1.6;
}

/* Conteneur pour les boutons */
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

/* Styles des boutons */
.edit-button, .delete-button {
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button {
  background-color: #007bff;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
