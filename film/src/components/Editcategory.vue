<template>
  <div class="edit-category">
    <h1>Modifier la Catégorie</h1>

    <div class="form-group">
      <label for="title">Titre:</label>
      <input type="text" v-model="categoryForm.title" id="title" required />
    </div>

    <button @click="updateCategory">Sauvegarder les Modifications</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const categoryForm = ref({
  title: ''
});

// Charger les détails de la catégorie pour l'édition
onMounted(async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`http://localhost:8319/api/categories/${route.params.id}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const category = response.data;
    categoryForm.value = {
      title: category.title,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la catégorie:', error);
  }
});

// Mettre à jour les détails de la catégorie
const updateCategory = async () => {
  const token = localStorage.getItem('token');
  try {
    await axios.patch(`http://localhost:8319/api/categories/${route.params.id}`, categoryForm.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/merge-patch+json"
      },
    });
    alert('Catégorie modifiée avec succès.');
    router.push(`/categories/${route.params.id}`); // Rediriger vers la page de la catégorie
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie:', error);
    alert("Une erreur s'est produite lors de la mise à jour de la catégorie.");
  }
};
</script>

<style scoped>
.edit-category {
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

input[type="text"] {
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
