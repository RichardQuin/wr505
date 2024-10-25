<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// Form data for adding/updating a category
const categoryForm = ref({
  title: '', // Other form fields
  updated_at: new Date().toISOString().slice(0, 16), // Initialize with current date and time in a format compatible with datetime-local input
});

// Add new category
const addCategory = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:8319/api/categoris', categoryForm.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    });
    alert('Catégorie ajoutée avec succès');
    router.push('/categories'); // Redirect to categories page after adding
  } catch (error) {
    console.error("Erreur lors de l'ajout de la catégorie:", error);
  }
};

// Update existing category (assumes `id` of the category is passed as a prop or through the route)
const updateCategory = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.patch(`http://localhost:8319/api/categoris/${id}`, categoryForm.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    });
    alert('Catégorie mise à jour avec succès');
    router.push('/categories'); // Redirect to categories page after updating
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie:", error);
  }
};
</script>

<template>
  <div class="category-form">
    <h2>Ajouter une Catégorie</h2>

    <!-- Category Title Input -->
    <input
        type="text"
        v-model="categoryForm.title"
        placeholder="Titre de la catégorie"
    />

    <!-- Updated At Input -->
    <label for="updated_at">Date de Mise à Jour:</label>
    <input
        type="datetime-local"
        v-model="categoryForm.updated_at"
        id="updated_at"
    />

    <!-- Add Category Button -->
    <button @click="addCategory">Ajouter la Catégorie</button>
  </div>
</template>

<style scoped>
.category-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
