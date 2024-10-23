<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li><router-link to="/">Homepage</router-link></li>
      <li><router-link to="/movies">Movies</router-link></li>
      <li><router-link to="/actors">Actors</router-link></li>
      <li><router-link to="/categories">Categories</router-link></li>
      <li><router-link to="/edit-profile">Edit Profile</router-link></li>

      <!-- Si l'utilisateur est connecté, afficher l'initiale ; sinon, afficher le bouton Login -->
      <li v-if="isLoggedIn">
        <UserConnect />
      </li>
      <li v-else>
        <router-link to="/login">Login</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserConnect from './UserConnect.vue'; // Importer le composant UserConnect

const isLoggedIn = ref(false);

// Vérifier si l'utilisateur est connecté
const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('token');
};

// Appel de la fonction au montage du composant
onMounted(() => {
  checkLoginStatus();
});
</script>

<style scoped>
/* Styles de la barre de navigation ici */
.navbar {
  background-color: #333; /* Fond gris foncé */
  padding: 1rem; /* Rembourrage pour un design compact */
  border-radius: 15px; /* Coins arrondis */
  display: flex;
  justify-content: center; /* Centrer les éléments horizontalement */
  align-items: center; /* Centrer verticalement */
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2); /* Ombre subtile */
}

/* Navigation links styles */
.nav-links {
  list-style: none; /* Supprime les points de liste */
  display: flex; /* Utilise le flexbox pour une mise en page horizontale */
  gap: 1rem; /* Espace entre les liens */
  padding: 0; /* Supprime le rembourrage par défaut */
  margin: 0; /* Supprime la marge par défaut */
  justify-content: center; /* Centrer les liens horizontalement */
}

/* Styling for links */
.nav-links a {
  text-decoration: none; /* Supprime le soulignement */
  color: white; /* Couleur blanche pour le texte */
  padding: 0.5rem 1rem; /* Rembourrage autour des liens */
  border-radius: 5px; /* Coins arrondis pour les liens */
  transition: background-color 0.3s; /* Transition pour le hover */
}

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.1); /* Fond légèrement clair au survol */
}
</style>
