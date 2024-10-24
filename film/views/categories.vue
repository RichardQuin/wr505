<script setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import NavBar from "@/components/NavBar.vue"; // Importez la NavBar ici
import CategoryCard from "@/components/CategoryCard.vue";

const categoris = ref([]); // Initialise un tableau vide
const searchQuery = ref(''); // Requête de recherche
const currentPage = ref(1); // Page actuelle pour la pagination
const itemsPerPage = 6; // Nombre d'éléments par page

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      //--- rediriger l'utilisateur vers la page de connexion
      this.$router.push('/');
      return;
    }

    const res = await axios.get('http://localhost:8319/api/categoris', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res);

    // Stocke toutes les catégories reçues et enlève les doublons
    const uniqueCategories = Array.from(new Set(res.data.map(cat => cat.title)))
        .map(title => res.data.find(cat => cat.title === title));

    categoris.value = uniqueCategories; // Met à jour categoris avec les catégories uniques
    console.log(categoris.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
  }
});

// Filtrer les catégories en fonction de la recherche
const filteredCategories = computed(() => {
  return categoris.value.filter(cat =>
      cat.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Pagination
const totalPages = computed(() => {
  return Math.ceil(filteredCategories.value.length / itemsPerPage);
});

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredCategories.value.slice(start, start + itemsPerPage);
});

// Méthodes de pagination
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
</script>

<template>
  <NavBar />

  <!-- Barre de recherche -->
  <div class="search-container">
    <input
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher une catégorie..."
    />
  </div>

  <category-card
      v-for="category in paginatedCategories"
      v-if="paginatedCategories.length"
      :key="category.id"
      :categoris="category">
  </category-card>

  <!-- Contrôles de pagination -->
  <div class="pagination-controls">
    <button @click="previousPage" :disabled="currentPage === 1">Précédent</button>
    <span>Page {{ currentPage }} de {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

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

/* Styles pour les contrôles de pagination */
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
