<template>
  <div class="user-initial" @click="handleClick">
    log <!-- Affiche "log" dans le cercle -->
  </div>
</template>

<script setup>
// Gérer le clic sur l'initiale (par exemple, rediriger vers le profil)
const handleClick = () => {
  console.log('Profil utilisateur');
};
</script>

<style scoped>
.user-initial {
  width: 30px; /* Largeur du cercle */
  height: 20px; /* Hauteur du cercle */
  border-radius: 10%; /* Arrondir pour créer un cercle */
  background-color: #09f309; /* Couleur de fond */
  color: white; /* Couleur du texte */
  display: flex;
  justify-content: center; /* Centrer le contenu */
  align-items: center; /* Centrer verticalement */
  font-weight: bold; /* Gras pour le texte */
  cursor: pointer; /* Curseur en main */
  transition: background-color 0.3s; /* Transition pour le hover */
}

.user-initial:hover {
  background-color: #0056b3; /* Couleur plus foncée au survol */
}
</style>
