<template>
  <div>
    <!-- Intégration de la barre de navigation -->
    <NavBar />

    <!-- Search Bar -->
    <div class="search-container">
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for a movie..."
          @input="filterMovies"
      />
    </div>

    <!-- Section affichage des films -->
    <div class="movies-grid">
      <MoviesCard
          v-for="movie in paginatedMovies"
          :key="movie.id"
          :movie="movie"
      />
    </div>

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import MoviesCard from '@/components/MovieCard.vue';
import NavBar from '@/components/NavBar.vue';
import { useRouter } from 'vue-router'; // Importer useRouter

const router = useRouter(); // Initialiser le router
const movies = ref([]);  // Initialise un tableau vide pour stocker les films
const searchQuery = ref(''); // Stocke la requête de recherche
const currentPage = ref(1); // Page actuelle pour la pagination
const itemsPerPage = 6; // Nombre d'éléments par page

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      // Rediriger l'utilisateur vers la page de connexion
      router.push('/'); // Utiliser router ici
      return;
    }
    const res = await axios.get('http://localhost:8319/api/movies', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(res);
    // Vérifiez si les données existent avant de les affecter
    movies.value = res.data || [];  // Stocke les films dans le tableau movies
    console.log(movies.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
  }
});

// Filter movies based on search query
const filteredMovies = computed(() => {
  return movies.value.filter(movie => {
    return movie.title.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

// Calculate total pages based on filtered movies
const totalPages = computed(() => {
  return Math.ceil(filteredMovies.value.length / itemsPerPage);
});

// Get the movies for the current page
const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredMovies.value.slice(start, start + itemsPerPage);
});

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Method to filter movies when searching
const filterMovies = () => {
  currentPage.value = 1; // Réinitialiser à la première page lors de la recherche
};
</script>

<style scoped>
/* Style pour centrer et espacer la navbar */
.nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

/* Style pour le champ de recherche */
.search-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.search-container input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px; /* Largeur fixe pour le champ de recherche */
}

/* Grille pour organiser les films en 3 colonnes */
.movies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Grille de 3 colonnes */
  gap: 20px; /* Espace entre les éléments */
  padding: 20px;
}

/* Style de base pour rendre les films en forme de cartes */
.movies-grid > * {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 10px;
  transition: transform 0.2s;
}

.movies-grid > *:hover {
  transform: scale(1.05); /* Effet zoom au survol */
}

/* Styles pour la pagination */
.pagination-controls {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.pagination-controls button {
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.pagination-controls button:disabled {
  background-color: #ccc; /* Style pour les boutons désactivés */
}
</style>
