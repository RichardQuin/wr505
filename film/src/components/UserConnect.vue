<template>
  <div class="user-initial" @click="handleLogout">
    Logout <!-- Affiche "Logout" dans le cercle -->
  </div>
</template>

<script setup>
// Importation de l'objet router de Vue pour la redirection
import { useRouter } from 'vue-router';

const router = useRouter(); // Initialisation du router

// Fonction pour gérer la déconnexion
const handleLogout = () => {
  // Supprimer le token du localStorage
  localStorage.removeItem('token');

  // Rediriger l'utilisateur vers la page de connexion
  router.push('/');

  // Rafraîchir la page après la redirection
  window.location.reload();
};
</script>

<style scoped>
.user-initial {
  color: white; /* Couleur du texte */
  display: flex;
  justify-content: center; /* Centrer le contenu horizontalement */
  align-items: center; /* Centrer verticalement */
  font-weight: bold; /* Texte en gras */
  cursor: pointer; /* Curseur en main */
  transition: background-color 0.3s; /* Transition pour le hover */
}

.user-initial:hover {
  background-color: #0056b3; /* Couleur plus foncée au survol */
}
</style>
