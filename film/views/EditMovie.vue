<template>
  <div v-if="movie" class="movie-details">
    <h1>Modifier le film : {{ movie.title }}</h1>
    <img :src="movieImage" alt="Movie Poster" class="movie-poster" />

    <div class="movie-info">
      <label>
        <strong>Titre:</strong>
        <input type="text" v-model="movieForm.title" placeholder="Entrez le titre du film" />
      </label>
      <label>
        <strong>Date de sortie:</strong>
        <input type="date" v-model="movieForm.releaseDate" />
      </label>
      <label>
        <strong>Durée:</strong>
        <input type="number" v-model="movieForm.duration" placeholder="Durée en minutes" /> minutes
      </label>
      <label>
        <strong>Réalisateur:</strong>
        <input type="text" v-model="movieForm.director" placeholder="Entrez le nom du réalisateur" />
      </label>
      <label>
        <strong>Note:</strong>
        <input type="number" step="0.1" v-model="movieForm.rating" placeholder="Note sur 10" />
      </label>

      <!-- Boutons Enregistrer et Annuler -->
      <div class="button-group">
        <button @click="saveChanges" class="save-button">Enregistrer</button>
        <button @click="cancelEdit" class="cancel-button">Annuler</button>
      </div>
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
const movieForm = ref({
  title: '',
  releaseDate: '',
  duration: 0,
  director: '',
  rating: 0
});

// Image par défaut si aucune image de film n'est disponible
const movieImage = computed(() => {
  return movie.value?.posterImage || defaultImage;
});

// Charger les données du film
const loadMovie = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:8319/api/movies/${route.params.id}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    movie.value = response.data;
    movieForm.value = { ...movie.value }; // Remplir le formulaire avec les données du film
  } catch (error) {
    console.error('Erreur lors du chargement du film:', error);
  }
};

// Sauvegarder les modifications
const saveChanges = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.patch(`http://localhost:8319/api/movies/${movie.value.id}`, movieForm.value, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/merge-patch+json"
      },
    });
    alert("Film modifié avec succès.");
    router.push('/movies'); // Redirige vers la page des films après modification
  } catch (error) {
    console.error("Erreur lors de la modification du film:", error);
    alert("Une erreur s'est produite lors de la modification du film.");
  }
};

// Annuler les modifications
const cancelEdit = () => {
  router.push(`/movies/${movie.value.id}`); // Redirige vers les détails du film sans enregistrer
};

// Charger les informations du film au montage du composant
onMounted(loadMovie);
</script>

<style scoped>
.movie-details {
  padding: 20px;
  background-color: #ffffff; /* Changer à une couleur blanche pour un meilleur contraste */
  border-radius: 10px;
  max-width: 800px;
  margin: 20px auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Ajouter une ombre portée pour donner de la profondeur */
}

.movie-poster {
  width: 300px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
  display: block;
  margin: 0 auto;
  border: 2px solid #007bff; /* Ajouter une bordure colorée autour de l'image */
}

.movie-info label {
  display: block;
  margin-bottom: 10px;
  font-size: 1.1em; /* Augmenter la taille de la police pour les étiquettes */
  color: #333; /* Couleur de texte plus sombre pour une meilleure lisibilité */
}

input[type="text"], input[type="date"], input[type="number"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em; /* Augmenter la taille de la police pour les champs de saisie */
}

.button-group {
  margin-top: 20px; /* Espacement entre les champs et les boutons */
}

.save-button, .cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em; /* Uniformiser la taille de la police pour les boutons */
  transition: background-color 0.3s; /* Animation de transition pour le changement de couleur */
}

.save-button {
  background-color: #007bff;
  color: white;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
  margin-left: 10px; /* Espacement entre les boutons */
}

.save-button:hover {
  background-color: #0056b3; /* Couleur au survol */
}

.cancel-button:hover {
  background-color: #5a6268; /* Couleur au survol */
}
</style>
