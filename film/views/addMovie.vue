<template>
  <div class="add-movie">
    <h1>Ajouter un Film</h1>

    <div class="form-group">
      <label for="title">Titre:</label>
      <input type="text" v-model="movieForm.title" id="title" required />
    </div>

    <div class="form-group">
      <label for="releaseDate">Date de Sortie:</label>
      <input type="date" v-model="movieForm.releaseDate" id="releaseDate" required />
    </div>

    <div class="form-group">
      <label for="duration">Durée (en minutes):</label>
      <input type="number" v-model="movieForm.duration" id="duration" min="1" required />
    </div>

    <div class="form-group">
      <label for="director">Réalisateur:</label>
      <input type="text" v-model="movieForm.director" id="director" required />
    </div>

    <div class="form-group">
      <label for="rating">Note:</label>
      <input type="number" step="0.1" v-model="movieForm.rating" id="rating" min="0" max="10" required />
    </div>

    <div class="form-group">
      <label for="createAt">Date de Création:</label>
      <input type="datetime-local" v-model="formattedCreateAt" id="createAt" required />
    </div>

    <button @click="addMovie">Ajouter le Film</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const movieForm = ref({
  title: '',
  releaseDate: '',
  duration: 0,
  director: '',
  rating: 0,
});

// Formater la date pour datetime-local
const createAt = new Date();
const formattedCreateAt = computed(() => {
  return createAt.toISOString().slice(0, 16); // Format yyyy-MM-ddThh:mm
});

// Ajouter un nouveau film
const addMovie = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post('http://localhost:8319/api/movies', {
      ...movieForm.value,
      create_at: formattedCreateAt.value, // Utilisez le format approprié pour envoyer
    }, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    alert('Film ajouté avec succès.');
    router.push('/movies'); // Redirige vers la page des films après l'ajout
  } catch (error) {
    console.error('Erreur lors de l\'ajout du film:', error);
    alert("Une erreur s'est produite lors de l'ajout du film.");
  }
};
</script>

<style scoped>
.add-movie {
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="date"],
input[type="number"],
input[type="datetime-local"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
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
