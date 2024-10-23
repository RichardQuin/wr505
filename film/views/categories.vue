<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import NavBar from "@/components/NavBar.vue"; // Importez la NavBar ici
import CategoryCard from "@/components/CategoryCard.vue";


const categoris = ref([]); // Initialise un tableau vide

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8319/api/categoris');
    console.log(res);

    // Filtrer pour garder les titres uniques
    const uniqueTitles = new Set();
    const uniqueCategories = [];

    // Parcourir chaque catégorie reçue
    res.data.member.forEach((cat) => {
      if (!uniqueTitles.has(cat.title)) {
        uniqueTitles.add(cat.title);
        uniqueCategories.push(cat); // Conserve l'objet complet pour la carte
      }
    });

    categoris.value = uniqueCategories; // Met à jour categoris avec les catégories uniques
    console.log(categoris.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
  }
});

</script>

<template>

  <NavBar />
  <category-card v-for="a in categoris" v-if="categoris" :categoris="a"></category-card>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>