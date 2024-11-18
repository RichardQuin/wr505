<template>
  <div>
    <!-- Bouton Ajouter un acteur -->
    <div class="add-actor-container">
      <button @click="addActor" class="btn-add-actor">Ajouter un acteur</button>
    </div>

    <!-- Barre de recherche -->
    <div class="search-container">
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Rechercher un acteur..."
          @input="filterActors"
      />
    </div>

    <!-- Grille d'affichage des acteurs -->
    <div class="actors-grid">
      <ActorCard
          v-for="actor in paginatedActors"
          v-if="actors"
          :key="actor.id"
          :actor="actor"
      />
    </div>

    <!-- Contrôles de pagination -->
    <div class="pagination-controls">
      <button @click="previousPage" :disabled="isFirstPage">Précédent</button>
      <span>Page {{ currentPage }} sur {{ totalPages }}</span>
      <button @click="nextPage" :disabled="isLastPage">Suivant</button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import ActorCard from "@/components/ActorCard.vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const actors = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 6;

const loadActors = async () => {
  const token = localStorage.getItem('token');
  if (!token) return router.push('/'); // Redirection si pas de token
  try {
    const { data } = await axios.get('http://localhost:8319/api/actors', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    actors.value = data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des acteurs:', error);
  }
};

// Filtrer les acteurs en fonction de la recherche
const filteredActors = computed(() =>
    actors.value.filter(actor =>
        `${actor.firstname} ${actor.lastname}`.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
);

// Pagination
const totalPages = computed(() => Math.ceil(filteredActors.value.length / itemsPerPage));
const paginatedActors = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredActors.value.slice(start, start + itemsPerPage);
});

// Méthodes de pagination
const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === totalPages.value);
const nextPage = () => { if (!isLastPage.value) currentPage.value++; };
const previousPage = () => { if (!isFirstPage.value) currentPage.value--; };

// Réinitialiser la page lors d'une recherche
const filterActors = () => currentPage.value = 1;

// Ajouter un nouvel acteur
const addActor = () => router.push('/addactor');

// Charger les acteurs au montage du composant
onMounted(loadActors);
</script>

<style scoped>
/* Style pour le conteneur du bouton Ajouter */
.add-actor-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.btn-add-actor {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
}

.btn-add-actor:hover {
  background-color: #218838;
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
  width: 300px;
}

/* Grille d'affichage des acteurs */
.actors-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
}

/* Style pour les contrôles de pagination */
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
  background-color: #ccc;
}
</style>
