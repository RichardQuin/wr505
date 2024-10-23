<template>
  <div>
    <NavBar />

    <div class="home-page">
      <h1 class="title">Welcome to the Movie Database</h1>

      <!-- Section Movies -->
      <section class="movies-section">
        <h2 class="section-title">Latest Movies</h2>
        <div class="movies-list">
          <MovieCard
              v-for="movie in latestMovies"
              :key="movie.id"
              :movie="movie"
              @click="goToMovieDetails(movie.id)"
          />
        </div>
      </section>

      <!-- Section Actors -->
      <section class="actors-section">
        <h2 class="section-title">Latest Actors</h2>
        <div class="actors-list">
          <ActorCard
              v-for="actor in latestActors"
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
import { ref, onMounted } from 'vue';
import axios from 'axios'; // Import your custom axios instance
import MovieCard from '@/components/MovieCard.vue';
import ActorCard from '@/components/ActorCard.vue';
import NavBar from '@/components/NavBar.vue';

const latestMovies = ref([]);
const latestActors = ref([]);

// Fetch latest movies from the API
const fetchLatestMovies = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      //--- rediriger l'utilisateur vers la page de connexion
      this.$router.push('/');
      return;
    }
    const response = await axios.get('http://localhost:8319/api/movies', {
      headers: {
        // eslint-disable-next-line no-undef
        accept:'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    latestMovies.value = response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

// Fetch latest actors from the API
const fetchLatestActors = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      //--- rediriger l'utilisateur vers la page de connexion
      this.$router.push('/');
      return;
    }
    const response = await axios.get('http://localhost:8319/api/actors',{
      headers: {
        // eslint-disable-next-line no-undef
        accept:'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    latestActors.value = response.data;
  } catch (error) {
    console.error('Error fetching actors:', error);
  }
};

// Navigate to movie details page
const goToMovieDetails = (id) => {
  this.$router.push({ name: 'MovieDetails', params: { id } });
};

// Navigate to actor details page
const goToActorDetails = (id) => {
  this.$router.push({ name: 'ActorDetails', params: { id } });
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
  background-color: #f9f9f9; /* Light background for contrast */
  color: #333; /* Dark text for readability */
  max-width: 1200px; /* Maximum width for larger screens */
  margin: 0 auto; /* Center the content */
}

.title {
  text-align: center;
  font-size: 2.5em; /* Large title */
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.8em; /* Slightly smaller than main title */
  margin: 20px 0 10px; /* Spacing around section title */
  border-bottom: 2px solid #007bff; /* Blue underline for emphasis */
  padding-bottom: 5px; /* Space between title and underline */
}

/* Movies and Actors Sections */
.movies-section, .actors-section {
  margin-bottom: 40px;
}

.movies-list,
.actors-list {
  display: grid; /* Use grid layout for responsive design */
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* Responsive columns */
  gap: 20px; /* Space between cards */
}

/* Style adjustments for cards (optional, you can customize this based on your existing card styles) */
.movies-list > MovieCard,
.actors-list > ActorCard {
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* Transition for hover effects */
  display: flex; /* Flex for centering content */
  flex-direction: column; /* Stack children vertically */
}

.movies-list > MovieCard:hover,
.actors-list > ActorCard:hover {
  transform: scale(1.05); /* Slight zoom on hover */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Shadow effect on hover */
}

/* Responsive styles */
@media (max-width: 768px) {
  .title {
    font-size: 2em; /* Slightly smaller title on smaller screens */
  }

  .section-title {
    font-size: 1.5em; /* Smaller section title on smaller screens */
  }
}
</style>
