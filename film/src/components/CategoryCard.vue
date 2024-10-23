<template>
  <div class="category-card" @click="$emit('click')">
    <h3>{{ categoris.title }}</h3>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    categoris: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.category-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  color: black;
  transition: box-shadow 0.3s, background-color 0.3s;
  background-color: #f0f0f0; /* Couleur de fond par défaut */
  text-align: center; /* Centrer le texte */
  margin: 10px; /* Espacement entre les cartes */
}

.category-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #e0e0e0; /* Couleur de fond au survol */
}
</style>
