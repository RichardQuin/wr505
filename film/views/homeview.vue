<template>
  <div>
    <div class="home-page">
      <h1 class="title">Bienvenue dans la base de données des films</h1>

      <!-- Section Movies -->
      <section class="movies-section">
        <h2 class="section-title">Derniers Films</h2>
        <div class="movies-list">
          <MovieCard
              v-for="movie in displayedMovies"
              :key="movie.id"
              :movie="movie"
              @click="goToMovieDetails(movie.id)"
          />
        </div>
      </section>

      <!-- Section Actors -->
      <section class="actors-section">
        <h2 class="section-title">Derniers Acteurs</h2>
        <div class="actors-list">
          <ActorCard
              v-for="actor in displayedActors"
              :key="actor.id"
              :actor="actor"
              @click="goToActorDetails(actor.id)"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import MovieCard from '@/components/MovieCard.vue';
import ActorCard from '@/components/ActorCard.vue';

const latestMovies = ref([]);
const latestActors = ref([]);

// Fetch latest movies from the API
const fetchLatestMovies = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      // Rediriger l'utilisateur vers la page de connexion
      window.location.href = '/'; // Utiliser window.location.href pour redirection
      return;
    }
    const response = await axios.get('http://localhost:8319/api/movies', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    latestMovies.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
  }
};

// Fetch latest actors from the API
const fetchLatestActors = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      // Rediriger l'utilisateur vers la page de connexion
      window.location.href = '/'; // Utiliser window.location.href pour redirection
      return;
    }
    const response = await axios.get('http://localhost:8319/api/actors', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    latestActors.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des acteurs:', error);
  }
};

// Computed property to limit the number of displayed movies
const displayedMovies = computed(() => {
  return latestMovies.value.slice(0, 6); // Affiche seulement les 6 premiers films
});

// Computed property to limit the number of displayed actors
const displayedActors = computed(() => {
  return latestActors.value.slice(0, 6); // Affiche seulement les 6 premiers acteurs
});

// Navigate to movie details page
const goToMovieDetails = (id) => {
  window.location.href = `/movie/${id}`; // Utiliser window.location.href pour redirection
};

// Navigate to actor details page
const goToActorDetails = (id) => {
  window.location.href = `/actor/${id}`; // Utiliser window.location.href pour redirection
};

// Fetch data when component is mounted
onMounted(() => {
  fetchLatestMovies();
  fetchLatestActors();
});
</script>

<style scoped>
/* General Styles */
.home-page {
  padding: 20px;
  background-color: #f9f9f9; /* Fond clair pour le contraste */
  color: #333; /* Texte sombre pour la lisibilité */
  max-width: 1200px; /* Largeur maximum pour les grands écrans */
  margin: 0 auto; /* Centrer le contenu */
}

.title {
  text-align: center;
  font-size: 2.5em; /* Grand titre */
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.8em; /* Légèrement plus petit que le titre principal */
  margin: 20px 0 10px; /* Espacement autour du titre de section */
  border-bottom: 2px solid #007bff; /* Soulignement bleu pour accentuer */
  padding-bottom: 5px; /* Espacement entre le titre et le soulignement */
}

/* Movies and Actors Sections */
.movies-section,
.actors-section {
  margin-bottom: 40px;
}

.movies-list,
.actors-list {
  display: grid; /* Utiliser une disposition en grille pour un design réactif */
  grid-template-columns: repeat(3, 1fr); /* 3 colonnes */
  gap: 20px; /* Espace entre les cartes */
}

/* Style des cartes */
.movies-list > MovieCard,
.actors-list > ActorCard {
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* Transition pour les effets au survol */
  display: flex; /* Flex pour centrer le contenu */
  flex-direction: column; /* Empiler les enfants verticalement */
  border: 1px solid #e0e0e0; /* Bordure légère autour des cartes */
  border-radius: 10px; /* Coins arrondis */
  overflow: hidden; /* Évite que le contenu dépasse les bords arrondis */
}

.movies-list > MovieCard:hover,
.actors-list > ActorCard:hover {
  transform: scale(1.05); /* Légère augmentation au survol */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Effet d'ombre au survol */
}

/* Styles réactifs */
@media (max-width: 768px) {
  .movies-list,
  .actors-list {
    grid-template-columns: repeat(2, 1fr); /* 2 colonnes sur les écrans moyens */
  }

  .title {
    font-size: 2em; /* Titre légèrement plus petit sur les petits écrans */
  }

  .section-title {
    font-size: 1.5em; /* Titre de section plus petit sur les petits écrans */
  }
}

@media (max-width: 480px) {
  .movies-list,
  .actors-list {
    grid-template-columns: 1fr; /* 1 colonne sur les petits écrans */
  }
}
</style>
