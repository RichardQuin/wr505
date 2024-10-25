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

      <p><strong>Films:</strong>
        <span v-for="m in movies" :key="m.id"> {{ m.title + " " }} </span>
      </p>
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
import defaultImage from '../src/assets/image/sacha.png';
import router from "../router/index.js"; // Image par défaut pour l'acteur

const route = useRoute();
let actor = ref(null);
const movies = ref([]); // Stocker les films de l'acteur

// Image de l'acteur ou image par défaut
const actorImage = computed(() => {
  return actor.value?.profileImage || defaultImage;
});

// Formater la date de naissance
const formattedBirthDate = computed(() => {
  if (actor.value && actor.value.dob) {
    const date = new Date(actor.value.dob);
    return date.toLocaleDateString();
  }
  return '';
});

// Charger les films associés à l'acteur
const loadMovies = async () => {
  try {
    const token = localStorage.getItem('token');
    const promises = actor.value.movies.map(async (movie) => {
      const response = await axios.get(`http://localhost:8319/api/movies/${movie.substring(12)}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    });

    movies.value = await Promise.all(promises);
    console.log('Movies:', movies.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
  }
};

// Charger les détails de l'acteur et les films associés
onMounted(() => {
  const token = localStorage.getItem('token');
  axios.get(`http://localhost:8319/api/actors/${route.params.id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
      .then((res) => {
        console.log(res.data);
        actor.value = res.data;
        loadMovies(); // Charger les films après avoir récupéré l'acteur
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails de l\'acteur:', error);
      });
});

// Fonction pour modifier l'acteur
const editActor = () => {
  console.log("ID de l'acteur à modifier :", actor.value.id); // Log de l'ID
  router.push(`/editactor/${actor.value.id}`); // Redirige vers la page de modification
};

// Fonction pour supprimer l'acteur
const deleteActor = async () => {
  const token = localStorage.getItem('token');
  if (confirm("Êtes-vous sûr de vouloir supprimer cet acteur ?")) {
    try {
      await axios.delete(`http://localhost:8319/api/actors/${actor.value.id}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,

        },
      });
      alert('Acteur supprimé avec succès.');
      router.push('/actors'); // Rediriger vers la page des acteurs après la suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'acteur:', error);
      alert("Une erreur s'est produite lors de la suppression de l'acteur.");
    }
  }
};
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
  height: auto; /* Maintenir les proportions de l'image */
  border-radius: 10px;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.actor-info {
  font-size: 1.2em; /* Taille de police pour les informations */
  line-height: 1.6; /* Espacement entre les lignes */
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
