<template>
  <div v-if="actor" class="actor-details">
    <h1>{{ actor.firstname }} {{ actor.lastname }}</h1>
    <img :src="actorImage" alt="Actor Image" class="actor-photo" />

    <div class="actor-info">
      <p><strong>Date de naissance:</strong> {{ formattedBirthDate }}</p>
      <p><strong>Biographie:</strong> {{ actor.bio }}</p>
      <p><strong>Nationalité:</strong> {{ actor.nationality }}</p>
      <p><strong>Genre:</strong> {{ actor.gender }}</p>
      <p><strong>Récompenses:</strong> {{ actor.awards }}</p>
      <p><strong>Films:</strong> <span v-for="m in movies" :key="m.id">{{ m.title }} </span></p>
    </div>

    <div class="actor-actions">
      <button @click="editActor">Modifier</button>
      <button @click="deleteActor">Supprimer</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import axios from 'axios';
import { onMounted, ref, computed } from "vue";
import router from "../router/index.js";
import defaultImage from '../src/assets/image/sacha.png';

const route = useRoute();
const actor = ref(null);
const movies = ref([]);

// Image de l'acteur avec fallback
const actorImage = computed(() => actor.value?.profileImage || defaultImage);

// Formatage de la date de naissance
const formattedBirthDate = computed(() => {
  if (actor.value?.dob) {
    return new Date(actor.value.dob).toLocaleDateString();
  }
  return '';
});

// Charger les détails de l'acteur
const loadActorDetails = async () => {
  try {
    const response = await axios.get(`http://localhost:8319/api/actors/${route.params.id}`, {
      headers: getAuthHeaders(),
    });
    actor.value = response.data;
    loadMovies();
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de l'acteur:", error);
  }
};

// Charger les films associés à l'acteur
const loadMovies = async () => {
  try {
    const promises = actor.value.movies.map((movieUrl) =>
        axios.get(`http://localhost:8319/api/movies/${getMovieId(movieUrl)}`, {
          headers: getAuthHeaders(),
        }).then(res => res.data)
    );
    movies.value = await Promise.all(promises);
  } catch (error) {
    console.error("Erreur lors de la récupération des films:", error);
  }
};

// Récupère les en-têtes d'authentification
const getAuthHeaders = () => ({
  accept: 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

// Extraire l'ID du film de l'URL
const getMovieId = (movieUrl) => movieUrl.split('/').pop();

// Navigation vers la page de modification d'acteur
const editActor = () => router.push(`/editactor/${actor.value.id}`);

// Suppression de l'acteur
const deleteActor = async () => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cet acteur ?")) {
    try {
      await axios.delete(`http://localhost:8319/api/actors/${actor.value.id}`, {
        headers: getAuthHeaders(),
      });
      alert("Acteur supprimé avec succès.");
      router.push('/actors');
    } catch (error) {
      console.error("Erreur lors de la suppression de l'acteur:", error);
      alert("Une erreur s'est produite lors de la suppression de l'acteur.");
    }
  }
};

onMounted(loadActorDetails);
</script>

<style scoped>
.actor-details {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  max-width: 800px;
  margin: 0 auto;
}

.actor-photo {
  width: 200px;
  height: auto;
  border-radius: 10px;
  margin: 20px auto;
  display: block;
}

.actor-info {
  font-size: 1.2em;
  line-height: 1.6;
}

.actor-actions {
  margin-top: 20px;
}

button {
  padding: 10px 15px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
