<template>
  <div v-if="movie" class="movie-details">
    <h1>{{ movie.title }}</h1>
    <img :src="movieImage" alt="Movie Poster" class="movie-poster" />

    <div class="movie-info">
      <p><strong>Release Date:</strong> {{ formattedReleaseDate }}</p>
      <p><strong>Duration:</strong> {{ movie.duration }} minutes</p>
      <p><strong>Director:</strong> {{ movie.director }}</p>
      <p><strong>Rating:</strong> {{ movie.rating }}</p>
      <p><strong>Categories:</strong>
        <span v-for="c in categories" :key="c.id"> {{ c.title }} </span>
      </p>
      <p><strong>Actors:</strong>
        <span v-for="a in actors" :key="a.id"> {{ a.firstname }} {{ a.lastname }} </span>
      </p>

      <!-- Bouton Modifier -->
      <button @click="goToEditMovie" class="edit-button">Modifier</button>

      <!-- Bouton Supprimer -->
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
  if (movie.value && movie.value.releaseDate) {
    const date = new Date(movie.value.releaseDate);
    return date.toLocaleDateString();
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
  try {
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
  } catch (error) {
    console.error('Erreur lors du chargement des catégories:', error);
  }
};

// Chargement des acteurs
const loadActors = async () => {
  try {
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
  } catch (error) {
    console.error('Erreur lors du chargement des acteurs:', error);
  }
};

// Chargement des détails du film
onMounted(() => {
  const token = localStorage.getItem('token');
  axios.get(`http://localhost:8319/api/movies/${route.params.id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
      .then((res) => {
        movie.value = res.data;
        loadCategories();
        loadActors();
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails du film:', error);
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

.edit-button, .delete-button {
  position: absolute;
  bottom: 20px;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button {
  right: 100px;
  background-color: #007bff;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  right: 20px;
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
