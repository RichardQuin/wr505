<template>
  <div>
    <!-- Intégration de la barre de navigation -->


    <!-- Search Bar -->
    <div class="search-container">
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for an actor..."
          @input="filterActors"
      />
    </div>

    <!-- Section affichage des acteurs -->
    <div class="actors-grid">
      <ActorCard
          v-for="actor in paginatedActors"
          v-if="actors"
          :key="actor.id"
          :actor="actor"
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
import ActorCard from "@/components/ActorCard.vue";
import NavBar from "@/components/NavBar.vue";

const actors = ref([]);  // Initialise un tableau vide pour stocker les acteurs
const searchQuery = ref(''); // Store the search query
const currentPage = ref(1); // Current page for pagination
const itemsPerPage = 6; // Number of items per page

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      //--- rediriger l'utilisateur vers la page de connexion
      this.$router.push('/');
      return;
    }
    const res = await axios.get('http://localhost:8319/api/actors', {
      headers: {
        // eslint-disable-next-line no-undef
        accept:'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(res);
    actors.value = res.data || [];  // Stocke les acteurs dans le tableau actors
    console.log(actors.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des acteurs:', error);
  }
});

// Filter actors based on search query
const filteredActors = computed(() => {
  return actors.value.filter(actor => {
    return `${actor.firstname} ${actor.lastname}`.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

// Calculate total pages based on filtered actors
const totalPages = computed(() => {
  return Math.ceil(filteredActors.value.length / itemsPerPage);
});

// Get the actors for the current page
const paginatedActors = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredActors.value.slice(start, start + itemsPerPage);
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

// Method to filter actors when searching
const filterActors = () => {
  currentPage.value = 1; // Reset to first page when searching
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

/* Grille pour organiser les acteurs */
.actors-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Grille de 3 colonnes */
  gap: 20px; /* Espace entre les éléments */
  padding: 20px;
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
